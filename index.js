import quotes from "./src/data/quotes.js";
import { toggleFavorite, hideFavoriteBtn } from "./src/handlers/favorites.js";
import { handleQuote } from "./src/handlers/quote.js";

let currentQuote = null;

function setCurrentQuote(quote) {
  currentQuote = quote;
}

const favoriteBtn = document.getElementById("favorite-btn");
const favoritesContainer = document.getElementById("favorites-container");
hideFavoriteBtn(favoriteBtn);
favoriteBtn.addEventListener("click", () =>
  toggleFavorite(currentQuote, favoriteBtn, favoritesContainer)
);

const generateBtn = document.getElementById("generate-btn");
generateBtn.addEventListener("click", () =>
  handleQuote(quotes, setCurrentQuote)
);

export { favoriteBtn };
