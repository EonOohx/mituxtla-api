import { getPlaceDescription } from "../utils/aiModel.js";
import getBasePlaceData from "./basePlaces.model.js";

export const getPlaceData = (place) => ({
  ...getBasePlaceData(place),
});

export const getPlaceDetailedData = (place) => ({
  ...getBasePlaceData(place),
  address: place.formatted_address,
  location: place.geometry?.location ?? null,
  is_open: place.opening_hours?.open_now ?? null,
  website: place.website ?? null,
  phone: place.formatted_phone_number ?? null,
});
