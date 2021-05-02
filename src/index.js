const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

const RestaurantController = require('./controllers/RestaurantController');
const DishController = require('./controllers/DishController');
const OrderController = require('./controllers/OrderController');
const CustomerController = require('./controllers/CustomerController');
const CreditCardController = require('./controllers/CreditCardController');
const DeliveryManController = require('./controllers/DeliveryManController');
const SuggestionController = require('./controllers/SuggestionController');

app.use(express.json());

app.get('/restaurant', RestaurantController.index);
app.post('/restaurant', RestaurantController.store);

app.get('/dish', DishController.index);
app.get('/order', OrderController.index);
app.get('/customer', CustomerController.index);
app.get('/credit_card', CreditCardController.index);
app.get('/delivery_man', DeliveryManController.index);
app.get('/suggestion', SuggestionController.index);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
