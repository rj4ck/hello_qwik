import {$, component$, useComputed$, useSignal, useStore} from "@builder.io/qwik";
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";

import { Modal } from "~/components/shared";
import type { SmallPokemon} from "~/intefaces";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ url, query, redirect, pathname }) => {

  const offset = Number(query.get("offset") ?? "0");

  return getSmallPokemons(10, offset)
});
export default component$(() => {

  const nav = useNavigate();
  const location = useLocation();
  const pokemons = usePokemonList();
  const modalVisible = useSignal(false);
  const modalContainer = useStore({
    id: '',
    name: ''
  })

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);

    return Number(offsetString.get("offset") || 0);
  });

  const onClickNav = $(async (value: number) => {

    if (currentOffset.value + value < 0 ) return;

    await nav(`/pokemons/list-ssr?offset=${currentOffset.value + value}`)
  })

  const showModal = $((id: string, name: string) => {
    modalContainer.id = id;
    modalContainer.name = name;

    modalVisible.value = true
  });

  const closeModal = $(() => {
    modalVisible.value = false
  })

  return (
    <>
      <div class={"flex flex-col"}>
        <span class={"my-5 text-5xl"}>Status</span>
        <span>Current page: {currentOffset.value}</span>
        <span>Is loading page: {location.isNavigating ? "Yes" : "No"}</span>
      </div>

      <div class={"mt-10"}>
        <button onClick$={() => onClickNav(-10)} class={"btn btn-primary mr-2"}>Previous</button>
        <button onClick$={() => onClickNav(10)} class={"btn btn-primary mr-2"}>Next</button>
      </div>

      <div class={"grid grid-cols-6 mt-5"}>
        {pokemons.value.map((pokemon) => (
          <div key={pokemon.name} onClick$={() => showModal(pokemon.id, pokemon.name)} class={"m-5 flex flex-col justify-center items-center"}>
            <PokemonImage id={pokemon.id} />
            <span class={"capitalize"}>{pokemon.name}</span>
          </div>
        ))}
      </div>

      <Modal showModal={modalVisible.value} closeModal={closeModal}>
        <div q:slot={"title"}>{modalContainer.name}</div>
        <div q:slot={"content"} class={"flex flex-col justify-center items-center"}>

          <PokemonImage id={modalContainer.id}/>

          <span>Preguntandole a OpenAI</span>
        </div>
      </Modal>
    </>
  )
})

export const head: DocumentHead = {
  title: "SSR",
};
