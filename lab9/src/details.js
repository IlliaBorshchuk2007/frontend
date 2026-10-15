import { getShow, notes, saveNote } from './state.js';

let currentId = null;

function clearError() {
  document.querySelector('#note-rating').removeAttribute('aria-invalid');
  document.querySelector('#note-rating-error').textContent = '';
}

function restoreFocus() {
  if (currentId === null) return;
  document.querySelector(
    `#results li[data-id="${currentId}"] [data-action="details"]`
  )?.focus();
}

export function openDetails(id) {
  const show = getShow(id);
  currentId = id;
  document.querySelector('#details-title').textContent = show.name;

  const parsed = new DOMParser().parseFromString(show.summary, 'text/html');
  document.querySelector('#details-summary').textContent =
    parsed.body.textContent;

  const link = document.querySelector('#details-link');
  const url = new URL(show.url);
  link.href = url.protocol === 'https:' && url.hostname === 'www.tvmaze.com'
    ? url.href : 'https://www.tvmaze.com/';

  const note = notes.get(id);
  document.querySelector('#note-rating').value =
    note ? String(note.rating) : '';
  document.querySelector('#note-text').value = note?.text ?? '';
  clearError();
  document.querySelector('#details').showModal();
}

export function initDetails(refresh) {
  const dialog = document.querySelector('#details');
  const form = document.querySelector('#note-form');
  const rating = form.elements.namedItem('rating');
  const note = form.elements.namedItem('note');

  form.noValidate = true;
  rating.setAttribute('aria-describedby', 'note-rating-error');

  form.querySelector('button[type="button"]').addEventListener('click', () => {
    dialog.close();
    restoreFocus();
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    dialog.close();
    restoreFocus();
  });

  dialog.addEventListener('close', restoreFocus);

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [
      ...dialog.querySelectorAll('a[href], input, textarea, button')
    ].filter((element) =>
      !element.disabled && !element.hidden && element.tabIndex >= 0
    );
    const first = controls[0];
    const last = controls.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  rating.addEventListener('input', () => {
    if (rating.validity.valid) clearError();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!rating.validity.valid) {
      rating.setAttribute('aria-invalid', 'true');
      document.querySelector('#note-rating-error').textContent =
        'Введіть ціле число від 1 до 10.';
      rating.focus();
      return;
    }

    if (!note.validity.valid) {
      note.reportValidity();
      note.focus();
      return;
    }

    saveNote(currentId, {
      rating: rating.valueAsNumber,
      text: note.value,
    });

    const name = getShow(currentId).name;
    dialog.close();
    refresh();
    document.querySelector('#status').textContent =
      `Нотатку до ${name} збережено`;
    restoreFocus();
  });
}