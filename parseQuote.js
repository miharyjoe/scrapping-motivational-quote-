import fs from "fs";

// Function to modify the quotes object by removing the number from the quote text
function modifyQuotes(quotes) {
  const modifiedQuotes = {};

  for (const index in quotes) {
    // Remove the number from the beginning of the quote text
    const quoteText = quotes[index].replace(/^\d+\.\s*/, "");
    modifiedQuotes[index] = quoteText;
  }

  return modifiedQuotes;
}

// Read the existing quotes data from the file
fs.readFile("quotes.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error while reading quotes.json:", err);
    return;
  }

  try {
    const quotes = JSON.parse(data);
    const modifiedQuotes = modifyQuotes(quotes);

    // Convert the modified quotes object to JSON
    const jsonData = JSON.stringify(modifiedQuotes, null, 2);

    // Write the updated JSON data back to the file
    fs.writeFile("quotesParse.json", jsonData, (err) => {
      if (err) {
        console.error("Error while writing quotes.json:", err);
      } else {
        console.log("Quotes successfully modified and saved to quotes.json.");
      }
    });
  } catch (parseErr) {
    console.error("Error while parsing quotes.json:", parseErr);
  }
});
