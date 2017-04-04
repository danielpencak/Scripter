/* eslint-disable camelcase, arrow-parens, strict */
'use strict';

exports.seed = knex => {
  return knex('users_projects').del()
    .then(() => {
      return knex('users_projects').insert([
        {
          id: 1,
          user_id: 1,
          project_id: 4
        }, {
          id: 2,
          user_id: 2,
          project_id: 3
        }, {
          id: 3,
          user_id: 3,
          project_id: 1
        }, {
          id: 4,
          user_id: 3,
          project_id: 4
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_projects_id_seq', (SELECT MAX(id) FROM users_projects));"
      );
    });
};
