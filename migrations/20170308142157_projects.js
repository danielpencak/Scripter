/* eslint-disable arrow-parens */
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments();
    table.integer('owner_id')
      .index()
      .references('users.id')
      .onDelete('cascade')
      .notNullable();
    table.boolean('public');
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
