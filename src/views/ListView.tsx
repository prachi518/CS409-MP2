import { useEffect, useState } from "react";
import { Movie } from "../types";
import { searchMovies, discoverMovies } from "../services/api";
import useDebounce from "../utils/useDebounce";
import SearchBar from "../components/SearchBar";
import { Link, useSearchParams } from "react-router-dom";

type SortKey = "title" | "release_date" | "vote_average";

export default function ListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get all params from URL
  const query = searchParams.get('search') || '';
  const sortKey = (searchParams.get('sort') as SortKey) || 'title';
  const asc = searchParams.get('order') !== 'desc'; // default to asc if not specified
  
  const debouncedQuery = useDebounce(query, 250);
  const [items, setItems] = useState<Movie[]>([]);

  const handleSearchChange = (value: string) => {
    const newParams: any = {};
    if (value) newParams.search = value;
    if (sortKey !== 'title') newParams.sort = sortKey;
    if (!asc) newParams.order = 'desc';
    setSearchParams(newParams);
  };

  const handleSortChange = (newSortKey: SortKey) => {
    const newParams: any = {};
    if (query) newParams.search = query;
    if (newSortKey !== 'title') newParams.sort = newSortKey;
    if (!asc) newParams.order = 'desc';
    setSearchParams(newParams);
  };

  const handleOrderToggle = () => {
    const newParams: any = {};
    if (query) newParams.search = query;
    if (sortKey !== 'title') newParams.sort = sortKey;
    if (asc) newParams.order = 'desc'; // toggle: if currently asc, make it desc
    setSearchParams(newParams);
  };

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
      <SearchBar value={query} onChange={handleSearchChange} placeholder="Search movies..." />

      <div className="controls">
        <label>
          Sort by:
          <select value={sortKey} onChange={(e) => handleSortChange(e.target.value as SortKey)}>
            <option value="title">Title</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
          </select>
        </label>

        <label>
          Order:
          <button onClick={handleOrderToggle}>{asc ? "Asc" : "Desc"}</button>
        </label>
      </div>

      <ul className="list">
        {sorted().map((m) => (
          <div className="list-item" key={m.id}>
            <Link to={`/movie/${m.id}`}>
              <strong>{m.title}</strong>
            </Link>
            <span className="movie-date">{m.release_date}</span>
            <span className="movie-rating">⭐ {m.vote_average ?? "—"}</span>
          </div>
        ))}
      </ul>
    </div>
  );
}