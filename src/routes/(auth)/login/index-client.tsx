import {$, component$, useComputed$, useStore, useStylesScoped$} from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {


  useStylesScoped$(styles);

  const formState = useStore({
    email: '',
    password: '',
    formPosted: false,
  });

  const onSubmit = $(() => {
    formState.formPosted = true;

    console.log({isFormValid: isFormValid.value })

  });

  const emailError = useComputed$(() => {
    if (formState.email.includes('@')) return ''

    return 'not-valid'
  });

  const passwordError = useComputed$(() => {
    if (formState.password.length >= 6) return ''

    return 'not-valid'
  });

  const isFormValid = useComputed$(() => {
    if (emailError.value == "not-valid" || passwordError.value == "not-valid") return false;

    return true;
  })

  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          type="text"
          name="email"
          value={formState.email}
          class={formState.formPosted ? emailError.value : ''}
          placeholder="Email address"
          onInput$={(event) => (formState.email = (event.target as HTMLInputElement).value)}
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          class={formState.formPosted ? passwordError.value : ''}
          value={formState.password}
          onInput$={(event) => (formState.password = (event.target as HTMLInputElement).value)}
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type={"submit"}>Ingresar</button>
      </div>

      <code>
        { JSON.stringify( formState, undefined , 2 ) }
      </code>
    </form>
  )
});
