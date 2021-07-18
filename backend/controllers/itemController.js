const Folder = require('../models/Folder');
const Item = require('../models/Item');


//Add New Item
exports.newItem = async(req, res, next) => {
    const item = req.body;
    console.log(item);

    try {
        const NewItem = await Item.create(item);
        console.log("Item has been added", NewItem);
        res.json({ message: "Item has been added" });        
    } catch (error) {
        console.log(error);
        next();
        
    }
}

//Get items
exports.getAllItems = async (req, res, next) => {
    try {
        const Items = await Item.findAll({});
        res.json(Items);        
    
    } catch (error) {
        console.log(error);
        next();
    }
}

//Get items by folder id
exports.getItemsByFolder = async (req, res, next) => {
    const id = req.params.Id;
    try {
        const items = await Item.findAll({ where: {id_folder: id}}); 
        res.json(items);        
    
    } catch (error) {
        console.log(error);
        next();
    }
}

//Get item by Id
exports.getItem = async (req, res, next) => {
    const id = req.params.Id;
    const item = await Item.findAll({ where: {id: id}}); 
    if(!item){
        res.json({ message: 'It Does not Exist'});
        next();
    }

    res.json(item);
}

//Update
exports.updateItem = async (req, res, next) => {
    const id = req.params.Id;
    const data = req.body;
    console.log(data)
    console.log(id)

    try {
        const item = await Item.update( data , {
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


//Delete Item
  exports.deleteItem = async (req, res, next) => {
    const id = req.params.Id;

    console.log(id)
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