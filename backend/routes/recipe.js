const express = require("express");
const credentials = require("../api/credentials.json");
const router = express.Router();
router.use((req, res, next) => {
  console.log(`[Router] ${req.method} ${req.url}`);
  next();
});

router.get("/search", async (req, res) => {
  console.log("search reached");
  try {
    // encode query for url
    const encondedQuery = encodeURIComponent(req.query.query);

    // construct url for api request
    let apiRequest = `https://api.spoonacular.com/recipes/complexSearch?query=${encondedQuery}&number=${req.query.quantity}&apiKey=${credentials.API_KEY}`;
    if (req.query.filters) {
      req.query.filters.forEach((filter) => {
        apiRequest += `&${filter}`;
      });
    }
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
    console.error("Error fetching recipe:", error);
  }
});

router.get("/from-url", async (req, res) => {
  try {
    // construct url for api request
    const apiRequest = `https://api.spoonacular.com/recipes/extract?url=${req.query.url}&apiKey=${credentials.API_KEY}`;

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
    console.error("Error fetching recipe:", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // construct url for api req
    const apiRequest = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${credentials.API_KEY}&includeNutrition=true`;
    console.log(apiRequest);
    // req data from api
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
    console.error("Error fetching recipe:", error);
  }
});

module.exports = router;
