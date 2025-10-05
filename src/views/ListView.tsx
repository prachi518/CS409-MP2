import { useEffect, useState } from "react";
import { Movie } from "../types";
import { searchMovies, discoverMovies } from "../services/api";
import useDebounce from "../utils/useDebounce";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

type SortKey = "title" | "release_date" | "vote_average";

export default function ListView() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [items, setItems] = useState<Movie[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = debouncedQuery ? await searchMovies(debouncedQuery) : await discoverMovies();
        setItems(res || []);
      } catch (e) {
        console.error(e);
        setItems([]);
      }
    }
    load();
  }, [debouncedQuery]);

  function sorted() {
    const copy = [...items];
    copy.sort((a, b) => {
      let av: any = a[sortKey as keyof Movie] ?? "";
      let bv: any = b[sortKey as keyof Movie] ?? "";
      // normalize
      if (sortKey === "title") {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      } else {
        av = av || 0;
        bv = bv || 0;
      }
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    });
    return copy;
  }

  return (
    <div className="container">
      <h2>Movie List</h2>
      <SearchBar value={query} onChange={setQuery} placeholder="Search movies..." />

      <div className="controls">
        <label>
          Sort by:
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
            <option value="title">Title</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
          </select>
        </label>

        <label>
          Order:
          <button onClick={() => setAsc((s) => !s)}>{asc ? "Asc" : "Desc"}</button>
        </label>
      </div>

      <ul className="list">
        {sorted().map((m) => (
          <li key={m.id} className="list-item">
            <Link to={`/movie/${m.id}`}>
              <strong>{m.title}</strong> — {m.release_date} — ⭐ {m.vote_average ?? "—"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
