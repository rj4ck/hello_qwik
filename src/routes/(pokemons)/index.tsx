import {$, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import {usePokemonGame} from "~/hooks/use-pokemon-game";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {

  const nav = useNavigate();
  const { nextPokemon, previousPokemon, pokemonID, showBackImage, isPokemonVisible, toggleFromBack, toggleVisible } = usePokemonGame();

  const goToPokemon = $(async (id: number) => {
    await nav(`/pokemon/${id}`)
  })

  return (
    <>
      <span class={"text-2xl"}>Simple search</span>

      <span class={"text-9xl"}>{pokemonID}</span>

      <div onClick$={() => goToPokemon(pokemonID.value)}>
        <PokemonImage id={pokemonID.value} backImage={showBackImage.value} isVisible={isPokemonVisible.value} />
      </div>

      <div class={"mt-2 "}>
        <button onClick$={previousPokemon} class={"btn btn-primary mr-2"}>Previous</button>
        <button onClick$={nextPokemon} class={"btn btn-primary mr-2"}>Next</button>
        <button onClick$={toggleFromBack} class={"btn btn-primary mr-2"}>Flip</button>
        <button onClick$={toggleVisible} class={"btn btn-primary"}>Reveal</button>
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
