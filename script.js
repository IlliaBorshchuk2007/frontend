// Знаходимо кнопку та повідомлення на сторінці.
const themeButton = document.querySelector('#theme-button');
const themeStatus = document.querySelector('#theme-status');

// Кожне натискання додає або прибирає клас темної теми.
themeButton.addEventListener('click', () => {
  const isDarkTheme = document.body.classList.toggle('dark-theme');

  // aria-pressed повідомляє допоміжним технологіям, чи увімкнена кнопка.
  themeButton.setAttribute('aria-pressed', String(isDarkTheme));
  themeStatus.textContent = isDarkTheme
    ? 'Зараз увімкнено темну тему.'
    : 'Зараз увімкнено світлу тему.';
});
