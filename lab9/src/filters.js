export function readFilters() {
  const form = document.querySelector('#filters');
  return {
    query: form.elements.namedItem('query').value,
    genre: form.elements.namedItem('genre').value,
    mine: form.elements.namedItem('mine').checked,
  };
}

export function initFilters(refresh) {
  const form = document.querySelector('#filters');
  form.addEventListener('submit', (event) => event.preventDefault());
  form.elements.namedItem('query').addEventListener('input', refresh);
  form.elements.namedItem('genre').addEventListener('change', refresh);
  form.elements.namedItem('mine').addEventListener('change', refresh);

  form.addEventListener('reset', (event) => {
    event.preventDefault();
    for (const field of form.elements) {
      if (field instanceof HTMLInputElement) {
        if (field.type === 'checkbox') {
          field.checked = field.defaultChecked;
        } else {
          field.value = field.defaultValue;
        }
      } else if (field instanceof HTMLSelectElement) {
        field.selectedIndex = 0;
      }
    }
    refresh();
  });
}