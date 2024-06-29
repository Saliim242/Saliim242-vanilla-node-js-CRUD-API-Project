const crypto = require("crypto");
const requestBodyParser = require("../utils/body-parse");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req.body);
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  }
};
