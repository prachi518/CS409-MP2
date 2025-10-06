import axios from "axios";
import { Movie, GenreListResponse } from "../types";
import mockData from "../data/mockData";

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_KEY = "3f539a608b7b0059c1d2dbd6dd895412";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// If no API key provided, use mock data (so app still works offline)
const useMock = !API_KEY;

export const posterUrl = (path?: string) => (path ? `${IMG_BASE}${path}` : "/placeholder.png");

export async function searchMovies(query: string): Promise<Movie[]> {
  if (useMock) {
    if (!query) return mockData.results;
    return mockData.results.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
  }
  const res = await client.get("/search/movie", { params: { query, include_adult: false } });
  return res.data.results;
}

export async function getMovie(id: number): Promise<Movie> {
  if (useMock) {
    const found = mockData.results.find(m => m.id === id);
    if (!found) throw new Error("Not found in mock");
    return found;
  }
  const res = await client.get(`/movie/${id}`);
  return res.data;
}

export async function discoverMovies(): Promise<Movie[]> {
  if (useMock) return mockData.results;
  const res = await client.get("/discover/movie", { params: { sort_by: "popularity.desc" } });
  return res.data.results;
}

export async function getGenres(): Promise<GenreListResponse> {
  if (useMock) return { genres: mockData.genres };
  const res = await client.get("/genre/movie/list");
  return res.data;
}
