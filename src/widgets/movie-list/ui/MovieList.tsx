"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { movieApi } from "@/entities/movie/api/movieApi";
import { MovieCard } from "@/entities/movie/ui/MovieCard";
import { useSearchStore } from "@/features/search-movies/model/store";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function MovieList() {
  const { query } = useSearchStore(); 

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const popularMoviesQuery = useInfiniteQuery({
    queryKey: ["movies", "popular"],
    queryFn: ({ pageParam = 1 }) => movieApi.getPopularMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: query.length < 3,
  });

  const searchMoviesQuery = useInfiniteQuery({
    queryKey: ["movies", "search", query],
    queryFn: ({ pageParam = 1 }) => movieApi.searchMovies(query, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: query.length >= 3,
  });

  const activeQuery = query.length >= 3 ? searchMoviesQuery : popularMoviesQuery;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    activeQuery;

  // Бесконечный скролл
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Загрузка
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-600 dark:text-zinc-400" />
      </div>
    );
  }

  // Ошибка
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="mb-4 h-16 w-16 text-red-400" />
        <p className="text-lg text-red-600 dark:text-red-400">
          Ошибка при загрузке фильмов.
        </p>
        {error instanceof Error && (
          <p className="mt-2 text-sm text-zinc-500">{error.message}</p>
        )}
      </div>
    );
  }


  const movies = data?.pages.flatMap((page) => page.results || []).filter((movie) => movie && movie.id) || [];

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="mb-4 h-16 w-16 text-zinc-400 dark:text-zinc-600" />
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Фильмы не найдены
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {query.length >= 3 && (
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Найдено результатов: {data?.pages[0]?.total_results || 0}
        </p>
      )}
      
      {!query && (
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Популярные фильмы
        </h2>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      <div ref={loadMoreRef} className="mt-8 flex justify-center h-10">
        {isFetchingNextPage && (
          <Loader2 className="h-6 w-6 animate-spin text-zinc-600 dark:text-zinc-400" />
        )}
      </div>
    </div>
  );
}