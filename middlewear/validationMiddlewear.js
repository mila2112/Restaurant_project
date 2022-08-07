const { body, validationResult } = require('express-validator');

const registerMiddleware = async (req,res,next) => { 
    await body("fullname").isLength({min:5,max:255}).run(req);
    await body("email").isEmail().run(req);
    await body("password").isLength({ min: 5 }).run(req);
    await body("phone").isLength({ min: 5 }).run(req);

    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next(); 
}; 

const  fullnameValidator = async (req,res,next) => { 
   await body("fullname").isLength({ min:5,max:255}).run(req);
   
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   next(); 
}; 
  

const  emailValidator = async (req,res,next) => { 
   await body("email").isEmail().run(req);
   
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   next(); 
}; 

const  phoneValidator = async (req,res,next) => { 
   await body("phone").isLength({ min: 8 }).run(req);
   
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   next(); 
}; 

 module.exports = {
   registerMiddleware,
   fullnameValidator,
   emailValidator,
   phoneValidator,
 };

 


