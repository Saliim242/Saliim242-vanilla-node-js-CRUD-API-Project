const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "../data/movies.json"),
      JSON.stringify(data),
      "utf-8"
    );
    // fs.writeFileSync(
    //   path.join(
    //     __dirname,
    //     "..",
    //     "data",
    //     "movies.json",
    //     JSON.stringify(data),
    //     "utf-8"
    //   )
    // );
  } catch (error) {
    console.log("Errro while Writing file ", error);
  }
};
