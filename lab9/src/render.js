import { notes, shows, watchlist } from './state.js';

export function renderShows(list) {
  const template = document.querySelector('#show-card');
  const fragment = document.createDocumentFragment();

  for (const show of list) {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('li');
    card.dataset.id = String(show.id);

    const fields = {
      name: show.name,
      year: show.year ?? '—',
      genres: show.genres.length ? show.genres.join(', ') : '—',
      rating: show.rating ?? '—',
    };

    for (const [field, value] of Object.entries(fields)) {
      card.querySelectorAll(`[data-field="${field}"]`).forEach((node) => {
        node.textContent = String(value);
      });
    }

    card.querySelector('[data-action="toggle"]').setAttribute(
      'aria-pressed', String(watchlist.has(show.id))
    );

    const note = notes.get(show.id);
    card.querySelector('.card__mine').hidden = !note;
    card.querySelector('[data-field="my-rating"]').textContent =
      note ? String(note.rating) : '';

    const text = card.querySelector('[data-field="note"]');
    text.textContent = note?.text ?? '';
    text.hidden = !note?.text;
    fragment.append(clone);
  }

  document.querySelector('#results').replaceChildren(fragment);
  document.querySelector('#watchlist-count').textContent =
    String(watchlist.size);
  document.querySelector('#status').textContent = list.length
    ? `Знайдено: ${list.length} з ${shows.length}`
    : 'Нічого не знайдено';
}