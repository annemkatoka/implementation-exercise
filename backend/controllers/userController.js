const User = require('../models/User');
const jwt = require('jsonwebtoken');



//Authentication
exports.auth = async(req, res, next) => {
    const { username, pass} = req.body;
    const user = await User.findOne({ where: {username: username}});
    if(!user){
        await res.status(401).json({ message: 'User does not exist' });
        next();
    } else {
       if(!(pass === user.pass)){
            await res.status(401).json({ message: 'Wrong Pass'});
            next();
        } else {
            const token = jwt.sign({
                username: user.username,
                pass: user.pass,
                id: user.id
            },
            'SECRETKEY',
            {
                expiresIn: '1h'
            })

            res.json({token});
        }

    }
}