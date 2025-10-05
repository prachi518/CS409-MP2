import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, discoverMovies, posterUrl } from "../services/api";
import { Movie } from "../types";

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [list, setList] = useState<Movie[]>([]); // list to navigate prev/next

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        const mv = await getMovie(Number(id));
        setMovie(mv);
        // load list (discover)
        const l = await discoverMovies();
        setList(l || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [id]);

  if (!movie) return <div className="container">Loading...</div>;

  const idx = list.findIndex((m) => m.id === movie.id);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="detail">
        <img src={posterUrl(movie.poster_path ?? undefined)} alt={movie.title} />
        <div className="detail-info">
          <h2>{movie.title}</h2>
          <div><strong>Release:</strong> {movie.release_date}</div>
          <div><strong>Rating:</strong> {movie.vote_average}</div>
          <div><strong>Overview:</strong> <p>{movie.overview}</p></div>
          <div className="detail-controls">
            <button disabled={!prev} onClick={() => prev && navigate(`/movie/${prev.id}`)}>◀ Previous</button>
            <button disabled={!next} onClick={() => next && navigate(`/movie/${next.id}`)}>Next ▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}
