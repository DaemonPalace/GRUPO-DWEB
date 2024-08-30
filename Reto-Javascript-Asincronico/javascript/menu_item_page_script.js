const cocktailAPIUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const searchButton = document.getElementById("search-random-item");
const loader = document.getElementById("loader");
const itemDisplay = document.getElementById("item-display");
const itemName = document.getElementById("item-name");
const itemId = document.getElementById("item-id");
const itemCategory = document.getElementById("item-category");
const itemIngredients = document.getElementById("item-ingredients");
const itemInstructions = document.getElementById("item-instructions");
const itemImage = document.getElementById("item-image");
const addToFavoritesButton = document.getElementById("add-to-favorites");
const favoritesList = document.getElementById("favorites-list");

searchButton.addEventListener("click", fetchRandomCocktail);

async function fetchRandomCocktail() {
  showLoader(true);
  try {
    const response = await fetch(cocktailAPIUrl);
    const data = await response.json();
    if (data.drinks && data.drinks.length > 0) {
      displayCocktail(data.drinks[0]);
    }
  } catch (error) {
    console.error("Error fetching cocktail:", error);
  } finally {
    showLoader(false);
  }
}

function displayCocktail(cocktail) {
  itemName.textContent = cocktail.strDrink;
  itemId.textContent = cocktail.idDrink;
  itemCategory.textContent = cocktail.strCategory;
  itemImage.src = cocktail.strDrinkThumb;
  itemImage.alt = `Image of ${cocktail.strDrink}`;
  itemInstructions.textContent = cocktail.strInstructions;

  itemIngredients.innerHTML = "";

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      const li = document.createElement("li");
      li.textContent = `${measure ? measure : ""} ${ingredient}`;
      itemIngredients.appendChild(li);
    }
  }

  itemDisplay.style.display = "flex";
}

function showLoader(show) {
  loader.style.display = show ? "block" : "none";
}

addToFavoritesButton.addEventListener("click", addToFavorites);

function addToFavorites() {
  const cocktailId = itemId.textContent;
  const cocktailName = itemName.textContent;

  if (!cocktailId || !cocktailName) return;

  const favorites = getFavorites();
  if (!favorites[cocktailId]) {
    favorites[cocktailId] = cocktailName;
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesList();
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || {};
}

function updateFavoritesList() {
  const favorites = getFavorites();
  favoritesList.innerHTML = "";

  for (const [id, name] of Object.entries(favorites)) {
    const li = document.createElement("li");
    li.textContent = name;
    li.setAttribute("data-id", id);

    li.addEventListener("click", () => fetchFavoriteCocktail(id));

    favoritesList.appendChild(li);
  }
}

async function fetchFavoriteCocktail(cocktailId) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
  showLoader(true);
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.drinks && data.drinks.length > 0) {
      displayCocktail(data.drinks[0]);
    }
  } catch (error) {
    console.error("Error fetching favorite cocktail:", error);
  } finally {
    showLoader(false);
  }
}

document.addEventListener("DOMContentLoaded", updateFavoritesList);
