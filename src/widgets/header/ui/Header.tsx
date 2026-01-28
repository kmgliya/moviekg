"use client";

import Link from "next/link";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { SearchBar } from "@/features/search-movies/ui/SearchBar";
import { Film } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300">
            <Film className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-white">MovieKG</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-zinc-300 md:flex">
          <a className="hover:text-white" href="#trending">
            Trending
          </a>
          <a className="hover:text-white" href="#popular">
            Popular
          </a>
        </nav>

        <div className="ml-auto hidden w-[420px] max-w-full md:block">
          <SearchBar />
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}

