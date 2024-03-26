import type { PokemonListResponse, SmallPokemon } from "~/intefaces";

export const getSmallPokemons = async (limit: number = 10, offset: number = 0): Promise<SmallPokemon[]> => {

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json() as PokemonListResponse;

  return data.results.map(({ url, name }) => {

    const segments = url.split("/");

    const id = segments.at(-2)!;

    return {
      id,
      name
    }
  });
}
