"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useSearchStore } from "../model/store";
import debounce from "lodash.debounce";

export function SearchBar() {
  const { query, setQuery, clearQuery } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(query);

  const debouncedSearch = debounce((value: string) => {
    setQuery(value);
  }, 500);

  useEffect(() => {
    debouncedSearch(localQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [localQuery]);

  const handleClear = () => {
    setLocalQuery("");
    clearQuery();
    debouncedSearch.cancel();
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-zinc-400" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Поиск фильмов..."
          className="w-full rounded-lg border border-zinc-200 bg-white px-12 py-3 text-base text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600"
            aria-label="Очистить поиск"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
