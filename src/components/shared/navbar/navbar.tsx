import {Link} from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "~/components/icons/qwik";

import styles from "./navbar.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="poke-qwik">
            <QwikLogo height={50} />
          </Link>
        </div>

        <ul>
          <Link href="/login">Login</Link>
          <Link href="/dashboard">Admin Dashboard</Link>
          <Link href="/counter">CounterHook</Link>
          <Link href={"/pokemons/list-ssr"}>SSR</Link>
          <Link href={"/pokemons/list-client"}>Client</Link>
        </ul>

			</div>
    </header>
  );
});
