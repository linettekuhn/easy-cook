const express = require("express");
const cors = require("cors");
const app = express();

// lets frontend access backend
app.use(cors());

// to parse json
app.use(express.json());
console.log("express started");
// api routes
const recipeRouter = require("./routes/recipe");
app.use("api/recipe", recipeRouter);
console.log("router started");

app.listen(3000, () => {
  console.log("app listening on 3000");
});
