export default function placeDescriptionPrompt(place, reviews) {
  return `Provide a brief description of ${place} in Tuxtla Gutiérrez, Chiapas, México 
  for a bibliographic card for a tourist app for Tuxtla Gutierrez based on this comments:
  ${reviews}. 
  Without title, only description. It's not necessary indicate the location again. In Spanish`;
}
