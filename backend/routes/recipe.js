const express = require("express");
const credentials = require("../api/credentials.json");

const router = express.Router();
router.use((req, res, next) => {
  console.log(`[Router] ${req.method} ${req.url}`);
  next();
});

router.get("/from-url", async (request, response) => {
  try {
    // construct url for api request
    const apiRequest = `https://api.spoonacular.com/recipes/extract?url=${request.query.url}&apiKey=${credentials.API_KEY}`;

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
    response.send(data);
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
});

router.get("/:id", async (request, response) => {
  try {
    // construct url for api request
    const apiRequest = `https://api.spoonacular.com/recipes/${request.params.id}/information?apiKey=${credentials.API_KEY}&includeNutrition=true`;

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
    response.send(data);
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
});

router.get("/search", async (request, response) => {
  console.log("search reached");
  try {
    // encode query for url
    const encondedQuery = encodeURIComponent(request.query.query);

    // construct url for api request
    let apiRequest = `https://api.spoonacular.com/recipes/complexSearch?query=${encondedQuery}&number=${request.query.quantity}&apiKey=${credentials.API_KEY}`;
    request.query.filters.forEach((filter) => {
      apiRequest += `&${filter}`;
    });
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
    response.send(data);
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
});

module.exports = router;
