const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const secret = process.env.JWT_SECRET; 
const UserController = require('../controllers/users'); 
const { 
    registerMiddleware,
    fullnameValidator,
    emailValidator,
    phoneValidator,
} = require('../middlewear/validationMiddlewear'); 
const user = new UserController(); 
const userRouter = express.Router(); 

userRouter.post("/owner", registerMiddleware, (req, _res, next) => { req.isOwner = true;  next() }, user.register);
userRouter.post("/client", registerMiddleware, user.register);
userRouter.post("/login",user.login);
module.exports = userRouter;