// The column headers in the CSV file that is being imported
export interface SavedPlace {
  Title: string;
  Note: string;
  URL: string;
  Comment: string;
}

export interface OpeningHours {
  weekday_text: string[];
}

export interface PlaceResult {
  place_id: string;
  opening_hours: OpeningHours;
  formatted_address: string;
  name: string;
  rating: number;
  price_level: number;
  types: string[];
  website: string;
  formatted_phone_number: string;
}

export interface PlaceDetails {
  status: string;
  result: PlaceResult;
}
