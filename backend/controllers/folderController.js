const Folder = require('../models/Folder');


//Add New Folder
exports.newFolder = async(req, res, next) => {
    const folder = req.body;
    console.log(folder);

    try {
        const NewFolder = await Folder.create(folder);
        console.log("The folder has been added", NewFolder);
        res.json({ message: "The folder has been added" });        
    } catch (error) {
        console.log(error);
        next();
        
    }
}

//Get folders
exports.getAllFolders = async (req, res, next) => {
    try {
        const Folders = await Folder.findAll({});
        res.json(Folders);        
    
    } catch (error) {
        console.log(error);
        next();
    }
}

//Get folder by Id
exports.getFolder = async (req, res, next) => {
    const id = req.params.Id;
    const folder = await Folder.findAll({ where: {id: id}}); 
    if(!item){
        res.json({ message: 'It Does not Exist'});
        next();
    }

    res.json(item);
}

//Update
exports.updateFolder = async (req, res, next) => {
    const id = req.params.Id;
    const data = req.body;
    try {
        const folder = await Folder.update( data , {
            where: {
              id: id
              
            }
          });
        res.json(data);        
    } catch (error) {
        console.log(error);
        next();
    }
}


//Delete F0lder
  exports.deleteFolder = async (req, res, next) => {
    const id = req.params.id;
    try {
        item = await Item.destroy({
            where: {
              id: id
            }
          });        
          res.json({ message: 'The item has been deleted'});
    } catch (error) {
        console.log(error);
        next();
    }
}  