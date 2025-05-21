import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Play, Plus, Star, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NetflixLogo } from "@/components/netflix-logo"
import { getImageUrl, getMovieDetails } from "@/lib/tmdb"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const id = Number.parseInt(params.id)
  const movie = await getMovieDetails(id)

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Film non trouvé</h1>
          <Link href="/" className="text-red-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  // Déterminer si c'est un film ou une série
  const isMovie = movie.title !== undefined
  const title = isMovie ? movie.title : movie.name
  const releaseDate = isMovie ? movie.release_date : movie.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : ""

  // Récupérer la bande-annonce si disponible
  const trailer = movie.videos?.results?.find((video: any) => video.type === "Trailer" && video.site === "YouTube")

  // Récupérer les acteurs principaux
  const cast = movie.credits?.cast?.slice(0, 5) || []

  // Récupérer les genres
  const genres = movie.genres || []

  // Calculer la durée en heures et minutes pour les films
  let duration = ""
  if (isMovie && movie.runtime) {
    const hours = Math.floor(movie.runtime / 60)
    const minutes = movie.runtime % 60
    duration = `${hours}h ${minutes}min`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent px-4 py-4 md:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NetflixLogo className="h-8 w-24" />
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="fixed top-20 left-4 z-40 md:left-12">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-black/20">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
        <Image
          src={getImageUrl(movie.backdrop_path, "original") || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
        />

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-12 md:px-12 z-20 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2 md:text-6xl">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
              <span className="text-green-500 font-bold">{Math.round(movie.vote_average * 10)}% match</span>
              <span>{year}</span>
              {movie.adult && <span className="border px-1">18+</span>}
              {duration && (
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {duration}
                </span>
              )}
              <span className="border px-2 py-0.5 text-xs rounded">HD</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((genre: any) => (
                <span key={genre.id} className="bg-red-600/20 px-2 py-1 rounded-md text-xs">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex space-x-4 mb-6">
              <Button className="bg-white text-black hover:bg-white/90 px-6 py-2 rounded flex items-center gap-2">
                <Play className="h-5 w-5" />
                Lecture
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-6 py-2 rounded flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Ma Liste
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-2 py-2 rounded-full">
                <ThumbsUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
          <p className="text-gray-300 mb-6">{movie.overview}</p>

          {cast.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Casting</h3>
              <div className="flex flex-wrap gap-2">
                {cast.map((actor: any) => (
                  <div key={actor.id} className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                    {actor.profile_path && (
                      <div className="relative h-6 w-6 rounded-full overflow-hidden">
                        <Image
                          src={getImageUrl(actor.profile_path, "w200") || "/placeholder.svg"}
                          alt={actor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>{actor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trailer && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Bande-annonce</h2>
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Détails</h3>

            <div className="space-y-4">
              {cast.length > 0 && (
                <div>
                  <span className="text-gray-400">Avec: </span>
                  <span>
                    {cast
                      .slice(0, 3)
                      .map((actor: any) => actor.name)
                      .join(", ")}
                    {cast.length > 3 && ", ..."}
                  </span>
                </div>
              )}

              {genres.length > 0 && (
                <div>
                  <span className="text-gray-400">Genres: </span>
                  <span>{genres.map((genre: any) => genre.name).join(", ")}</span>
                </div>
              )}

              <div>
                <span className="text-gray-400">Note: </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>

              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <span className="text-gray-400">Production: </span>
                  <span>
                    {movie.production_companies
                      .slice(0, 2)
                      .map((company: any) => company.name)
                      .join(", ")}
                  </span>
                </div>
              )}

              {isMovie ? (
                <div>
                  <span className="text-gray-400">Date de sortie: </span>
                  <span>
                    {new Date(movie.release_date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              ) : (
                <>
                  <div>
                    <span className="text-gray-400">Première diffusion: </span>
                    <span>
                      {movie.first_air_date
                        ? new Date(movie.first_air_date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Inconnue"}
                    </span>
                  </div>
                  {movie.number_of_seasons && (
                    <div>
                      <span className="text-gray-400">Saisons: </span>
                      <span>{movie.number_of_seasons}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
