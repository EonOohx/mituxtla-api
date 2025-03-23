import { Router } from "express";
import {
  getPlaces,
  getPlaceDetails,
  getPlacePhoto,
} from "../controllers/places.controller.js";

const router = Router();

router.get("/details", getPlaceDetails);

router.get("/search", getPlaces);

router.get("/photo", getPlacePhoto);

export default router;
