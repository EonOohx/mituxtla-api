import axios from "axios";
import getPlaceDetailedData from "../models/placeDetailsModel.js";

const getPlaceDetails = async (req, res) => {
  const { place_id } = req.query;

  if (!place_id) {
    return res.status(400).json({ error: "Missing place_id parameter" });
  }

  try {
    const response = await axios.get(process.env.PLACE_DETAILS_URL, {
      params: { place_id, key: process.env.GOOGLE_API_KEY, language: "es" },
    });

    const structuredData = getPlaceDetailedData(response.data.result);
    
    res.json(structuredData);
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    res.status(500).json({ error: "Error fetching place details" });
  }
};

export default getPlaceDetails;
