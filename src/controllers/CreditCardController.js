class CreditCardController {
  index(req, res) {
    res.send('Hello from restaurant');
  }
}

module.exports = new CreditCardController();
