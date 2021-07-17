const Sequelize = require('sequelize');

db = new Sequelize('ensolvers', 'postgres', 'pass', {
    host: 'localhost',
    dialect: 'postgres',
    port: '5432',
    define: {
        timestamps: false,
        freezeTableName: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  });

  module.exports = db;
