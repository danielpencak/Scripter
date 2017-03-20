/* eslint-disable arrow-parens, camelcase, max-len */
'use strict';

exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Carl',
          last_name: 'Steve',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'banana@pudding.com',
          bio: 'I\'m just a banana who enjoys pudding'
        },
        {
          id: 2,
          first_name: 'Harry',
          last_name: 'Potter',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'pudding@banana.com',
          bio: 'I\'m just a pudding who enjoys banana'
        },
        {
          id: 3,
          first_name: 'Mark',
          last_name: 'Carter',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'smurf@what.com',
          bio: 'I\'m just carl'
        },
        {
          id: 4,
          first_name: 'Peter',
          last_name: 'Gabriel',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'text@what.com',
          bio: 'I\'m just carl'
        },
        {
          id: 5,
          first_name: 'Dallas',
          last_name: 'Howard',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'dallas@what.com',
          bio: 'I\'m just carl'
        },
        {
          id: 6,
          first_name: 'Steve',
          last_name: 'Williams',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'papasmurf@what.com',
          bio: 'I\'m just carl'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
