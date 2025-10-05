export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[]; // sometimes returned
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}
