dropdb scripter_dev --if-exists

createdb scripter_dev

npm run knex migrate:latest

npm run knex seed:run
