import { Info, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ClientOnly } from "@/components/client-only";
import { MovieRow } from "@/components/movie-row";
import { NetflixLogo } from "@/components/netflix-logo";
import { Button } from "@/components/ui/button";
import { getFeaturedMovie, getImageUrl, getMoviesByCategory } from "@/lib/tmdb";

export default async function Home() {
  const featuredMovie = await getFeaturedMovie();

  const trendingMovies = await getMoviesByCategory("trending");
  const topRatedMovies = await getMoviesByCategory("topRated");
  const netflixOriginals = await getMoviesByCategory("netflix");
  const actionMovies = await getMoviesByCategory("action");
  const comedyMovies = await getMoviesByCategory("comedy");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent px-4 py-4 md:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NetflixLogo className="h-8 w-24" />
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <Link href="/" className="hover:text-gray-300">
                Accueil
              </Link>
              <Link href="/" className="hover:text-gray-300">
                Séries
              </Link>
              <Link href="/" className="hover:text-gray-300">
                Films
              </Link>
              <Link href="/" className="hover:text-gray-300">
                Nouveautés
              </Link>
              <Link href="/" className="hover:text-gray-300">
                Ma Liste
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-transparent hover:text-gray-300"
            >
              S'identifier
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
        <Image
          src={
            getImageUrl(featuredMovie.backdrop_path, "original") ||
            "/placeholder.svg"
          }
          alt={featuredMovie.title || featuredMovie.name || "Film en vedette"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center px-4 md:px-12 z-20">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4 md:text-6xl line-clamp-2">
              {featuredMovie.title || featuredMovie.name}
            </h1>
            <p className="text-lg mb-6 line-clamp-3 md:line-clamp-4">
              {featuredMovie.overview}
            </p>
            <div className="flex space-x-4">
              <Button className="bg-white text-black hover:bg-white/90 px-6 py-2 rounded flex items-center gap-2">
                <Play className="h-5 w-5" />
                Lecture
              </Button>
              <Button
                variant="secondary"
                className="bg-gray-500/70 text-white hover:bg-gray-500/50 px-6 py-2 rounded flex items-center gap-2"
              >
                <Info className="h-5 w-5" />
                Plus d'infos
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="px-4 pb-12 md:px-12 -mt-16 relative z-30">
        <ClientOnly
          fallback={
            <div className="h-40 w-full bg-gray-900 animate-pulse rounded-md"></div>
          }
        >
          <MovieRow title="Tendances actuelles" movies={trendingMovies} />
          <MovieRow title="Films les mieux notés" movies={topRatedMovies} />
          <MovieRow title="Séries Netflix" movies={netflixOriginals} />
          <MovieRow title="Films d'action" movies={actionMovies} />
          <MovieRow title="Comédies" movies={comedyMovies} />
        </ClientOnly>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 md:px-12 text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">
            Ceci est un projet de portfolio et n'est pas affilié à Netflix. Créé
            à des fins de démonstration uniquement.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Relations Investisseurs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Emplois
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Préférences de cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Cartes cadeaux
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Presse
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Informations légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-8">© 2025 Portfolio Project</p>
        </div>
      </footer>
    </div>
  );
}
