import OpenAI from "openai";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});

export const requestAboutPokemon = async (pokemonName: string): Promise<string> => {

  try {
    const response = await openai.completions.create({
      model: "babbage-002",
      prompt: `Give some interesting information about ${pokemonName} pokemon`,
      temperature: 1,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].text;
  } catch (e) {
    console.log(`Something went wrong with the request: ${e}`)
    return `Nothing to show`
  }
}
