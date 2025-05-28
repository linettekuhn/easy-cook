const express = require("express");
const credentials = require("../api/spoonacular-credentials.json");
const router = express.Router();
const firebase = require("firebase-admin");
const logger = require("../middleware/logger");
const authenticateUser = require("../middleware/authenticateUser");
const database = firebase.firestore();

router.use(logger);

router.get("/saved", authenticateUser, async (req, res) => {
  try {
    if (req.user) {
      const savedRecipesRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("recipes");
      const snapshot = await savedRecipesRef.get();
      const recipes = [];

      snapshot.forEach((doc) => {
        if (doc.data() && doc.data().recipe) {
          recipes.push(doc.data().recipe);
        }
      });
      res.json(recipes);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved recipes." });
  }
});

router.post("/store", authenticateUser, async (req, res) => {
  try {
    if (req.user) {
      const savedRecipesRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("recipes");
      const { recipesToUpdate, recipeIdsToDelete } = req.body;
      const batch = database.batch();

      // recipes to update
      if (Array.isArray(recipesToUpdate)) {
        recipesToUpdate.forEach((recipe) => {
          const getDocId = (recipe) => {
            if (recipe.id && recipe.id !== -1) {
              return `recipe-${recipe.id}`;
            } else if (recipe.sourceURL) {
              const encodedURL = encodeURIComponent(recipe.sourceURL);
              return `recipe-${encodedURL}`;
            } else return null;
          };

          let docId = getDocId(recipe);
          if (docId) {
            const doc = savedRecipesRef.doc(docId);
            batch.set(doc, { recipe: recipe });
          } else {
            console.log("recipe missing id or sourceURL:", recipe);
          }
        });
      }

      // recipes to remove
      if (Array.isArray(recipeIdsToDelete)) {
        recipeIdsToDelete.forEach((docId) => {
          const doc = savedRecipesRef.doc(docId);
          batch.delete(doc);
        });
      }

      await batch.commit();
      console.log("saved recipes updated with: ", recipesToUpdate);
      res.status(200).json({
        message: "Recipes saved successfully to the 'recipes' document.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to save or delete recipes." });
  }
});

router.get("/search", async (req, res) => {
  try {
    // encode query for url
    const encondedQuery = encodeURIComponent(req.query.query);

    // construct url for api request
    let apiRequest = `https://api.spoonacular.com/recipes/complexSearch?query=${encondedQuery}&number=${req.query.quantity}&apiKey=${credentials.API_KEY}`;

    // add filters to api request
    if (req.query.filters) {
      const filters = Array.isArray(req.query.filters)
        ? req.query.filters
        : [req.query.filters];

      filters.forEach((filter) => {
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
    res.status(500).json({ error: "Failed to search for recipes." });
  }
});

router.get("/from-url", authenticateUser, async (req, res) => {
  try {
    if (req.user) {
      const savedRecipesRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("recipes");
      const encodedURL = encodeURIComponent(req.query.url);
      const doc = await savedRecipesRef.doc(`recipe-${encodedURL}`).get();

      // fetch from database if saved
      if (doc.exists) {
        const data = doc.data();
        res.json(data ? data.recipe : []);
      }
    } else {
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
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe from URL." });
  }
});

router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Invalid recipe ID. Expected a number." });
    }
    if (req.user) {
      const savedRecipesRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("recipes");
      const doc = await savedRecipesRef.doc(`recipe-${req.params.id}`).get();

      // fetch from database if saved
      if (doc.exists) {
        const data = doc.data();
        res.json(data ? data.recipe : []);
      }
    } else {
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
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe by ID." });
  }
});

router.get("/label/:id", async (req, res) => {
  try {
    // construct url for api req
    const apiRequest = `https://api.spoonacular.com/recipes/${req.params.id}/nutritionLabel?apiKey=${credentials.API_KEY}`;
    console.log(apiRequest);
    // req data from api
    const response = await fetch(apiRequest, {
      method: "GET",
    });
    const data = await response.text();
    res.setHeader("Content-Type", "text/html");
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nutrition label." });
  }
});

module.exports = router;
