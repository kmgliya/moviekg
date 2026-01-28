import { MovieList } from "@/widgets/movie-list/ui/MovieList";
import { Header } from "@/widgets/header/ui/Header";
import { Hero } from "@/widgets/hero/ui/Hero";
import { SearchBar } from "@/features/search-movies/ui/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Hero />

        {/* Mobile search */}
        <div className="mt-6 md:hidden">
          <SearchBar />
        </div>

        <section id="popular" className="mt-10">
          <MovieList />
        </section>
      </main>
    </div>
  );
}
