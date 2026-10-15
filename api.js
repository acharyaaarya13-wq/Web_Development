
import { OMDB_API_KEY } from "./config.js";

const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(movieName) {
  const url = `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(movieName)}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
