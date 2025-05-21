// Clé API TMDB - à remplacer par votre propre clé
// Vous devrez créer un compte sur https://www.themoviedb.org/ et obtenir une clé API
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";

// Vérifier si la clé API est définie
if (!API_KEY) {
  console.warn(
    "⚠️ La clé API TMDB n'est pas définie. Veuillez ajouter votre clé API dans le fichier .env.local"
  );
}
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  media_type?: string;
  adult?: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

// Fonction pour obtenir l'URL de l'image
export function getImageUrl(path: string | null, size = "original"): string {
  if (!path) return "/placeholder.svg?height=400&width=300&text=No+Image";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

// Fonction pour obtenir un film populaire aléatoire pour le hero
export async function getFeaturedMovie(): Promise<Movie> {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=fr-FR`,
      { next: { revalidate: 3600 } } // Revalider toutes les heures
    );

    if (!res.ok)
      throw new Error("Erreur lors de la récupération des films tendance");

    const data = await res.json();
    const movies = data.results.filter(
      (movie: Movie) => movie.backdrop_path && movie.overview
    );

    // Sélectionner un film aléatoire parmi les 5 premiers
    return movies[Math.floor(Math.random() * Math.min(5, movies.length))];
  } catch (error) {
    console.error("Erreur:", error);
    // Retourner un film par défaut en cas d'erreur
    return {
      id: 0,
      title: "Erreur de chargement",
      backdrop_path: null,
      poster_path: null,
      overview: "Impossible de charger les données du film.",
      vote_average: 0,
      genre_ids: [],
    };
  }
}

// Fonction pour obtenir les films par catégorie
export async function getMoviesByCategory(category: string): Promise<Movie[]> {
  try {
    let endpoint = "";

    switch (category) {
      case "trending":
        endpoint = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=fr-FR`;
        break;
      case "topRated":
        endpoint = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=fr-FR`;
        break;
      case "netflix":
        // Films Netflix (approximation via le fournisseur Netflix)
        endpoint = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213&language=fr-FR`;
        break;
      case "action":
        endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=fr-FR`;
        break;
      case "comedy":
        endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&language=fr-FR`;
        break;
      case "horror":
        endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=fr-FR`;
        break;
      case "romance":
        endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749&language=fr-FR`;
        break;
      case "documentaries":
        endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&language=fr-FR`;
        break;
      default:
        endpoint = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=fr-FR`;
    }

    const res = await fetch(endpoint, { next: { revalidate: 3600 } });

    if (!res.ok)
      throw new Error(`Erreur lors de la récupération des films: ${category}`);

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Erreur pour la catégorie ${category}:`, error);
    return [];
  }
}

// Fonction pour obtenir les genres
export async function getGenres(): Promise<Record<number, string>> {
  try {
    const res = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`,
      { next: { revalidate: 86400 } } // Revalider tous les jours
    );

    if (!res.ok) throw new Error("Erreur lors de la récupération des genres");

    const data = await res.json();
    const genresMap: Record<number, string> = {};

    data.genres.forEach((genre: Genre) => {
      genresMap[genre.id] = genre.name;
    });

    return genresMap;
  } catch (error) {
    console.error("Erreur:", error);
    return {};
  }
}

// Fonction pour obtenir les détails d'un film
export async function getMovieDetails(
  id: number,
  mediaType = "movie"
): Promise<any> {
  try {
    const res = await fetch(
      `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=fr-FR&append_to_response=videos,credits`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok)
      throw new Error(
        `Erreur lors de la récupération des détails du film ${id}`
      );

    return await res.json();
  } catch (error) {
    console.error(`Erreur pour le film ${id}:`, error);
    return null;
  }
}
