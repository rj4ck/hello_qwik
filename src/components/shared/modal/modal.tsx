import type { PropFunction} from '@builder.io/qwik';
import {component$, Slot, useStylesScoped$} from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
  showModal: boolean;
  persistent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  closeModal: PropFunction<() => void>;
}

export const Modal = component$( ({ size = 'md', showModal, closeModal, persistent = false } : Props) => {

  useStylesScoped$(ModalStyles);

  return (
    <div id={"modal-content"} onClick$={(event) => {
      const elementID = (event.target as HTMLDivElement).id;

      if (elementID === "modal-content" && !persistent) {
        closeModal();
      }
    }} class={showModal ?"modal-background" : "hidden"}>
      <div class={`modal-content modal-${size}`}>

        <div class="mt-3 text-center">

          <h3 class="modal-title">
            <Slot name="title" />
          </h3>

          <div class="mt-2 px-7 py-3">
            <div class="modal-content-text">
              <Slot name={"content"} />
            </div>
          </div>


          {/* Botton */}
          <div class="items-center px-4 py-3">
            <button
              onClick$={closeModal}
              id="ok-btn"
              class="modal-button"
            >
              Cerrar
            </button>
          </div>


        </div>
      </div>
    </div>
  )
});
