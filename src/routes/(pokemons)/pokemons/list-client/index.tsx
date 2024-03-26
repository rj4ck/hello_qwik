import { $, component$, useContext, useOnDocument, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import {PokemonListContext} from "~/context";

export default component$(() => {

  const pokemonState = useContext(PokemonListContext)

  useTask$(async ({ track}) => {
    track(() => pokemonState.currentPage)

    pokemonState.isLoading = true;

    const pokemons = await getSmallPokemons(30, pokemonState.currentPage * 30);

    pokemonState.pokemons = [...pokemonState.pokemons , ...pokemons];

    pokemonState.isLoading = false;
  });

  useOnDocument("scroll", $(() => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    const timer = setTimeout(() => {
      clearTimeout(timer)

      if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {

        pokemonState.currentPage++;
        pokemonState.isLoading = true;
      }

    }, 500)
  }))

  return (
    <>
      <div class={"flex flex-col"}>
        <span class={"my-5 text-5xl"}>Status</span>
        <span>Current page: {pokemonState.currentPage}</span>
        <span>Is loading page: </span>
      </div>

      <div class={"mt-10"}>
        {/*<button onClick$={() => pokemonState.currentPage--} class={"btn btn-primary mr-2"}>Previous</button>*/}
        <button onClick$={() => pokemonState.currentPage++} class={"btn btn-primary mr-2"}>Next</button>
      </div>

      <div class={"grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5"}>
        {pokemonState.pokemons.map((pokemon, key) => (
          <div key={`${pokemon.name}-${pokemon.id}-${key}`} class={"m-5 flex flex-col justify-center items-center"}>
            <PokemonImage id={pokemon.id} />
            <span class={"capitalize"}>{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: "Client",
};
