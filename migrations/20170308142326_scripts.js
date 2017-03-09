/* eslint-disable arrow-parens*/
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('scripts', table => {
    table.increments();
    table.integer('project_id')
      .index()
      .references('projects.id')
      .onDelete('cascade')
      .notNullable();
    table.integer('version').notNullable();
    table.text('script').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('scripts');
};
