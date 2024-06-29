const crypto = require("crypto");
const requestBodyParser = require("../utils/body-parse");
const writeToFile = require("../utils/write-to-file");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHeader(201, { "Content-Type": "application/json" });
      res.end();
      console.log(body);
    } catch (error) {
      res.writeHeader(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Request Body is not Valid Request.",
        })
      );
      console.log(error);
    }
  }else {
    res.writeHeader(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message:
          "The requested endpoint does not exist. Please check the URL and try again.",
      })
    );
  }
};

