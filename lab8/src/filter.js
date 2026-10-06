/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} FilterOptions
 * @property {string | null} [query] частина назви
 * @property {string | null} [genre] жанр
 * @property {number | null} [minRating] мінімальна оцінка
 */

/**
 * C2. Повертає серіали, які відповідають усім заданим фільтрам.
 * Специфікація — ТЗ, C2.
 *
 * @param {Show[]} shows
 * @param {FilterOptions} [options]
 * @returns {Show[]}
 */
export function filterShows(shows, options) {
  const { query, genre, minRating } = options ?? {};

  const normalizedQuery =
    typeof query === 'string' ? query.trim().toLowerCase() : '';

  const hasQuery = normalizedQuery.length > 0;
  const hasGenre = typeof genre === 'string' && genre.length > 0;
  const hasMinRating = minRating !== null && minRating !== undefined && minRating !== 0;

  return shows.filter((show) => {
    if (
      hasQuery &&
      !show.name.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }

    if (hasGenre && !show.genres.includes(genre)) {
      return false;
    }

    if (
      hasMinRating &&
      (show.rating === null || show.rating < minRating)
    ) {
      return false;
    }

    return true;
  });
}
