import { OMDB_API_KEY } from '../config.js';

const BASE_URL = 'https://www.omdbapi.com/';

async function requestOMDb(params) {
  if (!OMDB_API_KEY) {
    throw new Error('OMDb API key is missing.');
  }

  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    apikey: OMDB_API_KEY,
    ...params,
  }).toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network request failed.');
  }

  const data = await response.json();

  if (data.Response !== 'True') {
    throw new Error(data.Error || 'Request failed.');
  }

  return data;
}

export async function searchMovies(term) {
  const data = await requestOMDb({
    s: term,
    type: 'movie',
  });

  return data.Search;
}

export async function getMovieDetails(imdbID) {
  return requestOMDb({
    i: imdbID,
    plot: 'full',
  });
}