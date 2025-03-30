# Google Saved Places Data Enricher

This script enriches your Google Saved Places data with additional information from the Google Places API. It takes your saved places CSV file and adds useful details like opening hours, price levels, ratings, and more. Check out the API docs if you want to know what else you can add.

## Motivation

When you save places in Google Maps, you can export them to a CSV file, but the exported data is quite basic (just title, note, URL, and comment). This tool helps you get more detailed information about each place by leveraging the Google Places API to fetch additional details like:

- Opening hours
- Price levels
- Ratings
- Formatted addresses
- Phone numbers
- Website URLs
- Place types

This enriched data can be useful for:

- Feeding it to an LLM as a .csv to then be able to ask it questions like: "Where does Chris recommend for a pizza in Islington?"

## Prerequisites

- Node.js (v14 or higher)
- A Google Maps API key with Places API enabled
- Your Google Saved Places exported as a CSV file

## Installation

1. Go to [Google Takeout](https://takeout.google.com/) and download your saved places as a CSV file.
2. Clone this repository:

```bash
git clone https://github.com/chrisbmar/google-saved-places-data-enricher.git
cd google-saved-places-data-enricher
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your Google Maps API key:

```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

5. Place your Google Saved Places CSV file in the `data` directory as `saved_places.csv`

## Usage

1. Make sure your `saved_places.csv` file is in the `data` directory.
2. Run the script:

```bash
npm start
```

The script will:

- Read your saved places CSV file
- Extract the CID (Unique Identifier for a Google Business Profile) from each place's URL
- Fetch additional details from the Google Places API
- Create a new file `data/enriched_places.csv` with all the additional information

## Output

The enriched CSV file will contain the following columns:

- Title (original)
- Note (original)
- URL (original)
- Comment (original)
- cid (extracted from URL)
- placeId (from place/ api)
- openingHours (from place/ api)
- formattedAddress (from place/ api)
- name (from place/ api)
- rating (from place/ api)
- priceLevel (from place/ api)
- type (from place/ api)
- website (from place/ api)
- phoneNumber (from place/ api)

## Price Level Mapping

The price levels are mapped as follows:

- 0: Free
- 1: Inexpensive
- 2: Moderate
- 3: Expensive
- 4: Very Expensive

## Error Handling

The script includes error handling for:

- Missing API key
- Invalid URLs
- API request failures
- CSV parsing errors

Failed entries will be logged to the console but won't stop the entire process.

## License

ISC
