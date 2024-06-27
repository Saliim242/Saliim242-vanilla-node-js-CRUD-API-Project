// module.exports = (req, res) => {
//   let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);

//   let id = req.url.split("/")[3];
//   console.log("Base URL " + id);
//   const regexV4 = new RegExp(
//     /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
//   );

//   if (req.url === "/api/movies") {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.write(JSON.stringify({ success: true, movies: req.movies }));
//     res.end();
//   } else if (!regexV4.test(id)) {
//     res.writeHeader(400, { "Content-Type": "application/json" });
//     res.end(
//       JSON.stringify({ success: false, message: "UUID is Not Valid UUID" })
//     );
//   } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
//     res.setHeader("Content-Type", "application/json");
//     let filteredMovie = req.movies.filter((move) => {
//       return move.id === id;
//     });

//     if (filteredMovie.length > 0) {
//       res.statusCode = 200;
//       res.setHeader("Content-Type", "application/json");
//       res.write(JSON.stringify({ success: true, movie: filteredMovie }));
//       res.end();
//     } else {
//       res.statusCode = 404;
//       // res.setHeader("Content-Type", "application/json");
//       res.write(JSON.stringify({ success: false, message: "Movie Not Found" }));
//       res.end();
//     }
//   } else {
//     res.writeHeader(404, { "Content-Type": "application/json" });
//     res.end(
//       JSON.stringify({
//         success: false,
//         message:
//           "The requested endpoint does not exist. Please check the URL and try again.",
//       })
//     );
//     res.end();
//   }
// };

module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    res.setHeader("Content-Type", "application/json");
    let filteredMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });

    if (filteredMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      console.log(filteredMovie);
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
