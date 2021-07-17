const Sequelize = require('sequelize')
const db =  require('../config/db');

    const User = db.define("user", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      pass:{
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      }
    });    
    
module.exports = User;