import express from "express";
import getPlaceDetails from "../controllers/placeDetailsController.js";
import getPlaces from "../controllers/placesController.js";

const router = express.Router();

router.get("/details", getPlaceDetails);

router.get("/search", getPlaces);

export default router;
