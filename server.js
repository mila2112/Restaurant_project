const  express = require('express');
const app = express();
const userRouter = require('./router/users'); 
const restaurantRouter = require('./router/restaurants')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({type:'*/*'});

app.use(jsonParser);

app.use('/users', userRouter);
app.use('/restaurants',restaurantRouter)
app.listen(process.env.APP_PORT);