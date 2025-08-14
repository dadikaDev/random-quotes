import { quoteFavoriteBtn } from "../../index.js";

function toggleFavorite(quote, setCurrentQuote, btn, container) {
  const shouldToggleIsFavorite = true;
  setCurrentQuote(quote, shouldToggleIsFavorite);
  toggleFavoriteBtnIcon(quote.isFavorite, btn);

  if (quote.isFavorite) {
    showFavoriteCard(quote, setCurrentQuote, container);
  } else {
    removeFavoriteCard(quote.id);
  }
}

function handleFavorite(isFavorite) {
  showFavoriteBtn();
  toggleFavoriteBtnIcon(isFavorite);
}

function toggleFavoriteBtnIcon(isFavorite) {
  quoteFavoriteBtn.classList.toggle("fa", isFavorite);
  quoteFavoriteBtn.classList.toggle("far", !isFavorite);
}

function showFavoriteBtn() {
  quoteFavoriteBtn.style.display = "inline-block";
}

function hideFavoriteBtn() {
  quoteFavoriteBtn.style.display = "none";
}

function removeFavoriteQuote(quote, setCurrentQuote) {
  const shouldToggleIsFavorite = true;
  setCurrentQuote(quote, shouldToggleIsFavorite);
  removeFavoriteCard(quote.id);
  const currentQuote = document.querySelector("[data-current-quote-id]");
  const currentQuoteId = currentQuote.dataset.currentQuoteId;
  if (quote.id === currentQuoteId) {
    toggleFavoriteBtnIcon(quote.isFavorite);
  }
}

function showFavoriteCard(quote, setCurrentQuote, container) {
  const { id, text, author } = quote;
  const favoriteCard = document.createElement("div");
  favoriteCard.classList.add("favorite-card");
  favoriteCard.dataset.favoriteQuoteId = id;
  favoriteCard.innerHTML = `
  <div class="favorite-card-content">
  <p>${text}</p>
    <p class="favorite-card-author">${author}</p>
    </div>
    <button class="btn btn-danger">Remove from favorites <i class="far fa-trash-alt"></i></button>`;
  container.appendChild(favoriteCard);

  const removeButton = favoriteCard.querySelector(".btn-danger");
  removeButton.addEventListener("click", () =>
    removeFavoriteQuote(quote, setCurrentQuote)
  );
}

function removeFavoriteCard(id) {
  const card = document.querySelector(`[data-favorite-quote-id="${id}"]`);
  if (card) card.remove();
}

export { handleFavorite, toggleFavorite, hideFavoriteBtn, showFavoriteCard };
