import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const PLACES_URL = process.env.PLACES_URL;
export const PLACE_DETAILS_URL = process.env.PLACE_DETAILS_URL;
export const PLACE_PHOTOS_URL = process.env.PLACE_PHOTOS_URL;
