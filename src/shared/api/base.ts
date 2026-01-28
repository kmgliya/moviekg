import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.warn(
    "⚠️ NEXT_PUBLIC_TMDB_API_KEY не установлен. Получите ключ на https://www.themoviedb.org/settings/api"
  );
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "ru-RU", // Русский язык для описаний
  },
});

// Импортируем функцию из shared/lib
export { getImageUrl } from "@/shared/lib/getImageUrl";
