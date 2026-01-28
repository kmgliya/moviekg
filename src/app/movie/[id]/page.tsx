"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, DollarSign, Film, Globe, Star } from "lucide-react";

import { movieApi } from "@/entities/movie/api/movieApi";
import { getImageUrl } from "@/shared/lib/getImageUrl";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export default function MovieDetailsPage() {
  const params = useParams();
  const movieId = Number(params.id);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => movieApi.getMovieById(movieId),
    enabled: Number.isFinite(movieId),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">Загрузка...</div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="mb-4 text-lg text-red-600 dark:text-red-400">Фильм не найден</p>
          <Link
            href="/"
            className="text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path ? getImageUrl(movie.poster_path, "w780") : null;
  const backdropUrl = movie.backdrop_path ? getImageUrl(movie.backdrop_path, "original") : null;

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
      amount
    );

  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}ч ${m}м` : `${m}м`;
  };

  const mainCast = movie.credits?.cast?.slice(0, 10) ?? [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {backdropUrl && (
        <div className="relative h-[380px] w-full overflow-hidden">
          <Image src={backdropUrl} alt={movie.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-black dark:via-black/80" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-5 w-5" />
            Назад к списку
          </Link>
          <ThemeToggle />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-100 shadow-lg dark:bg-zinc-900">
              {posterUrl ? (
                <Image src={posterUrl} alt={movie.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" priority />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Film className="h-24 w-24 text-zinc-400 dark:text-zinc-600" />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mb-4 text-lg italic text-zinc-600 dark:text-zinc-400">{movie.tagline}</p>
            )}

            <div className="mb-6 flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              {movie.release_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{releaseDate}</span>
                </div>
              )}
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {movie.vote_average.toFixed(1)} ({movie.vote_count} оценок)
                  </span>
                </div>
              )}
            </div>

            {!!movie.genres?.length && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Жанры:</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="rounded-full bg-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.overview && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Описание:</p>
                <p className="text-zinc-600 dark:text-zinc-400">{movie.overview}</p>
              </div>
            )}

            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="mb-4 grid grid-cols-2 gap-4">
                {movie.budget > 0 && (
                  <div>
                    <p className="mb-1 text-xs text-zinc-500">Бюджет</p>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {formatCurrency(movie.budget)}
                      </p>
                    </div>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <p className="mb-1 text-xs text-zinc-500">Сборы</p>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {formatCurrency(movie.revenue)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!!mainCast.length && (
              <div className="mb-4">
                <p className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">В главных ролях:</p>
                <div className="flex flex-wrap gap-2">
                  {mainCast.map((a) => (
                    <div key={a.id} className="rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{a.name}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">{a.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.homepage && (
              <div className="mt-6">
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <Globe className="h-4 w-4" />
                  Официальный сайт
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}