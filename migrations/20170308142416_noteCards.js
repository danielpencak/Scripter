/* eslint-disable arrow-parens*/
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('noteCards', table => {
    table.increments();
    table.integer('project_id')
      .index()
      .references('projects.id')
      .onDelete('cascade')
      .notNullable();
    table.text('note');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('noteCards');
};
