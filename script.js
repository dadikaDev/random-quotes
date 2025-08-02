const quotes = [
  'The only limit to our realization of tomorrow will be our doubts of today." - Franklin D. Roosevelt',
  'The only way to do great work is to love what you do." - Steve Jobs',
  'You are never too old to set another goal or to dream a new dream." - C.S. Lewis',
  'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart." - Helen Keller',
];

const quoteElement = document.getElementById("quote");
const generateBtn = document.getElementById("generate-btn");

function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteElement.textContent = randomQuote;
}

generateBtn.addEventListener("click", generateRandomQuote);

