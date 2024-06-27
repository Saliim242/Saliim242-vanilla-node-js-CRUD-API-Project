const http = require("http");
const { title } = require("process");
require("dotenv").config();
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let movies = require("./data/movies.json");

const server = http.createServer((req, res) => {
  const method = req.method;
  req.movies = movies;

  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          success: false,
          // title: "Not Found",
          message:
            "The requested endpoint does not exist. Please check the URL and try again.",
        })
      );
      res.end();
  }
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "application/json");
  //   res.write(
  //     JSON.stringify({
  //       success: true,
  //       message: "Welcome to Node js and Express js Course.",
  //     })
  //   );
  //   res.end();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`The Server is Listen On Port ${PORT}`));
