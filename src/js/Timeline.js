import { formatDateTime } from "./date";
import { modalWindow } from "./modal";
import { savePostsState, loadPostsState } from "./localhost";

const history = document.querySelector(".history");
const postInput = document.querySelector(".textarea");

// Функция для получения локации пользователя
async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`[${latitude}, ${longitude}]`);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            modalWindow();
          } else {
            reject("Не удалось получить координаты");
          }
        },
      );
    } else {
      reject("Геолокация не поддерживается");
    }
  });
}

// Функция для добавления постов
export async function addPost(value = null) {
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

  history.insertAdjacentHTML(
    "afterBegin",
    `<div class="posts">
			<div class="post_time">${dateTime}</div>
			<div class="post_title">${postValue}</div>
			<div class="local">
				<div class="post_location">${location}</div>
				<div class="image-eye"></div>
			</div>
		</div>`,
  );

  document.querySelector(".posts").style.display = "block";
  postInput.value = "";

  savePostsState();
}

// При нажатии на Enter отправляется пост
postInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addPost();
  }
});

// Функция для отображения сообщения об ошибке
export function showMessInvalid() {
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
