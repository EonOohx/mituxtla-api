import axios from "axios";
import { getPlaceData, getPlaceDetailedData } from "../models/places.model.js";
import {
  GOOGLE_API_KEY,
  PLACES_URL,
  PLACE_DETAILS_URL,
  PLACE_PHOTOS_URL,
} from "../config.js";
import { getPlaceDescription } from "../utils/aiModel.js";

const LOCATION_SEARCH = "in Tuxtla Gutiérrez, Chiapas, México";

export const getPlaces = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const response = await axios.get(PLACES_URL, {
      params: {
        query: `${query} ${LOCATION_SEARCH}`,
        key: GOOGLE_API_KEY,
        language: "es",
        minRating: 4.0,
      },
    });

    const places = response.data.results
      .filter((it) => it.rating >= 4.3)
      .map(getPlaceData);

    res.json(places);
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    res.status(500).json({ error: "Error fetching place details" });
  }
};

export const getPlaceDetails = async (req, res) => {
  const { place_id } = req.query;

  if (!place_id) {
    return res.status(400).json({ error: "Missing place_id parameter" });
  }

  try {
    const response = await axios.get(PLACE_DETAILS_URL, {
      params: { place_id, key: GOOGLE_API_KEY, language: "es" },
    });
  
    const structuredData = getPlaceDetailedData(response.data.result);
    structuredData.description = await getPlaceDescription(response.data.result.name, response.data.result.reviews)

    res.json(structuredData);
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    res.status(500).json({ error: "Error fetching place details" });
  }
};

export const getPlacePhoto = async (req, res) => {
  const { photo_ref } = req.query;
  if (!photo_ref) {
    return res.status(400).json({ error: "Missing img_refparameter" });
  }

  const photo_url = `${PLACE_PHOTOS_URL}?photoreference=${photo_ref}&key=${GOOGLE_API_KEY}&maxwidth=400`;

  try {
    const response = await axios.get(photo_url, {
      responseType: "stream",
    });
    res.setHeader("Content-Type", "image/jpeg");
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    res.status(500).json({ error: "Error fetching place details" });
  }
};
