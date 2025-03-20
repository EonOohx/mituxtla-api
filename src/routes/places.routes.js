import { Router } from "express";
import {getPlaces, getPlaceDetails} from "../controllers/places.controller.js";

const router = Router();

router.get("/details", getPlaceDetails);

router.get("/search", getPlaces);

export default router;
