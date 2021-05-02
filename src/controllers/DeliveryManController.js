class DeliveryManController {
  index(req, res) {
    res.send('Hello from restaurant');
  }
}

module.exports = new DeliveryManController();
