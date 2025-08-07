import quotes from "./src/quotes.js";
import {
  hideFavoriteCard,
  showFavoriteCard,
  toggleFavoriteIcon,
} from "./src/favoritesHandler.js";

const quoteElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("quote-author");
const generateBtn = document.getElementById("generate-btn");
const toggleFavoriteBtn = document.getElementById("toggle-favorite-btn");
const favoritesContainer = document.getElementById("favorites-container");

let currentQuoteIndex;

function generateRandomQuote() {
  currentQuoteIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[currentQuoteIndex];
  const { quote, author } = randomQuote;
  quoteElement.textContent = quote;
  quoteAuthorElement.textContent = author;
  toggleFavoriteIcon(randomQuote.isFavorite, toggleFavoriteBtn);

  toggleFavoriteBtn.style.display = "inline-block";
}

function toggleFavorite() {
  const currentQuote = quotes[currentQuoteIndex];
  currentQuote.isFavorite = !currentQuote.isFavorite;
  toggleFavoriteIcon(currentQuote.isFavorite, toggleFavoriteBtn);

  if (currentQuote.isFavorite) {
    showFavoriteCard(
      currentQuote.quote,
      currentQuote.author,
      favoritesContainer
    );
  } else {
    hideFavoriteCard(currentQuote.quote);
  }
}

generateBtn.addEventListener("click", generateRandomQuote);
toggleFavoriteBtn.addEventListener("click", toggleFavorite);

generateRandomQuote();
