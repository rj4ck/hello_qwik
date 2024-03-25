import type { SmallPokemon } from "~/intefaces";
import { createContextId } from "@builder.io/qwik";

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[]
}

export const PokemonListContext = createContextId<PokemonListState>("pokemon.list-context");
