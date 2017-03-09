/* eslint-disable arrow-parens*/
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.string('email').unique().notNullable();
    table.string('image');
    table.text('bio');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
