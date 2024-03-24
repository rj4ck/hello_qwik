import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const usePokemonID = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) throw redirect(301, "/");
  if (id <= 0 ) throw redirect(301, "/");
  if (id > 2000 ) throw redirect(301, "/");

  return id;
})
export default component$(() => {
    //const location = useLocation();
  const pokemonID = usePokemonID()

    return (
      <>
        {/*<span class={"text-5xl"}>Pokemon: {location.params.id}!</span>*/}
        <span class={"text-5xl"}>Pokemon: {pokemonID.value}!</span>

        <PokemonImage id={pokemonID.value} backImage={false} isVisible={true} />

      </>
    )
})
