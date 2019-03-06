function parseAndSaveMbz(req, res) {
  console.dir(req.body);
  res.json(req.body);
}

module.exports = {
  parseAndSaveMbz
}
