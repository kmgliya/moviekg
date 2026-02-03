# MovieKG — приложение для поиска фильмов
Стек: **TypeScript**, **Next.js**, **Axios**, **Zustand**, **React Query**, **Feature-Sliced Design**.

## набор для старта

```bash
npm install
```

Создайте `.env.local` и добавьте TMDB API ключ:

```env
NEXT_PUBLIC_TMDB_API_KEY=ваш_ключ
```

Получить ключ: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

---

## Feature-Sliced Design

```
src/
├── app/                    # Роутинг и layout
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── movie/[id]/page.tsx
├── entities/movie/         # Сущность "фильм"
│   ├── api/movieApi.ts
│   └── ui/MovieCard.tsx
├── features/search-movies/ # Фича "поиск фильмов"
│   ├── model/store.ts
│   └── ui/SearchBar.tsx
├── widgets/                # Композитные блоки
│   ├── header/ui/Header.tsx
│   ├── hero/ui/Hero.tsx
│   └── movie-list/ui/MovieList.tsx
└── shared/                 # Общие модули
    ├── api/base.ts
    ├── lib/getImageUrl.ts
    ├── model/theme-store.ts
    ├── types/movie.ts
    └── ui/ThemeToggle.tsx
```
## Технологии

| Инструмент     | Назначение                                      |
|----------------|--------------------------------------------------|
| Next.js 16     | Рендеринг, роутинг, API-слой                    |
| TypeScript     | Типизация                                       |
| Tailwind CSS   | Стили                                           |
| React Query    | Запросы к API, кеш, состояния загрузки/ошибки   |
| Zustand        | Клиентское состояние (поиск, тема)              |
| Axios          | HTTP-клиент                                     |
| TMDB API       | Данные о фильмах                                |
| FSD            | Структура проекта                               |

---

## Реализованный функционал

### Страница со списком фильмов
- Показ популярных фильмов при загрузке
- Поиск с debounce (500 ms)
- Бесконечный скролл (Intersection Observer)
- Карточки: постер, название, год, рейтинг, описание
- Обработка loading / error / пустой результат
- Переход на страницу фильма по клику

### Страница деталей фильма
- Динамический роут `/movie/[id]`
- Полная информация: постер, жанры, описание, рейтинг, актёры
- Финансы (бюджет, сборы), страна, языки
- Кнопка «Назад» на главную
- Состояния загрузки и ошибок

### Hero-блок
- Featured-фильм из TMDB (тренды недели)
- Start Watching → страница фильма
- More Details → модалка с краткой информацией

### Общее
- Переключение светлая/тёмная тема (Zustand persist)
- Адаптивная вёрстка
- ESLint


## Скрипты

| Команда        | Описание            |
|----------------|---------------------|
| `npm run dev`  | Dev-сервер          |
| `npm run build`| Production-сборка   |
| `npm run start`| Production-сервер   |
| `npm run lint` | Проверка ESLint     |

---

## Лицензия

MIT
