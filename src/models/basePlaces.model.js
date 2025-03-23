import { GET_IMAGE_ENDPOINT } from "../config.js";

const getBasePlaceData = (place) => {
  return {
    id: place.place_id,
    name: place.name,
    rating: place.rating || null,
    photo_url:
      Array.isArray(place.photos) && place.photos.length > 0
        ? getPhotoUrl(place.photos[0].photo_reference)
        : null,
  };
};

function getPhotoUrl(photo_reference) {
  return `${GET_IMAGE_ENDPOINT}?photo_ref=${photo_reference}`;
}

export default getBasePlaceData;
