import { apiClient } from "@/shared/api/base";
import type { Movie, MovieDetails, MovieSearchResponse } from "@/shared/types/movie";

export const movieApi = {
  // Трендовые фильмы за неделю (для hero/trending)
  getTrendingMovies: async (page: number = 1): Promise<MovieSearchResponse> => {
    const { data } = await apiClient.get<MovieSearchResponse>("/trending/movie/week", {
      params: {
        page,
      },
    });
    return data;
  },

  // Получить популярные фильмы
  getPopularMovies: async (page: number = 1): Promise<MovieSearchResponse> => {
    const { data } = await apiClient.get<MovieSearchResponse>("/movie/popular", {
      params: {
        page,
      },
    });
    return data;
  },

  // Поиск фильмов
  searchMovies: async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
    const { data } = await apiClient.get<MovieSearchResponse>("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return data;
  },

  // Получить детальную информацию о фильме
  getMovieById: async (id: number): Promise<MovieDetails> => {
    const { data } = await apiClient.get<MovieDetails>(`/movie/${id}`, {
      params: {
        append_to_response: "credits", // Добавляем информацию об актерах
      },
    });
    return data;
  },

  // Получить жанры фильмов
  getGenres: async () => {
    const { data } = await apiClient.get<{ genres: Array<{ id: number; name: string }> }>(
      "/genre/movie/list"
    );
    return data.genres;
  },
};
