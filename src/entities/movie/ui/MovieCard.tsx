"use client";

import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/shared/types/movie";
import { getImageUrl } from "@/shared/lib/getImageUrl";
import { Film, Star, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path ? getImageUrl(movie.poster_path) : null;
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Film className="h-16 w-16 text-zinc-400 dark:text-zinc-600" />
          </div>
        )}
        {movie.vote_average > 0 && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
          {movie.title}
        </h3>
        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Calendar className="h-4 w-4" />
          <span>{releaseYear}</span>
        </div>
        {movie.overview && (
          <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {movie.overview}
          </p>
        )}
      </div>
    </Link>
  );
}
