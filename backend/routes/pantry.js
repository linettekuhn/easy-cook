const express = require("express");
const router = express.Router();
const credentials = require("../api/spoonacular-credentials.json");

router.use((req, res, next) => {
  console.log(`[Router] ${req.method} ${req.url}`);
  next();
});

router.get("/search/autocomplete", async (req, res) => {
  try {
    // encode query for url
    const encondedQuery = encodeURIComponent(req.query.query);

    let apiRequest = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${encondedQuery}&number=5&metaInformation=true&apiKey=${credentials.API_KEY}`;
    console.log(apiRequest);

    // request data from api
    const response = await fetch(apiRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // parse json data returned by api
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
  }
});

router.get("/search/recipes", async (req, res) => {
  try {
    const encondedIngredients = encodeURIComponent(req.query.ingredients);

    let apiRequest = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encondedIngredients}&number=20&apiKey=${credentials.API_KEY}`; // request data from api
    const response = await fetch(apiRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
  }
});
module.exports = router;
