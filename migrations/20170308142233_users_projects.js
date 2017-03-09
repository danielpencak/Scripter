/* eslint-disable camelcase, arrow-parens */
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users_projects', table => {
    table.increments();
    table.integer('user_id')
      .index()
      .references('users.id')
      .onDelete('cascade')
      .notNullable();
    table.integer('project_id')
      .index()
      .references('projects.id')
      .onDelete('cascade')
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_projects');
};
