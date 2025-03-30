import { parse } from "csv-parse";
import { createReadStream, writeFileSync, appendFileSync } from "fs";
import { join } from "path";
import { outputCSVHeaders, PRICE_LEVEL_MAP } from "./config/constants";
import { SavedPlace, PlaceResult } from "./types";
import { extractCIDFromURL, objectToCSVRow } from "./utils";
import { fetchPlaceDetails } from "./services/places-api";

// Create a readable stream from the CSV file
const csvFilePath = join(__dirname, "../data/saved_places.csv");
const outputFilePath = join(__dirname, "../data/enriched_places.csv");
const fileStream = createReadStream(csvFilePath);

// Clear/create the file and write headers
writeFileSync(outputFilePath, "");
writeFileSync(outputFilePath, outputCSVHeaders.join(",") + "\n");

// Create the parser
const parser = parse({
  columns: true, // Use the first row as headers
  skip_empty_lines: true,
});

// Process each row
fileStream
  .pipe(parser)
  .on("data", async (row: SavedPlace) => {
    const cid = extractCIDFromURL(row.URL);

    if (cid) {
      try {
        const placeDetails = await fetchPlaceDetails(cid);
        const result: PlaceResult | undefined = placeDetails?.result;

        const placeData = {
          Title: row.Title,
          Note: row.Note || "No note",
          URL: row.URL,
          Comment: row.Comment || "No comment",
          cid: cid,
          placeId: result?.place_id,
          openingHours: result?.opening_hours?.weekday_text?.join("; "),
          formattedAddress: result?.formatted_address,
          name: result?.name,
          rating: result?.rating,
          priceLevel: result?.price_level
            ? PRICE_LEVEL_MAP[result?.price_level]
            : "Unknown",
          type: result?.types?.join(", "),
          website: result?.website,
          phoneNumber: result?.formatted_phone_number,
        };

        // Write the row to CSV
        appendFileSync(outputFilePath, objectToCSVRow(placeData) + "\n");
        console.log("Processed and wrote:", row.Title);
      } catch (error) {
        console.error(`Error processing row for URL ${row.URL}:`, error);
      }
    } else {
      console.log("Could not extract CID from URL:", row.URL);
    }
  })
  .on("error", (error) => {
    console.error("Error processing CSV:", error);
  })
  .on("end", () => {
    console.log("Finished processing saved places");
  });
