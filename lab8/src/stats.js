/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows) {
  const stats = {};

  for (const show of shows) {
    for (const genre of show.genres) {
      if (!stats[genre]) {
        stats[genre] = {
          count: 0,
          ratingSum: 0,
          ratingCount: 0,
          averageRating: null,
        };
      }

      stats[genre].count += 1;

      if (show.rating !== null) {
        stats[genre].ratingSum += show.rating;
        stats[genre].ratingCount += 1;
      }
    }
  }

  for (const genre of Object.keys(stats)) {
    const item = stats[genre];

    if (item.ratingCount > 0) {
      item.averageRating =
        Math.round((item.ratingSum / item.ratingCount) * 10) / 10;
    }

    delete item.ratingSum;
    delete item.ratingCount;
  }

  return stats;
}
