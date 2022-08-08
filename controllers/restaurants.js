
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const models = require('../db/models');
const Op = models.Sequelize.Op
const secret = 'shhhh'; 

class RestaurantsController {
   register = async(req,res) =>  {
      try {
         const { name, email, address} = req.body;

            await models.Restaurants.create({ 
               name,
               email,
               address,
               ownerId:req.verifedUser.id
            })
            res.send("restaurant successfully registered!");
      } catch (err) {
           res.status(400).send('Something went wrong')
           console.log('error=>', err); 
      }
   }
   addTables = async(req,res) => {
      try {
         const { chairs, tableNumber } = req.body;
         
         const rest = await models.Restaurants.findOne({where: { ownerId: req.verifedUser.id }});
         
         if (!rest) return res.status(400).send('Restaurant not found');
            
         await models.RTables.create({
               chairs,
               tableNumber,
               restId: rest.id
         })
            res.status(200).send("Added tables in your restaurant");
      } catch (err) {
         res.status(400).send('Something went wrong')
         console.log('error=>', err); 
      }
   }
   reserve = async(req,res) =>  {
      try {
         const { name, tableNumber,day,from,to } = req.body
         const rest = await models.Restaurants.findOne({where: { name}});
         if (!rest) return res.status(400).send('Restaurant not found');
         const table = await models.RTables.findOne({ where: { tableNumber}});
         const reserveBetween =  await models.Reserves.findOne({where:
             {
               restId: rest.id,
               tableId: table.id,
               day,
               from: {[Op.between]: [from,to]},
               to: {[Op.between]: [from,to]}
             }
         });
         if (!table) return res.status(400).send('Table not found');
         if(reserveBetween){
            res.status(400).send(`The ${tableNumber} table from ${from} to ${to} is already reserved,try choose another time!`);
         }
         await models.Reserves.create({
            userId: req.verifedUser.id,
            restId: rest.id,
            tableId: table.id,
            day:day,
            from:from,
            to:to
         })
         res.status(200).send(`You are reserve the ${tableNumber} table from ${from} to ${to}`);
      } catch (err) {
           res.status(400)
           console.log('error=>', err); 
      }
   }
   freeTables = async(req,res) =>  {
      try {
         const { name } = req.body;
         const rest = await models.Restaurants.findOne({where: { name}});
         
         if (!rest) return res.status(400).send('Restaurant not found');
         
         const reserve = await models.Reserves.findAll({  where: { restId: rest.id }, attributes: ['tableId']  });
         
         const reservedIds = reserve.map(el =>  el.tableId);
         
         const freeTables =  await models.RTables.findAll({where: { id: { [Op.notIn]: reservedIds } }});

         res.send(freeTables);
      } catch (err) {
           res.status(400);
           console.log('error=>', err); 
      }
   }
 }
 
 module.exports = RestaurantsController;
 