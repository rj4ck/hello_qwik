import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export const usePokemonID = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) throw redirect(301, "/");
  if (id <= 0 ) throw redirect(301, "/");
  if (id > 2000 ) throw redirect(301, "/");

  return id;
})
export default component$(() => {
  const pokemonID = usePokemonID()
  const pokemonGame = useContext(PokemonGameContext)

    return (
      <>
        <span class={"text-5xl"}>Pokemon: {pokemonID.value}!</span>

        <PokemonImage id={pokemonID.value} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible} />

      </>
    )
})
