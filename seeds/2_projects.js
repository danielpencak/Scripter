/* eslint-disable arrow-parens, camelcase, max-len */
'use strict';

exports.seed = knex => {
  return knex('projects').del()
    .then(() => {
      return knex('projects').insert([
        {
          id: 1,
          name: 'Untitled Sci-fi script',
          owner_id: 1
        }, {
          id: 2,
          name: 'Untitled Action script',
          owner_id: 1
        }, {
          id: 3,
          name: 'Back Off',
          owner_id: 1
        }, {
          id: 4,
          name: 'Never Seen Again',
          owner_id: 2
        }, {
          id: 5,
          name: 'We Meet Again',
          owner_id: 3
        }, {
          id: 6,
          name: 'Wishful Thinking',
          owner_id: 2
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));"
      );
    });
};