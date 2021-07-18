const express = require('express');
const router = express.Router();

const itemController =  require('../controllers/itemController');
const folderController =  require('../controllers/folderController');
const userController =  require('../controllers/userController');


module.exports =  function(){

    //Items
    //Add New Item
    router.post('/item', itemController.newItem);
    //Get items
    router.get('/item', itemController.getAllItems);
    //Get items by folder ib
    router.get('/item/folder/:Id', itemController.getItemsByFolder);
    //Get Item by ID
    router.get('/item/:Id', itemController.getItem);
    //Update
    router.put('/item/:Id', itemController.updateItem);
    //Delete
    router.delete('/item/:Id', itemController.deleteItem);


    //Folders
    //Add New Folder
    router.post('/folder', folderController.newFolder);
    //Get Folders
    router.get('/folder', folderController.getAllFolders);
    //Get Folder by ID
    router.get('/folder/:Id', folderController.getFolder);
    //Update
    router.put('/folder/:Id', folderController.updateFolder);
    //Delete
    router.delete('/folder/:Id', folderController.deleteFolder);


    //User
    router.post('/login', userController.auth);

    return router;
}
