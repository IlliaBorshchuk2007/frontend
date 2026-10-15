import { toggle } from './state.js';
import { openDetails } from './details.js';

export function initList(refresh) {
  const list = document.querySelector('#results');

  list.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button[data-action]');
    if (!button || !list.contains(button)) return;
    const card = button.closest('li[data-id]');
    if (!card) return;

    const id = Number(card.dataset.id);
    if (button.dataset.action === 'details') {
      openDetails(id);
      return;
    }
    if (button.dataset.action !== 'toggle') return;

    const index = [...list.children].indexOf(card);
    toggle(id);
    refresh();

    const same = list.querySelector(
      `li[data-id="${id}"] [data-action="toggle"]`
    );
    const neighbour = list.children[index] ?? list.children[index - 1];
    const target = same ??
      neighbour?.querySelector('[data-action="toggle"]');

    if (target) {
      target.focus();
    } else {
      const heading = document.querySelector('#results-heading');
      heading.tabIndex = -1;
      heading.focus();
    }
  });
}