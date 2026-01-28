"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Info, Play, X } from "lucide-react";

import { movieApi } from "@/entities/movie/api/movieApi";
import { getImageUrl } from "@/shared/lib/getImageUrl";
import type { Movie } from "@/shared/types/movie";

export function Hero() {
  const { data } = useQuery({
    queryKey: ["trending", "week"],
    queryFn: () => movieApi.getTrendingMovies(1),
  });

  const featured: Movie | undefined = data?.results?.[0];
  const [open, setOpen] = useState(false);

  const year = featured?.release_date
    ? new Date(featured.release_date).getFullYear()
    : undefined;

  const backdrop = featured?.backdrop_path
    ? getImageUrl(featured.backdrop_path, "w780")
    : undefined;

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-sky-500/10 p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_0%,rgba(56,189,248,0.25),transparent_55%)]" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
              #1 Trending this week
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Explore the <span className="text-sky-300">Universe</span> of Cinematic Masterpieces
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300">
              Ищи фильмы, смотри детали, рейтинги и актёров. Лента поддерживает поиск с debounce и бесконечную
              подгрузку.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={featured ? `/movie/${featured.id}` : "#popular"}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                <Play className="h-4 w-4" />
                Start Watching
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Info className="h-4 w-4" />
                More Details
              </button>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 text-white">
              <div>
                <div className="text-lg font-semibold">24k+</div>
                <div className="text-xs text-zinc-400">Movies</div>
              </div>
              <div>
                <div className="text-lg font-semibold">180+</div>
                <div className="text-xs text-zinc-400">Genres</div>
              </div>
              <div>
                <div className="text-lg font-semibold">4.9</div>
                <div className="text-xs text-zinc-400">Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              {backdrop ? (
                <div className="relative h-full w-full">
                  <Image
                    src={backdrop}
                    alt={featured?.title ?? "Featured movie"}
                    fill
                    className="object-cover opacity-70"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between text-xs text-zinc-200">
                      <span className="rounded-full bg-black/40 px-2 py-1">Featured</span>
                      {year && (
                        <span className="rounded-full bg-black/40 px-2 py-1">{year}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {featured?.title ?? "Loading..."}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-200">
                        {featured?.overview ||
                          "Пример hero‑карточки. Дальше подключим реальный featured из TMDB + модалку."}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-zinc-300">
                      Featured
                    </span>
                    <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-zinc-300">2026</span>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">Dune: Part Two</div>
                    <div className="mt-1 text-xs leading-5 text-zinc-300">
                      Пример hero-карточки. Дальше подключим реальный featured из TMDB + модалку.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Modal with more details */}
      {open && featured && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative flex max-w-3xl flex-col overflow-hidden rounded-2xl bg-zinc-950 text-white shadow-xl md:flex-row">
            {featured.poster_path && (
              <div className="relative hidden w-64 shrink-0 overflow-hidden border-r border-white/10 md:block">
                <Image
                  src={getImageUrl(featured.poster_path, "w500")}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 rounded-full bg-white/10 p-1 text-zinc-300 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mb-2 text-xs uppercase tracking-wide text-sky-400">Trending now</p>
              <h2 className="text-xl font-semibold sm:text-2xl">{featured.title}</h2>
              {year && <p className="mt-1 text-xs text-zinc-400">{year}</p>}
              <p className="mt-3 text-sm leading-6 text-zinc-200 line-clamp-5">
                {featured.overview || "Описание недоступно для этого фильма."}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-300">
                {featured.vote_average > 0 && (
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    Rating: {featured.vote_average.toFixed(1)}
                  </span>
                )}
                {featured.popularity > 0 && (
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    Popularity: {Math.round(featured.popularity)}
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/movie/${featured.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                  onClick={() => setOpen(false)}
                >
                  <Play className="h-4 w-4" />
                  Go to movie page
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

