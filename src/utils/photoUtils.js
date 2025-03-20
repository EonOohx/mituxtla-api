import { GOOGLE_API_KEY, PLACE_PHOTOS_URL } from "../config.js";

export default function getPhotoUrl(photo_reference) {
  return `${PLACE_PHOTOS_URL}?photoreference=${photo_reference}&key=${GOOGLE_API_KEY}&maxwidth=400`;
}
