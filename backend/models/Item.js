const Sequelize = require('sequelize');
const db =  require('../config/db');

    const Item = db.define("item", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
      status: {//Completed, 
        type: Sequelize.STRING,
        allowNull: false,
      },

      id_folder: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "folder",
          },
          key: "id",
        }
      }
    });    
    
module.exports = Item;