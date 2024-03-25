import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";



export const usePokemonGame = () => {

  const pokemonGame = useContext( PokemonGameContext );

  const changePokemonId = $(( value: number ) => {
    if( ( pokemonGame.pokemonID + value) <= 0 ) return;
    pokemonGame.pokemonID += value;
  });


  const toggleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const toggleVisible = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  });


  return {
    pokemonID: useComputed$(() => pokemonGame.pokemonID ),
    showBackImage: useComputed$(() => pokemonGame.showBackImage ),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible ),

    toggleVisible: toggleVisible,
    toggleFromBack: toggleFromBack,
    nextPokemon: $(() => changePokemonId(+1)),
    previousPokemon: $(() => changePokemonId(-1)),
  }
}
