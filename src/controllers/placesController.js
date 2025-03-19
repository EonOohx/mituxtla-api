import axios from "axios";
import getPlaceData from "../models/placeModel.js";

const getPlaces = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing place_id parameter" });
  }

  try {
    const response = await axios.get(process.env.PLACES_URL, {
      params: {
        query,
        key: process.env.GOOGLE_API_KEY,
        language: "es",
        minRating: 4.0,
      },
    });

    const places = response.data.results.map(getPlaceData);

    res.json({ places });
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    res.status(500).json({ error: "Error fetching place details" });
  }
};

export default getPlaces;
