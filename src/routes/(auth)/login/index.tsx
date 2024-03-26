import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, z, zod$, routeAction$} from "@builder.io/qwik-city";

export const useLoginUserAction = routeAction$((data, event) => {

  const { email, password } = data;
  const { cookie, redirect } = event;

  if (email == "john.doe@example.com" && password == "example") {
    const jwt = "fake_json_web_token";
    cookie.set('jwt', jwt, { secure: true, path: '/' });

    redirect(302, '/');
  }



  return {
    success: false,
  }
}, zod$({
  email: z.string().email(),
  password: z.string().min(6),
}));

export default component$(() => {

  const action = useLoginUserAction();

  useStylesScoped$(styles);

  return (
    <Form action={action} class="login-form mt-5">
      <div class="relative">
        <input
          type="text"
          name="email"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type={"submit"}>Ingresar</button>
      </div>

      <p>
        {action.value?.success && <code>Token generated</code>}
      </p>

      <code>
        { JSON.stringify( action.value, undefined , 2 ) }
      </code>
    </Form>
  )
});
