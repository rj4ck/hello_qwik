import {$, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {

  const nav = useNavigate();
  const pokemonGame = useContext(PokemonGameContext)

  const changePokemonID = $((value: number) => {
      if (pokemonGame.pokemonID + value <= 0) return;

      return pokemonGame.pokemonID += value
  })

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokemonGame.pokemonID}`)
  })

  return (
    <>
      <span class={"text-2xl"}>Simple search</span>

      <span class={"text-9xl"}>{pokemonGame.pokemonID}</span>

      <div onClick$={goToPokemon}>
        <PokemonImage id={pokemonGame.pokemonID} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible} />
      </div>

      <div class={"mt-2 "}>
        <button onClick$={() => changePokemonID(-1)} class={"btn btn-primary mr-2"}>Previous</button>
        <button onClick$={() => changePokemonID(1)} class={"btn btn-primary mr-2"}>Next</button>
        <button onClick$={() => pokemonGame.showBackImage = !pokemonGame.showBackImage} class={"btn btn-primary mr-2"}>Flip</button>
        <button onClick$={() => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible} class={"btn btn-primary"}>Reveal</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "Poke-API with Qwik",
  meta: [
    {
      name: "description",
      content: "This is my first application with Qwik and PokeAPI",
    },
  ],
};
