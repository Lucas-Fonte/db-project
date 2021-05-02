const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

const RestaurantController = require('./controllers/RestaurantController');
const DishController = require('./controllers/DishController');
const OrderController = require('./controllers/OrderController');

app.use(express.json());

// RESTAURANTS
app.get('/restaurant', RestaurantController.index);
app.post('/restaurant', RestaurantController.store);

// DISHES
app.get('/dish', DishController.index);
app.post('/dish', DishController.store);

// ORDERS
app.get('/order', OrderController.index);
app.post('/order', OrderController.store);
app.put('/order', OrderController.update);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
