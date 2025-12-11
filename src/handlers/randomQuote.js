import quotes from "../data/quotes.js";
import { generateRandomInt } from "../utils/math.js";

export function getRandomQuote() {
    return { ...quotes[generateRandomInt(quotes.length)] };
}

export async function getRandomQuoteViaAPI() {
    try {
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const { id, quote, author } = await response.json();

        return {
            id,
            text: quote,
            author,
        };
    } catch (error) {
        console.error("Error fetching quote:", error);
        return null;
    }
}
