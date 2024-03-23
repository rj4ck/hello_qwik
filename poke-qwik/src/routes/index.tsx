import {$, component$, useSignal} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {PokemonImage} from "~/components/pokemons/pokemon-image";

export default component$(() => {

  const pokemonID = useSignal<number>(1);
  const showBackImage = useSignal<boolean>(false)
  const revelPokemon = useSignal<boolean>(false)

  const changePokemonID = $((value: number) => {
      if (pokemonID.value + value <= 0) return;

      return pokemonID.value += value
  })

  return (
    <>
      <span class={"text-2xl"}>Simple search</span>

      <span class={"text-9xl"}>{pokemonID.value}</span>
        <PokemonImage id={pokemonID.value} backImage={showBackImage.value} isVisible={revelPokemon.value} />

      <div class={"mt-2 "}>
        <button onClick$={() => changePokemonID(-1)} class={"btn btn-primary mr-2"}>Previous</button>
        <button onClick$={() => changePokemonID(1)} class={"btn btn-primary mr-2"}>Next</button>
        <button onClick$={() => showBackImage.value = !showBackImage.value} class={"btn btn-primary mr-2"}>Flip</button>
        <button onClick$={() => revelPokemon.value = !revelPokemon.value} class={"btn btn-primary"}>Reveal</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "This is my first application with Qwik and PokeAPI",
    },
  ],
};
