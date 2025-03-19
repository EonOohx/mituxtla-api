export default function getPhotoUrl(photo_reference) {
  return `${process.env.PLACE_PHOTO_URL}?photoreference=${photo_reference}&key=${process.env.GOOGLE_API_KEY}&maxwidth=400`;
}
