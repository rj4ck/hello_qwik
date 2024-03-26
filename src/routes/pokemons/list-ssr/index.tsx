import {$, component$, useComputed$, useSignal, useStore, useVisibleTask$} from "@builder.io/qwik";
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";

import { Modal } from "~/components/shared";
import type { SmallPokemon} from "~/intefaces";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import {requestAboutPokemon} from "~/helpers/get-openai-response";

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ url, query, redirect, pathname }) => {

  const offset = Number(query.get("offset") ?? "0");

  return getSmallPokemons(10, offset)
});
export default component$(() => {

  const nav = useNavigate();
  const location = useLocation();
  const pokemons = usePokemonList();
  const modalVisible = useSignal(false);
  const openIAResponse = useSignal('');
  const modalPokemon = useStore({
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
  });

  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;

    modalVisible.value = true
  });

  const closeModal = $(() => {
    modalVisible.value = false
  });

  //TODO: Test render
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track}) => {

    track(() => modalPokemon.name);

    openIAResponse.value = "";

    if (modalPokemon.name.length > 0) {
      requestAboutPokemon(modalPokemon.name).then((response) => {
        openIAResponse.value = response
      })
    }
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

      <Modal persistent={true} showModal={modalVisible.value} closeModal={closeModal}>
        <div q:slot={"title"}>{modalPokemon.name}</div>
        <div q:slot={"content"} class={"flex flex-col justify-center items-center"}>

          <PokemonImage id={modalPokemon.id}/>

          <span>
            {openIAResponse.value === "" ? "Searching..." : openIAResponse.value || "Nothing to show"}
          </span>
        </div>
      </Modal>
    </>
  )
});

export const head: DocumentHead = {
  title: "SSR",
};
