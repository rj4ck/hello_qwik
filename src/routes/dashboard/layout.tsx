import {component$, Slot} from "@builder.io/qwik";
import Navbar from "~/components/shared/navbar/navbar";

export default component$(() => {

  return (
    <>
      <Navbar />

      <div class={"flex flex-col justify-center items-center mt-2"}>
        <span class={"text-5xl"}>Dashboard Layout</span>
        <Slot/>
      </div>
    </>
  );
})
