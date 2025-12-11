import {
    hideFavoriteBtn,
    showFavoriteCard,
    toggleFavoriteCard,
    showFavoriteBtn,
    removeFavoriteCard,
} from "./src/handlers/favorites.js";
import { displayCurrentQuote } from "./src/handlers/currentQuote.js";
import {
    localStorageGetItem,
    localStorageSetItem,
} from "./src/utils/localStorage.js";
import {
    getRandomQuote,
    getRandomQuoteViaAPI,
} from "./src/handlers/randomQuote.js";
import { removeObjectFromArrayById } from "./src/utils/array.js";

const CURRENT_QUOTE_KEY = "currentQuote";
const FAVORITE_QUOTES_KEY = "favoriteQuotes";

const randomQuoteBtn = document.getElementById("random-quote-btn");
const randomQuoteAPIBtn = document.getElementById("random-quote-api-btn");
const quoteFavoriteBtn = document.getElementById("quote-favorite-btn");
const favoritesContainer = document.getElementById("favorites-container");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const spinner = document.getElementById("spinner");

let currentQuote = null;
const favoriteQuotes = [];

randomQuoteAPIBtn.addEventListener("click", async () => {
    quoteText.style.display = "none";
    quoteAuthor.style.display = "none";
    spinner.style.display = "block";

    const apiQuote = await getRandomQuoteViaAPI();

    spinner.style.display = "none";
    quoteText.style.display = "block";
    quoteAuthor.style.display = "block";

    if (apiQuote) {
        setCurrentQuote(apiQuote);
    } else {
        quoteText.textContent = "Error loading quote.";
        quoteAuthor.textContent = "";
    }
});

function removeFavoriteQuote(id) {
    if (id === currentQuote.id) {
        toggleCurrentQuote();
    } else {
        removeObjectFromArrayById(favoriteQuotes, id);
        removeFavoriteCard(id);
        localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
    }
}

function toggleCurrentQuote() {
    currentQuote.isFavorite = !currentQuote.isFavorite;
    showFavoriteBtn(currentQuote.isFavorite);
    localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);

    if (currentQuote.isFavorite) {
        favoriteQuotes.push({ ...currentQuote });
    } else {
        removeObjectFromArrayById(favoriteQuotes, currentQuote.id);
    }
    toggleFavoriteCard(currentQuote, favoritesContainer);

    localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
}

function setCurrentQuote(quote) {
    currentQuote = { ...quote };
    currentQuote.isFavorite = !!favoriteQuotes.find(
        (favoriteQuote) => favoriteQuote.id === currentQuote.id
    );
    displayCurrentQuote(currentQuote);
    showFavoriteBtn(currentQuote.isFavorite);
    localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);
}

hideFavoriteBtn();
quoteFavoriteBtn.addEventListener("click", toggleCurrentQuote);

randomQuoteBtn.addEventListener("click", () =>
    setCurrentQuote(getRandomQuote())
);

function init() {
    const favoriteQuotesFromStorage = localStorageGetItem(FAVORITE_QUOTES_KEY);
    if (favoriteQuotesFromStorage) {
        favoriteQuotesFromStorage.forEach((quote) => {
            favoriteQuotes.push(quote);
            showFavoriteCard(quote, favoritesContainer);
        });
    }

    const currentQuoteFromStorage = localStorageGetItem(CURRENT_QUOTE_KEY);
    if (currentQuoteFromStorage) {
        setCurrentQuote(currentQuoteFromStorage);
    }
}

window.addEventListener("load", init);

export { quoteFavoriteBtn, removeFavoriteQuote };
