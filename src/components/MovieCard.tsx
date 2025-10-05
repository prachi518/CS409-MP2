import React from "react";
import { Movie } from "../types";
import { posterUrl } from "../services/api";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl(movie.poster_path ?? undefined)} alt={movie.title} />
      </Link>
      <div className="movie-card-info">
        <h3>{movie.title}</h3>
        <div>{movie.release_date}</div>
        <div>⭐ {movie.vote_average ?? "—"}</div>
      </div>
    </div>
  );
}
