import puppeteer from "puppeteer";
import fs from "fs";

const scrapeQuotes = async () => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://thestrive.co/motivational-quotes/");

    // You can use the selector for the specific quote element
    const quoteElementSelector = "p strong";

    // Evaluate the page to extract the quotes
    const quotes = await page.evaluate((selector) => {
      const quoteElements = document.querySelectorAll(selector);
      const quotesObject = {};

      // Loop through each quote element and extract the quote text
      quoteElements.forEach((element, index) => {
        const quoteText = element.parentElement.textContent.trim();
        const formattedQuoteText = quoteText
          .replace(`${index + 1}.`, "")
          .trim();
        quotesObject[index + 1] = formattedQuoteText;
      });

      return quotesObject;
    }, quoteElementSelector);

    await browser.close();

    return quotes;
  } catch (err) {
    console.error("Error while scraping:", err);
    return {};
  }
};

// Call the function to start scraping
scrapeQuotes().then((quotes) => {
  // Convert the quotes object to JSON
  const jsonData = JSON.stringify(quotes, null, 2);

  // Write the JSON data to a file
  fs.writeFile("quote.json", jsonData, (err) => {
    if (err) {
      console.error("Error while writing JSON:", err);
    } else {
      console.log("Quotes successfully scraped and saved to quotes.json.");
    }
  });
});
