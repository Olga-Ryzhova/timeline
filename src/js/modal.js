import { validatorLocation } from "./validators";
import { showMessInvalid, addPost } from "./Timeline";

const modalEl = document.getElementById("modal");
// Функция для вывода модального окна
export function modalWindow() {
  modalEl.innerHTML = `
		<form class="modal_window">
			<p class="modal-text">Что-то пошло не так 
				<br><br>
				К сожалению, нам не удалось определить ваше местоположение. Пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.
				<br><br>
				Широта и долгота через запятую
			</p>
			<input type="text" class="input" placeholder="51.50851, -0.12572">
			<div class="modal_buttons">
				<button type="button" class="close">Отмена</button>
				<button type="button" class="done">Ок</button>
			</div>
		</form>
	`;

  document.querySelector(".close").addEventListener("click", () => {
    modalEl.classList.add("hidden");
  });

  document.querySelector(".done").addEventListener("click", () => {
    const value = document.querySelector(".input").value.trim();
    if (validatorLocation(value)) {
      modalEl.classList.add("hidden");
      addPost(value);
    } else {
      showMessInvalid();
    }
  });

  modalEl.classList.remove("hidden");
}
