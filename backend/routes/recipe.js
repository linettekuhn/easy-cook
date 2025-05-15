const express = require("express");
const credentials = require("../api/spoonacular-credentials.json");
const router = express.Router();
const firebase = require("firebase-admin");
const database = firebase.firestore();

router.use((req, res, next) => {
  console.log(`[Router] ${req.method} ${req.url}`);
  next();
});

router.get("/saved", async (req, res) => {
  try {
    const savedRecipesRef = database
      .collection("savedData")
      .doc("savedRecipes")
      .collection("recipes");
    const snapshot = await savedRecipesRef.get();
    const recipes = [];

    snapshot.forEach((doc) => {
      if (doc.data() && doc.data().recipe) {
        recipes.push(doc.data().recipe);
      }
    });
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching saved recipe:", error);
  }
});

router.post("/store", async (req, res) => {
  try {
    const savedRecipesRef = database
      .collection("savedData")
      .doc("savedRecipes")
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
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
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
    const savedRecipesRef = database
      .collection("savedData")
      .doc("savedRecipes")
      .collection("recipes");
    const encodedURL = encodeURIComponent(req.query.url);
    const doc = await savedRecipesRef.doc(`recipe-${encodedURL}`).get();

    // fetch from database if saved
    if (doc.exists) {
      const data = doc.data();
      res.json(data ? data.recipe : []);
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
    console.error("Error fetching recipe:", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const savedRecipesRef = database
      .collection("savedData")
      .doc("savedRecipes")
      .collection("recipes");
    const doc = await savedRecipesRef.doc(`recipe-${req.params.id}`).get();

    // fetch from database if saved
    if (doc.exists) {
      const data = doc.data();
      res.json(data ? data.recipe : []);
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
    console.error("Error fetching recipe:", error);
  }
});

module.exports = router;
