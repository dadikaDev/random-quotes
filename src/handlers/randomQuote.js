import quotes from "../data/quotes.js";
import { generateRandomInt } from "../utils/math.js";

function getRandomQuote() {
  return { ...quotes[generateRandomInt(quotes.length)] };
}

export { getRandomQuote };
