import {component$, Slot} from "@builder.io/qwik";
import Navbar from "~/components/shared/navbar/navbar";
import {routeLoader$} from "@builder.io/qwik-city";

export const useCheckCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get('jwt');

  if (!jwtCookie) {
    throw redirect(302, '/login');
  }
})
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
