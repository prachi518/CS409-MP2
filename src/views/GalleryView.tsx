import { useEffect, useState } from "react";
import { Movie, Genre } from "../types";
import { discoverMovies, getGenres } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function GalleryView() {
  const [items, setItems] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [g, movies] = await Promise.all([getGenres(), discoverMovies()]);
        setGenres(g.genres);
        setItems(movies || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  function toggleGenre(id: number) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const filtered = items.filter((m) => {
    if (selected.length === 0) return true;
    const ids = m.genre_ids ?? m.genres?.map(g => g.id) ?? [];
    return selected.every((s) => ids.includes(s));
  });

  return (
    <div className="container">
      <h2>Gallery</h2>

      <div className="genre-filters">
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => toggleGenre(g.id)}
            className={selected.includes(g.id) ? "active" : ""}
          >
            {g.name}
          </button>
        ))}
        <button onClick={() => setSelected([])} className="clear-btn" >Clear</button>
      </div>

      <div className="gallery">
        {filtered.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
