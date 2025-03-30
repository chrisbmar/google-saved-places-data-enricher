import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { API_URL, PLACE_FIELDS } from "../config/constants";
import { PlaceDetails } from "../types";

dotenv.config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) {
  throw new Error("GOOGLE_MAPS_API_KEY is not defined in .env file");
}

// Fetch place details from Google Places API
export const fetchPlaceDetails = async (
  cid: string
): Promise<PlaceDetails | null> => {
  try {
    const fields = PLACE_FIELDS.join(",");
    const response = await axios.get(
      `${API_URL}/json?cid=${cid}&fields=${fields}&key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `Error fetching place details for CID ${cid}:`,
        error.message
      );
    } else {
      console.error(
        `Unknown error fetching place details for CID ${cid}:`,
        error
      );
    }
    return null;
  }
};
