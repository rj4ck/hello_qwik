import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "~/components/icons/qwik";
import styles from "./navbar.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/poke-qwik/public" title="qwik">
            <QwikLogo height={50} />
          </a>
        </div>
      </div>
    </header>
  );
});
