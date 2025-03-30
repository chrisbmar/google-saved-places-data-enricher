// Docs: https://developers.google.com/maps/documentation/places/web-service/details?_gl=1*1o485jo*_up*MQ..*_ga*MjIwNjM5Nzg1LjE3NDMyNzM3NDA.*_ga_NRWSTWS78N*MTc0MzMxOTA3NC4yLjEuMTc0MzMxOTEzNy4wLjAuMA..
export const API_URL = "https://maps.googleapis.com/maps/api/place/details";

export const PRICE_LEVEL_MAP: Record<number, string> = {
  0: "Free",
  1: "Inexpensive",
  2: "Moderate",
  3: "Expensive",
  4: "Very Expensive",
};

// The fields to fetch from the Google Places API
export const PLACE_FIELDS: string[] = [
  "name",
  "formatted_address",
  "opening_hours",
  "price_level",
  "type",
  "rating",
  "website",
  "formatted_phone_number",
  "place_id",
];

// Define headers for the output CSV
export const outputCSVHeaders = [
  "Title",
  "Note",
  "URL",
  "Comment",
  "cid",
  "placeId",
  "openingHours",
  "formattedAddress",
  "name",
  "rating",
  "priceLevel",
  "type",
  "website",
  "phoneNumber",
];
