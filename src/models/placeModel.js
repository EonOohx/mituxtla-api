import getPhotoUrl from "../utils/photoUtils.js";

const getPlaceData = (place) => {
  return {
    id: place.place_id,
    name: place.name,
    rating: place.rating || null,
    photo_url: place.photos?.[0]?.photo_reference
      ? getPhotoUrl(place.photos[0].photo_reference)
      : null,
  };
};

export default getPlaceData;
