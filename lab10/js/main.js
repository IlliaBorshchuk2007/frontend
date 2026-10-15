/* Courtly Booking — entry point */

import { fetchVenues } from './api.js';
import { renderResults } from './render.js';
import { openBooking } from './booking.js';
import { toISODate } from './format.js';

const form = document.getElementById('search-form');
const results = document.getElementById('results');
const status = document.getElementById('status');

// Venues currently on screen
let venues = [];
let latestRequest = 0;

/* Mobile menu */

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

/* Search */

form.date.value = toISODate(new Date());

function readFilters() {
  return { city: form.city.value, sport: form.sport.value };
}

async function handleSearch(event) {
  event.preventDefault();
  const requestId = ++latestRequest;
  status.textContent = 'Шукаємо…';
  results.setAttribute('aria-busy', 'true');

  const found = await fetchVenues(readFilters());
  if (requestId !== latestRequest) return;
  renderResults(results, found);
  venues = found;
  status.textContent = found.length ? `Знайдено: ${found.length}` : 'Нічого не знайдено';
  results.setAttribute('aria-busy', 'false');
}

form.addEventListener('submit', handleSearch);

/* Booking */

results.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest('.venue-card__book');
  if (!button || !results.contains(button)) return;
  const venue = venues.find((item) => item.id === button.dataset.id);
  openBooking(venue, form.date.value || toISODate(new Date()));
});

/* Initial state: popular venues */

const initialRequest = ++latestRequest;
const popular = await fetchVenues({ popular: true });
if (initialRequest === latestRequest) {
  venues = popular;
  renderResults(results, venues);
  results.setAttribute('aria-busy', 'false');
  status.textContent = `Популярні майданчики: ${venues.length}`;
}
