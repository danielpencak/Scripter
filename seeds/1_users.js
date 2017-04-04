/* eslint-disable arrow-parens, camelcase, max-len, strict */
'use strict';

exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Daniel',
          last_name: 'Pencak',
          hashed_password: '$2a$12$Imn5Hx/ZYq6ZNccnZsIC8.NfTxRT85UqRnOY9ECCdhNxhbpRYFTlq',
          email: 'danielpencak@email.com'
        },
        {
          id: 2,
          first_name: 'Scott',
          last_name: 'Hurlow',
          hashed_password: '$2a$12$Imn5Hx/ZYq6ZNccnZsIC8.NfTxRT85UqRnOY9ECCdhNxhbpRYFTlq',
          email: 'hurlow@email.com'
        },
        {
          id: 3,
          first_name: 'Mark',
          last_name: 'Carter',
          hashed_password: '$2a$12$Imn5Hx/ZYq6ZNccnZsIC8.NfTxRT85UqRnOY9ECCdhNxhbpRYFTlq',
          email: 'carter@email.com'
        },
        {
          id: 4,
          first_name: 'Peter',
          last_name: 'Gabriel',
          hashed_password: '$2a$12$Imn5Hx/ZYq6ZNccnZsIC8.NfTxRT85UqRnOY9ECCdhNxhbpRYFTlq',
          email: 'gabriel@email.com'
        },
        {
          id: 5,
          first_name: 'Dallas',
          last_name: 'Howard',
          hashed_password: '$2a$12$Imn5Hx/ZYq6ZNccnZsIC8.NfTxRT85UqRnOY9ECCdhNxhbpRYFTlq',
          email: 'dallas@email.com'
        },
        {
          id: 6,
          first_name: 'Steve',
          last_name: 'Williams',
          hashed_password: '$2a$12$Imn5Hx/ZYq6ZNccnZsIC8.NfTxRT85UqRnOY9ECCdhNxhbpRYFTlq',
          email: 'stevenwilliams@email.com'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
