class CustomerController {
  index(req, res) {
    res.send('Hello from restaurant');
  }
}

module.exports = new CustomerController();
