import express from "express";
import axios from "axios";
import { config } from "dotenv";
config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";
const PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

app.get("/search", async (req, res) => {
  const { query } = req.query; // Recibe la búsqueda por query string

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const response = await axios.get(GOOGLE_PLACES_URL, {
      params: { query, key: API_KEY, language: "es", minRating: 3.2 },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching search results" });
  }
});

app.get("/details", async (req, res) => {
  const { place_id } = req.query;

  if (!place_id) {
    return res.status(400).json({ error: "Missing place_id parameter" });
  }

  try {
    const response = await axios.get(PLACE_DETAILS_URL, {
      params: { place_id, key: API_KEY, language: "es" },
    });

    let responseData = response.data;

    // Verificar si hay fotos antes de acceder a ellas
    let uri = responseData.result.photos?.[0]?.photo_reference
      ? getPhotoUrl(responseData.result.photos[0].photo_reference)
      : null;

    console.log(uri);

    res.json({ ...responseData, photo_url: uri });
  } catch (error) {
    res.status(500).json({ error: "Error fetching place details" });
  }
});

function getPhotoUrl(reference, maxwidth = 400) {
  if (!reference) throw new Error("Missing photo_reference");

  return `${PLACE_PHOTO_URL}?photoreference=${reference}&key=${API_KEY}&maxwidth=${maxwidth}`;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});