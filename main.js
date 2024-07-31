/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/date.js
// Функция для форматирования даты и времени
function formatDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
;// CONCATENATED MODULE: ./src/js/validators.js
function validatorLocation(coordinate) {
  if (coordinate == "" || coordinate == null || coordinate == 0) {
    return false;
  }
  const regex = /\[\s*(\d+\.\d+)\s*,\s*([-]?\d+\.\d+)\s*\]|\s*(\d+\.\d+)\s*,\s*([-]?\d+\.\d+)\s*/g;
  return regex.test(coordinate);
}
;// CONCATENATED MODULE: ./src/js/modal.js


const modalEl = document.getElementById("modal");
// Функция для вывода модального окна
function modalWindow() {
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
;// CONCATENATED MODULE: ./src/js/localhost.js
const localhost_history = document.querySelector(".history");
// функция для сохранения постов в localStorage
function savePostsState() {
  const postsData = {};
  const posts = document.querySelectorAll(".posts");

  // Перебираем все посты
  posts.forEach((element, index) => {
    // Извлекаем текст заголовка поста
    const postTitle = element.querySelector(".post_title").textContent.trim();
    const postTime = element.querySelector(".post_time").textContent.trim();
    const postLocation = element.querySelector(".post_location").textContent.trim();
    // Сохраняем массив задач в объекте
    postsData[index] = {
      title: postTitle,
      time: postTime,
      location: postLocation
    };
  });

  // Сохраняем объект состояния задач в localStorage
  localStorage.setItem("postsState", JSON.stringify(postsData));
}

// Функция для восстановления постов из localStorage
function loadPostsState() {
  const postsData = JSON.parse(localStorage.getItem("postsState")) || {};
  Object.values(postsData).forEach(post => {
    localhost_history.insertAdjacentHTML("beforeEnd", `
			<div class="posts">
					<div class="post_time">${post.time}</div>
					<div class="post_title">${post.title}</div>
					<div class="local">
							<div class="post_location">${post.location}</div>
							<div class="image-eye"></div>
					</div>
			</div>
			`);
  });
}
;// CONCATENATED MODULE: ./src/js/Timeline.js



const Timeline_history = document.querySelector(".history");
const postInput = document.querySelector(".textarea");

// Функция для получения локации пользователя
async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          latitude,
          longitude
        } = position.coords;
        resolve(`[${latitude}, ${longitude}]`);
      }, error => {
        if (error.code === error.PERMISSION_DENIED) {
          modalWindow();
        } else {
          reject("Не удалось получить координаты");
        }
      });
    } else {
      reject("Геолокация не поддерживается");
    }
  });
}

// Функция для добавления постов
async function addPost(value = null) {
  const postValue = postInput.value.trim();
  if (!postValue) return;
  const dateTime = formatDateTime();
  let location;
  if (value) {
    location = value;
  } else {
    try {
      location = await getLocation();
    } catch (error) {
      console.error(error);
      return;
    }
  }
  Timeline_history.insertAdjacentHTML("afterBegin", `<div class="posts">
			<div class="post_time">${dateTime}</div>
			<div class="post_title">${postValue}</div>
			<div class="local">
				<div class="post_location">${location}</div>
				<div class="image-eye"></div>
			</div>
		</div>`);
  document.querySelector(".posts").style.display = "block";
  postInput.value = "";
  savePostsState();
}

// При нажатии на Enter отправляется пост
postInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    addPost();
  }
});

// Функция для отображения сообщения об ошибке
function showMessInvalid() {
  const mess = document.createElement("div");
  mess.classList.add("mess");
  mess.textContent = "Неверные координаты";
  document.querySelector(".input").insertAdjacentElement("afterEnd", mess);
  setTimeout(() => {
    mess.remove();
  }, 2000);
}

// Восстанавливаем посты при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  loadPostsState();
});
;// CONCATENATED MODULE: ./src/index.js



// import "./js/dnd.js";
/******/ })()
;