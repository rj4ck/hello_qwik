import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number | string;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
}
export const PokemonImage = component$(({ id, size = 200, backImage = false, isVisible = true,}: Props) => {

    const isLoaded = useSignal<boolean>(false)

    useTask$(({ track }) => {
        track(() => id);

        isLoaded.value = false
    });

    const imageUrl = useComputed$(() => {
      return (backImage)
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    })

    // let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`
    //
    // if (backImage) {
    //     imageUrl = `${imageUrl}/back`
    // }

    return (
        <div class={"flex items-center justify-center"} style={{ width: `${size}px`, height: `${size}px`}}>

            {!isLoaded.value && <span class={"loader"}>Loading...</span>}

            <img width={size}
                 height={size}
                 alt={"Pokemon Sprite"}
                 src={imageUrl.value}
                 class={[{ "hidden": !isLoaded.value, "brightness-0": !isVisible }, 'transition-all']}
                 onLoad$={() => isLoaded.value = true} />
        </div>
    )
})
