import { useEffect, useState } from "react";
import { Movie, Genre } from "../types";
import { discoverMovies, getGenres } from "../services/api";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";

export default function GalleryView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  
  // Get selected genres from URL
  const selected = searchParams.get('genres')
    ? searchParams.get('genres')!.split(',').map(Number)
    : [];

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
    const newSelected = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
    
    if (newSelected.length > 0) {
      setSearchParams({ genres: newSelected.join(',') });
    } else {
      setSearchParams({});
    }
  }

  function clearGenres() {
    setSearchParams({});
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
        <button onClick={clearGenres} className="clear-btn">Clear</button>
      </div>

      <div className="gallery">
        {filtered.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}