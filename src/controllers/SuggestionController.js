class SuggestionController {
  index(req, res) {
    res.send('Hello from restaurant');
  }
}

module.exports = new SuggestionController();
