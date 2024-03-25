import {Slot, component$, useStore, useContextProvider, useVisibleTask$} from "@builder.io/qwik";

import type { SmallPokemon } from "~/intefaces";
import type { PokemonGameState, PokemonListState} from "~/context";
import { PokemonGameContext, PokemonListContext } from "~/context";

export const PokemonProvider = component$(() => {

  const pokemonGame = useStore<PokemonGameState>({
    pokemonID: 1,
    showBackImage: false,
    isPokemonVisible: true
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [] as SmallPokemon[]
  })

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (localStorage.getItem('pokemon-game')) {

      const { pokemonID = 1, showBackImage = false, isPokemonVisible = true} = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

      pokemonGame.pokemonID = pokemonID;
      pokemonGame.showBackImage = showBackImage;
      pokemonGame.isPokemonVisible = isPokemonVisible;

    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => [pokemonGame.pokemonID, pokemonGame.showBackImage, pokemonGame.isPokemonVisible]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  });

  return (<Slot />)
});
