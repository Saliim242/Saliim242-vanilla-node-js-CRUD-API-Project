const requestBodyParser = require("../utils/body-parse");
const writeToFile = require("../utils/write-to-file");
module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);

  let id = req.url.split("/")[3];
  console.log("Base URL " + id);
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  if (!regexV4.test(id)) {
    res.writeHeader(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ success: false, message: "UUID is Not Valid UUID" })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    try {
      let body = await requestBodyParser(req);
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });

      if (index === -1) {
        res.writeHeader(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Movie Not Found" }));
      } else {
        req.movies[index] = { id, ...body };
        writeToFile(req.movies);
        res.writeHeader(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, movie: req.movies[index] }));
      }
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
  } else {
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
