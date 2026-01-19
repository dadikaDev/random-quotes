let favoriteBtn = null;
let favoritesContainer = null;
let currentQuote = null;
let onRemoveFavorite = null;

export function initFavorites({
    favoriteBtnEl,
    favoritesContainerEl,
    removeFavoriteCallback,
}) {
    favoriteBtn = favoriteBtnEl;
    favoritesContainer = favoritesContainerEl;
    onRemoveFavorite = removeFavoriteCallback;

    // Скрываем кнопку до установки текущей цитаты
    if (favoriteBtn) favoriteBtn.style.display = "none";

    // Обработка клика оставлена в index.js, чтобы логика данных (localStorage, массив favorites)
    // оставалась в одном месте и не было дублирования.
}

export function setCurrentQuoteForFavorites(quote) {
    currentQuote = quote;
    updateFavoriteBtn();
    if (favoriteBtn) favoriteBtn.style.display = "inline-block";
}

export function showFavoriteCard(quote) {
    addFavorite(quote);
}

export function removeFavoriteCard(id) {
    const card = favoritesContainer
        ? favoritesContainer.querySelector(`[data-favorite-quote-id="${id}"]`)
        : null;
    if (card) card.remove();
}

// ================= Логика добавления и удаления карточки =================
function addFavorite(quote) {
    const { id, text, author } = quote;

    if (!favoritesContainer) return;
    if (favoritesContainer.querySelector(`[data-favorite-quote-id="${id}"]`))
        return;

    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("favorite-card");
    favoriteCard.dataset.favoriteQuoteId = id;

    favoriteCard.innerHTML = `
    <div class="favorite-card-content">
      <p>${text}</p>
      <p class="favorite-card-author">${author}</p>
    </div>
    <button class="btn-danger remove-btn">
      Remove from favorites
      <i class="far fa-trash-alt icon-space"></i>
    </button>
  `;

    favoritesContainer.appendChild(favoriteCard);

    const removeBtn = favoriteCard.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        if (onRemoveFavorite) onRemoveFavorite(id);
        removeFavoriteCard(id);

        if (currentQuote && currentQuote.id === id) {
            currentQuote.isFavorite = false;
            updateFavoriteBtn();
        }
    });
}

function updateFavoriteBtn() {
    if (!favoriteBtn || !currentQuote) return;

    // Font Awesome: переключаем между solid ("fas") и regular ("far") для корректного отображения заполненной/пустой звезды
    favoriteBtn.classList.toggle("fas", currentQuote.isFavorite);
    favoriteBtn.classList.toggle("far", !currentQuote.isFavorite);
}
