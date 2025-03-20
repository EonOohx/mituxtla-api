import getPhotoUrl from "../utils/photoUtils.js";

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

export default getBasePlaceData;
