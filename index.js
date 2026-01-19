import {
    initFavorites,
    setCurrentQuoteForFavorites,
    showFavoriteCard,
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

// Убраны обработчики на верхнем уровне — регистрируем их в init(), когда DOM и модули гарантированно готовы.

function removeFavoriteQuote(id) {
    if (currentQuote && id === currentQuote.id) {
        toggleCurrentQuote();
    } else {
        removeObjectFromArrayById(favoriteQuotes, id);
        removeFavoriteCard(id);
        localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
    }
}

function toggleCurrentQuote() {
    if (!currentQuote) return;

    currentQuote.isFavorite = !currentQuote.isFavorite;
    localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);

    if (currentQuote.isFavorite) {
        favoriteQuotes.push({ ...currentQuote });
        showFavoriteCard(currentQuote);
    } else {
        removeObjectFromArrayById(favoriteQuotes, currentQuote.id);
        removeFavoriteCard(currentQuote.id);
    }

    // Синхронизируем состояние кнопки в модуле favorites
    setCurrentQuoteForFavorites(currentQuote);

    localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
}

function setCurrentQuote(quote) {
    if (!quote) return;

    // Нормализуем поля: поддерживаем старые варианты названий и приводим id к строке
    const id = quote.id !== undefined ? String(quote.id) : undefined;
    const text = quote.text ?? quote.quote ?? "";
    const author = quote.author ?? quote.user ?? "";

    currentQuote = { id, text, author };

    // Корректно сравниваем id как строки
    currentQuote.isFavorite = !!favoriteQuotes.find(
        (favoriteQuote) => String(favoriteQuote.id) === String(currentQuote.id)
    );

    displayCurrentQuote(currentQuote);
    setCurrentQuoteForFavorites(currentQuote);
    localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);
}

function init() {
    // Инициализируем favorites модуль до отображения сохранённых карточек
    initFavorites({
        favoriteBtnEl: quoteFavoriteBtn,
        favoritesContainerEl: favoritesContainer,
        removeFavoriteCallback: removeFavoriteQuote,
    });

    const favoriteQuotesFromStorage = localStorageGetItem(FAVORITE_QUOTES_KEY);
    if (favoriteQuotesFromStorage) {
        favoriteQuotesFromStorage.forEach((quote) => {
            favoriteQuotes.push(quote);
            showFavoriteCard(quote);
        });
    }

    const currentQuoteFromStorage = localStorageGetItem(CURRENT_QUOTE_KEY);
    if (currentQuoteFromStorage) {
        setCurrentQuote(currentQuoteFromStorage);
    }

    // Регистрируем обработчики после инициализации
    if (randomQuoteAPIBtn) {
        randomQuoteAPIBtn.addEventListener("click", async () => {
            console.log("API quote button clicked");
            if (quoteText) quoteText.style.display = "none";
            if (quoteAuthor) quoteAuthor.style.display = "none";
            if (spinner) spinner.style.display = "block";

            const apiQuote = await getRandomQuoteViaAPI();

            if (spinner) spinner.style.display = "none";
            if (quoteText) quoteText.style.display = "block";
            if (quoteAuthor) quoteAuthor.style.display = "block";

            if (apiQuote) {
                setCurrentQuote(apiQuote);
            } else if (quoteText) {
                quoteText.textContent = "Error loading quote.";
                if (quoteAuthor) quoteAuthor.textContent = "";
            }
        });
    }

    if (quoteFavoriteBtn)
        quoteFavoriteBtn.addEventListener("click", toggleCurrentQuote);

    if (randomQuoteBtn) {
        randomQuoteBtn.addEventListener("click", () => {
            console.log("Local quote button clicked");
            setCurrentQuote(getRandomQuote());
        });
    }
}

window.addEventListener("load", init);

export { quoteFavoriteBtn, removeFavoriteQuote };
