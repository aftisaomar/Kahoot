const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'SomeSecret');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user){
            throw new Error();
        }
        
        req.token = token; // Keep track of the used token on different sessions (PC, smartphone...etc)
        req.user = user;
        next();
    } catch(e) {
        res.status(401).send({error: 'User not authenticated'})
    }
}

module.exports = auth;