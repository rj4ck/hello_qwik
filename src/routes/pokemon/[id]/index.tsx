import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {usePokemonGame} from "~/hooks/use-pokemon-game";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const usePokemonID = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) throw redirect(301, "/");
  if (id <= 0 ) throw redirect(301, "/");
  if (id > 2000 ) throw redirect(301, "/");

  return id;
})
export default component$(() => {
  const pokemonID = usePokemonID()
  const { showBackImage, isPokemonVisible, toggleVisible, toggleFromBack } = usePokemonGame()

    return (
      <>
        <span class={"text-5xl"}>Pokemon: {pokemonID.value}!</span>

        <PokemonImage id={pokemonID.value} backImage={showBackImage.value} isVisible={isPokemonVisible.value} />

        <div class={"mt-2"}>
          <button onClick$={toggleFromBack} class={"btn btn-primary mr-2"}>Flip</button>
          <button onClick$={toggleVisible} class={"btn btn-primary"}>Revel</button>
        </div>
      </>
    )
})
