/** @typedef {import('./normalize.js').Show} Show */

/**
 * C3. Повертає новий масив серіалів, відсортований за полем `key`.
 * Специфікація — ТЗ, C3.
 *
 * @param {Show[]} shows
 * @param {'name' | 'year' | 'rating'} key
 * @param {'asc' | 'desc'} [direction]
 * @returns {Show[]}
 */
export function sortShows(shows, key, direction = 'asc') {
  return shows
    .map((show, index) => ({ show, index }))
    .sort((a, b) => {
      const first = a.show[key];
      const second = b.show[key];

      // null завжди в кінці
      if (first === null && second === null) {
        return a.index - b.index;
      }

      if (first === null) {
        return 1;
      }

      if (second === null) {
        return -1;
      }

      let result;

      if (key === 'name') {
        result = first.localeCompare(second, undefined, {
          sensitivity: 'base',
        });
      } else {
        result = first - second;
      }

      if (result === 0) {
        return a.index - b.index;
      }

      return direction === 'desc' ? -result : result;
    })
    .map(({ show }) => show);
}
