dropdb Scripter_dev --if-exists

createdb Scripter_dev

npm run knex migrate:latest

npm run knex seed:run
