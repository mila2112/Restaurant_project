const jwt = require('jsonwebtoken'); 
const secret = 'shhhh';

const checkRole = (role,checkAgainst) => {
    if(role !==checkAgainst){
        throw new Error('invalid role');
    }
}
const authorization = (req,res,next) => {
    req.verifedUser = jwt.verify(req.headers.authorization, secret);
    next();
}
const authorizationClient = (req,res,next) =>{
    try{
        checkRole(req.verifedUser.role,'client')
    }catch(err){
        return res.status(400).send('invalid role');
    }
    next();
}
const authorizationOwner = (req,res,next) =>{
    try{
        checkRole(req.verifedUser.role,'owner')
    }catch(err){
        return res.status(400).send('invalid role');
    }
    next();
}

module.exports = {
    authorization,
    authorizationClient,
    authorizationOwner
}