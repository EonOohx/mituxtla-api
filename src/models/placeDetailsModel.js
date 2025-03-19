import getPlaceData from "./placeModel.js";

const getPlaceDetailedData = (place) => {
  return {
    ...getPlaceData(place),
    address: place.formatted_address,
    location: place.geometry?.location || null,
    is_open: place.opening_hours?.open_now ?? null,
    website: place.website || null,
    phone: place.formatted_phone_number || null,
  };
};

export default getPlaceDetailedData;
