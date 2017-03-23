/* eslint-disable arrow-parens, max-len, new-cap*/
'use strict';

const router = require('express').Router();
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/projects');
const authorize = require('../authorize');
const boom = require('boom');

router.get('/', authorize, (req, res, next) => {
  let userProjects;

  knex('projects')
    .select([
      'projects.name AS project_name',
      'projects.created_at AS project_created_at',
      'projects.id AS project_id'
    ])
    .innerJoin('users_projects', 'users_projects.project_id', 'projects.id')
    .where('users_projects.user_id', req.claim.userId)
    .then(projects => {
      userProjects = camelizeKeys(projects);

      return knex('projects')
        .select([
          'projects.name AS project_name',
          'projects.created_at AS project_created_at',
          'projects.id AS project_id'
        ])
        .where('projects.owner_id', req.claim.userId);
    })
    .then(projects => {
      res.send([...userProjects, ...camelizeKeys(projects)]);
    })
    .catch(err => next(err));
});

router.get('/collaborators', authorize, (req, res, next) => {
  let collaboratorIds = [];
  let projects = [];

  knex('projects')
    .where('projects.owner_id', req.claim.userId)
    .select('projects.id AS project_id')
    .then((projectIds) => {
      projects = projectIds.map(projectId => {
        return projectId.project_id;
      });

      return knex('users_projects')
        .where('users_projects.user_id', req.claim.userId)
        .select('users_projects.project_id AS project_id');
    })
    .then(projectIds => {
      const newProjects = projectIds.map(projectId => {
        return projectId.project_id;
      });

      projects = [...projects, ...newProjects];

      return knex('projects')
        .whereIn('projects.id', projects)
        .select('projects.owner_id AS owner_id');
    })
    .then(ownerIds => {
      const owners = ownerIds.map(ownerId => {
        return ownerId.owner_id;
      });

      collaboratorIds = owners;

      return knex('users_projects')
        .whereIn('users_projects.project_id', projects)
        .whereNot('users_projects.user_id', req.claim.userId)
        .select('users_projects.user_id AS user_id');
    })
    .then(userIds => {
      const users = userIds.map(userId => {
        return userId.user_id;
      });

      collaboratorIds = [...collaboratorIds, ...users];
      collaboratorIds = collaboratorIds.filter((collaboratorId, index, collaboratorIds) => {
        return collaboratorIds.indexOf(collaboratorId) === index;
      });

      return knex('users')
        // .innerJoin('users_projects', 'users_projects.user_id', 'users.id')
        // .innerJoin('projects', 'projects.owner_id', 'users_projects.user_id')
        .whereIn('users.id', collaboratorIds)
        // .orWhere('projects.owner_id', req.claim.userId)
        .whereNot('users.id', req.claim.userId)
        .select([
          'users.first_name AS user_first_name',
          'users.last_name AS user_last_name',
          // 'projects.name AS project_name',
          // 'projects.id AS project_id',
          'users.id AS user_id'
        ])
        .orderBy('users.last_name', 'ASC');
    })
    .then(users => res.send(camelizeKeys(users)))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  knex('projects')
    .where('id', req.params.id)
    .then(project => res.send(camelizeKeys(project[0])))
    .catch(err => next(err));
});

router.post('/', authorize, ev(validations.post), (req, res, next) => {
  const { name } = req.body;

  knex('projects')
    .insert(decamelizeKeys({ name, ownerId: req.claim.userId }), '*')
    .then(project => {
      return res.send(camelizeKeys(project[0]));
    })
    .catch(err => next(err));
});

router.patch('/:id', authorize, ev(validations.patch), (req, res, next) => {
  const { name } = req.body;

  knex('projects')
    .where('id', req.params.id)
    .first()
    .then(project => {
      if (project.owner_id !== req.claim.userId) {
        throw boom.create(401, 'Unauthorized');
      }

      return knex('projects')
        .update(decamelizeKeys({ name }))
        .returning('*')
        .where('id', req.params.id);
    })
    .then(project => res.send(camelizeKeys(project[0])))
    .catch(err => next(err));
});

router.delete('/:id', authorize, (req, res, next) => {
  knex('projects')
    .where('id', req.params.id)
    .first()
    .then(project => {
      if (project.owner_id !== req.claim.userId) {
        throw boom.create(401, 'Unauthorized');
      }

      return knex('projects')
        .del('*')
        .where('id', req.params.id);
    })
    .then(project => res.send(camelizeKeys(project[0])))
    .catch(err => next(err));
});

router.get('/:id/collaborators/', authorize, (req, res, next) => {
  let collaborators;

  knex('projects')
    .where('projects.id', req.params.id)
    .whereNot('users.id', req.claim.userId)
    .innerJoin('users_projects', 'users_projects.project_id', 'projects.id')
    .innerJoin('users', 'users_projects.user_id', 'users.id')
    .select([
      'users.first_name AS user_first_name',
      'users.last_name AS user_last_name',
      'users.id AS user_id',
      'projects.owner_id AS project_owner_id'
    ])
    .orderBy('users.last_name', 'ASC')
    .then(users => {
      collaborators = camelizeKeys(users);

      return knex('projects')
        .innerJoin('users', 'projects.owner_id', 'users.id')
        .select([
          'users.first_name AS user_first_name',
          'users.last_name AS user_last_name',
          'users.id AS user_id'
        ])
        .where('projects.id', req.params.id)
        .whereNot('users.id', req.claim.userId);
    })
    .then(users => {
      res.send([...collaborators, ...camelizeKeys(users)]);
    })
    .catch(err => next(err));
});

router.delete('/:projectId/remove/collaborator/:collabId', (req, res, next) => {
  knex('users_projects')
    .del('*')
    .where('users_projects.user_id', req.params.collabId)
    .where('users_projects.project_id', req.params.projectId)
    .then(collaborator => {
      return res.send(camelizeKeys(collaborator[0]));
    })
    .catch(err => next(err));
});

router.post('/:id/invite/collaborator', (req, res, next) => {
  const { email } = req.body;
  let newCollaborator;

  knex('users')
    .where('users.email', email)
    .first()
    .then(user => {
      newCollaborator = user;

      return knex('users_projects')
        .where('users_projects.user_id', newCollaborator.id)
        .where('users_projects.project_id', req.params.id);
    })
    .then(row => {
      if (row[0]) {
        throw boom.create(400, 'User is already a collaborator');
      }

      return knex('users_projects')
        .insert(decamelizeKeys({ projectId: req.params.id, userId: newCollaborator.id }), '*');
    })
    .then(collaborator => {
      return res.send(camelizeKeys(collaborator[0]));
    })
    .catch(err => next(err));
});

module.exports = router;
