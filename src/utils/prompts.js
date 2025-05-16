export default function placeDescriptionPrompt(place, reviews = []) {
  return `Briefly describe ${place} in Tuxtla Gutiérrez, Chiapas, Mexico,  
  based on the following visitor reviews:  

  ${reviews}  

  The description must be in Spanish, professional, objective, and concise.  
  Do not include a title or repeat the location.`;
}
