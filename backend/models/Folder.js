const Sequelize = require('sequelize')
const db =  require('../config/db');

    const Folder = db.define("folder", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });    
    
module.exports = Folder;