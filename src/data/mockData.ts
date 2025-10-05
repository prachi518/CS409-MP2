import { Movie } from "../types";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
];

const results: Movie[] = [
  {
    id: 1,
    title: "Mock Action Movie",
    overview: "Action-packed mock movie.",
    poster_path: null,
    release_date: "2020-01-01",
    vote_average: 7.5,
    genre_ids: [28],
  },
  {
    id: 2,
    title: "Mock Comedy Movie",
    overview: "Funny mock movie.",
    poster_path: null,
    release_date: "2021-06-15",
    vote_average: 6.8,
    genre_ids: [35],
  },
  {
    id: 3,
    title: "Mock Drama Film",
    overview: "Dramatic mock film.",
    poster_path: null,
    release_date: "2019-03-22",
    vote_average: 8.1,
    genre_ids: [18],
  },
  // add a few more...
];

export default { results, genres };
