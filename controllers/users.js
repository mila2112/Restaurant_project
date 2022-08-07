const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = 'shhhh';
const models = require('../db/models');

class UserController {
    
    register = async(req,res) =>  {
       try {
          const { fullname, email, password, phone } = req.body;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
             await models.Users.create({ 
                fullname,
                email,
                password:hashedPassword,
                phone,
                role: req.isOwner ? 'owner' : 'client'
             })
             res.send("you have successfully registered!");
       } catch (err) {
            res.status(400).send('Something went wrong')
            console.log('error=>', err); 
       }
    }
 
     login = async(req,res) => { 
        try{ 
           const { email , password } = req.body; 
        
           const user = await models.Users.findOne({ 
              where: { 
                email, 
              } 
           }); 
         
           if (!user) { 
             return res.status(404).send('user not exist'); 
           } 

           const restaurant = await models.Restaurants.findOne({
            where:{
                ownerId: user.id
            }
           })
            console.log('aaa', restaurant)
           const math = await bcrypt.compare(password, user.password) 
         
           if (!math) { 
             return res.status(404).send('Credentials are invalid');  
           } 
           const data = { id: user.id, role: user.role, restId: restaurant?.id }
           const maxAge = 3 * 60 * 60; 
           const token = jwt.sign(data, secret,{expiresIn:maxAge}); 
           return res.send({ token:token}); 
        } 
        catch(err){ 
           console.log('error=>', err); 
           res.status(400).send('Something went wrong');
        } 
         
     } 
 }
 
 module.exports = UserController;
 