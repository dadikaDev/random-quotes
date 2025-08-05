const quotes = [
  {
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today",
    author: "Franklin D. Roosevelt",
  },
  {
    quote: "The only way to do great work is to love what you do",
    author: "Steve Jobs",
  },
  {
    quote: "You are never too old to set another goal or to dream a new dream",
    author: "C.S. Lewis",
  },
  {
    quote:
      "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart",
    author: "Helen Keller",
  },
];

const quoteElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("quote-author");
const generateBtn = document.getElementById("generate-btn");

function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const { quote, author } = randomQuote;
  quoteElement.textContent = quote;
  quoteAuthorElement.textContent = author;
}

generateBtn.addEventListener("click", generateRandomQuote);
