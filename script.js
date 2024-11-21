
/* Это выдвижения блоков Послуги main-services-field content */

/*const toggleBlock = document.querySelectorAll('toggleBlock');
const hiddenContent = document.querySelectorAll('toggleContent');

toggleBlock.addEventListener('click', () => {
  if (hiddenContent.classList.contains('open')) {
    // Закрываем блок
    hiddenContent.style.maxHeight = null; // Убираем max-height
    hiddenContent.classList.remove('open');
    toggleBlock.style.transition = "border-radius 4s ease";
    toggleBlock.style.borderRadius = "20px 20px 20px 20px";
    
  } else {
    // Открываем блок
    toggleBlock.style.transition = "border-radius 0.001s ease";
    toggleBlock.style.borderRadius = "20px 20px 0 0";
    hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px"; // Устанавливаем высоту
    hiddenContent.classList.add('open');
  }
});*/

const toggleBlocks = document.querySelectorAll('.toggleBlock'); // Все заголовки
const toggleContents = document.querySelectorAll('.toggleContent'); // Все скрытые блоки
const toggleChevrons = document.querySelectorAll('.img-shevron-down');

toggleBlocks.forEach((block, index) => {
  const hiddenContent = toggleContents[index]; // Соответствующий скрытый блок
  const chevron = toggleChevrons[index];

  block.addEventListener('click', () => {
    if (hiddenContent.classList.contains('open')) {
      // Закрываем блок
      hiddenContent.style.maxHeight = null;
      hiddenContent.classList.remove('open');
      block.style.transition = "border-radius 4s ease";
      block.style.borderRadius = "20px";
      chevron.style.transition = "transform 0.5s ease";
      chevron.style.transform = "rotate(0deg)";
    } else {
      // Открываем блок
      block.style.transition = "border-radius 0.001s ease";
      block.style.borderRadius = "20px 20px 0 0";
      hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px";
      hiddenContent.classList.add('open');
      chevron.style.transition = "transform 0.5s ease";
      chevron.style.transform = "rotate(+90deg)";
    }
  });
});


const burgerMenu = document.getElementById('burger-menu');
const dropdownMenu = document.getElementById('dropdown-menu');

burgerMenu.addEventListener('click', () => {
  dropdownMenu.classList.toggle('menu-active');
});

/* Это карусель Освита */

const carousel = document.querySelector('.carousel');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('#modal-img');
const closeModal = document.querySelector('.close');
const zoomIn = document.querySelector('#zoom-in');
const zoomOut = document.querySelector('#zoom-out');

let currentTransform = 0;
const slideWidth = document.querySelector('.carousel-item').offsetWidth; // ширина с учетом отступов

// Прокрутка карусели
leftArrow.addEventListener('click', () => {
  currentTransform = Math.min(currentTransform + slideWidth, 0);
  carousel.style.transform = `translateX(${currentTransform}px)`;
});

rightArrow.addEventListener('click', () => {
  const maxTransform = -(
    carousel.scrollWidth - carousel.offsetWidth
  );
  currentTransform = Math.max(currentTransform - slideWidth, maxTransform);
  carousel.style.transform = `translateX(${currentTransform}px)`;
});

// Открытие изображения в модальном окне
document.querySelectorAll('.carousel-item').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalImg.style.transform = 'scale(1)';
  });
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Масштабирование изображения
let currentScale = 1;
zoomIn.addEventListener('click', () => {
  currentScale += 0.1;
  modalImg.style.transform = `scale(${currentScale})`;
});

zoomOut.addEventListener('click', () => {
  currentScale = Math.max(1, currentScale - 0.1);
  modalImg.style.transform = `scale(${currentScale})`;
});


/* Закрытия если кликнуть рядом с картинкой */

// Закрытие модального окна при клике вне картинки
modal.addEventListener('click', (event) => {
  if (event.target === modal) { // Проверяем, что кликнули по модальному фону
    modal.style.display = 'none';
  }
});

/* Перетягивание картинки если открить в карусели освита */

let isDragging = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;
let scale = 1; // Текущий масштаб изображения

// Отключаем стандартное перетаскивание
modalImg.addEventListener('dragstart', (e) => e.preventDefault());

// Функция для обновления трансформации
function updateTransform() {
  modalImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}

// Начало перетаскивания (мышь)
modalImg.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  modalImg.style.cursor = 'grabbing';
});

// Перетаскивание (мышь)
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    updateTransform();
  }
});

// Завершение перетаскивания (мышь)
document.addEventListener('mouseup', () => {
  isDragging = false;
  modalImg.style.cursor = 'grab';
});

// Начало перетаскивания (тач)
modalImg.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) { // Обрабатываем только один палец
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX - currentX;
    startY = touch.clientY - currentY;
  }
});

// Перетаскивание (тач)
document.addEventListener('touchmove', (e) => {
  if (isDragging && e.touches.length === 1) {
    const touch = e.touches[0];
    currentX = touch.clientX - startX;
    currentY = touch.clientY - startY;
    updateTransform();
  }
});

// Завершение перетаскивания (тач)
document.addEventListener('touchend', () => {
  isDragging = false;
});

// Масштабирование при двойном клике (мышь и тач)
modalImg.addEventListener('dblclick', () => {
  scale = scale === 1 ? 2 : 1; // Переключение между масштабами
  currentX = 0; // Сброс позиции
  currentY = 0;
  updateTransform();
});

// Масштабирование двумя пальцами (тач)
modalImg.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // Предотвращаем стандартное масштабирование страницы
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];

    // Вычисляем дистанцию между пальцами
    const distance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );

    // Простая логика масштабирования (можно доработать)
    scale = Math.min(Math.max(scale + distance / 5000, 1), 3); // Ограничиваем масштаб от 1 до 3
    updateTransform();
  }
});