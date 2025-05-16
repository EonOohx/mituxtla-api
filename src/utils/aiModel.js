import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import placeDescriptionPrompt from "./prompts.js";
import { GITHUB_TOKEN } from "../config.js";

const client = ModelClient(
  "https://models.inference.ai.azure.com",
  new AzureKeyCredential(GITHUB_TOKEN)
);

export async function getPlaceDescription(place, reviews) {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "Generates brief, objective responses based on the comments provided." },
          {
            role: "user",
            content: placeDescriptionPrompt(
              place,
              reviews.map((it) => it.text ?? "")
            ),
          },
        ],
        model: "gpt-4o-mini",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
      },
    });
    return response.body.choices[0].message.content;
  }   catch (error) {
    console.error("Error generating place description:", error.message);
    return "The description could not be generated at this time.";
  }
}
