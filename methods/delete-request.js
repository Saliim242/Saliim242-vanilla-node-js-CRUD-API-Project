const writeToFile = require("../utils/write-to-file");
module.exports = (req, res) => {
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
    const index = req.movies.findIndex((movie) => {
      return movie.id === id;
    });

    if (index === -1) {
      res.writeHeader(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Movie Not Found" }));
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHeader(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, message: "Movie Deleted" }));
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
