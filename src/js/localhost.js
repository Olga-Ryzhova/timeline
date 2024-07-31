const history = document.querySelector(".history");
// функция для сохранения постов в localStorage
export function savePostsState() {
  const postsData = {};
  const posts = document.querySelectorAll(".posts");

  // Перебираем все посты
  posts.forEach((element, index) => {
    // Извлекаем текст заголовка поста
    const postTitle = element.querySelector(".post_title").textContent.trim();
    const postTime = element.querySelector(".post_time").textContent.trim();
    const postLocation = element
      .querySelector(".post_location")
      .textContent.trim();
    // Сохраняем массив задач в объекте
    postsData[index] = {
      title: postTitle,
      time: postTime,
      location: postLocation,
    };
  });

  // Сохраняем объект состояния задач в localStorage
  localStorage.setItem("postsState", JSON.stringify(postsData));
}

// Функция для восстановления постов из localStorage
export function loadPostsState() {
  const postsData = JSON.parse(localStorage.getItem("postsState")) || {};

  Object.values(postsData).forEach((post) => {
    history.insertAdjacentHTML(
      "beforeEnd",
      `
			<div class="posts">
					<div class="post_time">${post.time}</div>
					<div class="post_title">${post.title}</div>
					<div class="local">
							<div class="post_location">${post.location}</div>
							<div class="image-eye"></div>
					</div>
			</div>
			`,
    );
  });
}
