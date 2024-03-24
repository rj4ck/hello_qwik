import { component$ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";

export default component$(() => {
    return <>HOLA LIST</>
});

export const head: DocumentHead = {
  title: "Client",
};
