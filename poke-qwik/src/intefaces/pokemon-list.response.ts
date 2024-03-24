export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BasicPokemonInfo[];
}

export interface BasicPokemonInfo {
  name: string;
  url: string;
}
