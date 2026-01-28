// Утилита для получения URL изображений TMDB

export const getImageUrl = (
  path: string | null,
  size: "w500" | "w780" | "original" = "w500"
): string => {
  if (!path) {
    // Возвращаем data URI для SVG заглушки
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
      <rect fill="#e4e4e7" width="500" height="750"/>
      <text x="250" y="375" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="20" fill="#918196">No Poster</text>
    </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
