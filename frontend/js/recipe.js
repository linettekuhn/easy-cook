const apiKey = "64f7ad6e179c4868af1f32e6511301d4";
const App = {
  $: {
    websiteSubmitBtn: document.querySelector('[data-id="website-submit-btn"]'),
    recipeWebsiteInput: document.querySelector('[data-id="recipe-website"]'),
    querySubmitBtn: document.querySelector('[data-id="query-submit-btn"]'),
    recipeQueryInput: document.querySelector('[data-id="recipe-query"]'),
    recipeURL: "",
    recipeOutput: document.querySelector(".recipe-output"),
  },

  recipeSearch: {
    query: "",
    results: [],
  },

  init() {
    App.addEventListeners();
  },

  addEventListeners() {
    App.$.websiteSubmitBtn.addEventListener("click", async (event) => {
      const recipeURL = App.$.recipeWebsiteInput.value;

      if (!recipeURL) {
        alert("Please enter a recipe URL");
        return;
      }

      const recipeData = await App.fetchWebsiteRecipe(recipeURL);

      if (recipeData) {
        App.createRecipeCard(recipeData);
      }
    });

    App.$.querySubmitBtn.addEventListener("click", (event) => {
      //App.$.website = App.$.recipeWebsite.textContent;
      console.log(App.$.recipeQueryInput.value);
    });
  },

  createRecipeCard(recipe) {
    // create main card div and give class
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    // create title with recipe data and append to card
    const title = document.createElement("h3");
    title.classList.add("recipe-title");
    title.textContent = recipe.title;
    card.appendChild(title);

    // create image with recipe data and append to card
    const image = document.createElement("img");
    image.classList.add("recipe-image");
    image.src = recipe.image;
    image.alt = recipe.title;
    card.appendChild(image);

    // create ingredient list with recipe data and append to card
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.classList.add("recipe-ingredients-title");
    ingredientsTitle.textContent = "Ingredients:";
    card.appendChild(ingredientsTitle);
    const ingredients = document.createElement("ul");
    ingredients.classList.add("recipe-ingredient-list");

    // create each ingredient list item and append to list
    let ingredientsArr = recipe.extendedIngredients;
    ingredientsArr.forEach((ingredient) => {
      const listItem = document.createElement("li");
      let quantity;
      // todo measure trigger
      if (true) {
        quantity = ingredient.measures.metric;
      } else {
        quantity = ingredient.measures.us;
      }
      const measure = ingredient.amount;
      listItem.textContent = `${quantity.amount} ${quantity.unitShort} ${ingredient.nameClean}`;
      ingredients.appendChild(listItem);
    });

    card.appendChild(ingredients);

    // create directions list with recipe data and append to card
    const directionsTitle = document.createElement("h4");
    directionsTitle.classList.add("recipe-directions-title");
    directionsTitle.textContent = "Directions:";
    card.appendChild(directionsTitle);
    const directions = document.createElement("ol");
    directions.classList.add("recipe-directions-list");

    // create each ingredient list item and append to list
    let directionsArr = recipe.analyzedInstructions;
    directionsArr.forEach((instructionSet) => {
      instructionSet.steps.forEach((step) => {
        const listItem = document.createElement("li");
        listItem.textContent = step.step;
        directions.appendChild(listItem);
      });
    });

    card.appendChild(directions);

    App.$.recipeOutput.appendChild(card);
  },

  async fetchWebsiteRecipe(recipeURL) {
    try {
      // convert string to url
      const encondedURL = encodeURIComponent(recipeURL);

      // construct url for api request
      let apiRequest = `https://api.spoonacular.com/recipes/extract?url=${encondedURL}&apiKey=${apiKey}`;

      // fetch api request and wait for response
      const response = await fetch(apiRequest, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // parse json data returned by api
      const data = await response.json();

      console.log(data);

      return data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      App.$.recipeOutput.innerHTML = "Error fetching recipe. Please try again.";
    }
  },
};

window.addEventListener("load", App.init);
