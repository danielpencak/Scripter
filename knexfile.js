'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/Scripter'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
