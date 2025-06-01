const express = require("express");
const cors = require("cors");
const app = express();
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const credentials = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// initialize firebase
initializeApp({
  credential: cert(credentials),
});

// lets frontend access backend
app.use(cors());

// to parse json
app.use(express.json());
console.log("express started");

// api routes
const recipeRouter = require("./routes/recipe");
app.use("/api/recipe", recipeRouter);
console.log("recipe router started");

const plannerRouter = require("./routes/planner");
app.use("/api/planner", plannerRouter);
console.log("planner router started");

const pantryRouter = require("./routes/pantry");
app.use("/api/pantry", pantryRouter);
console.log("pantry router started");

app.listen(3000, () => {
  console.log("app listening on 3000");
});
