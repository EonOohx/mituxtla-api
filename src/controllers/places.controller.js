import axios from "axios";
import { getPlaceData, getPlaceDetailedData } from "../models/places.model.js";
import { GOOGLE_API_KEY, PLACES_URL, PLACE_DETAILS_URL } from "../config.js";

const LOCATION_SEARCH = "in Tuxtla Gutiérrez, Chiapas, México"

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

    const places = response.data.results.map(getPlaceData);

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

    res.json(structuredData);
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    res.status(500).json({ error: "Error fetching place details" });
  }
};
