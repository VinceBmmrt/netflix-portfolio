"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getImageUrl, type Movie } from "@/lib/tmdb"

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  // Si pas de films, ne rien afficher
  if (!movies || movies.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-1 ${
            !isMoved ? "opacity-0" : "opacity-100"
          } group-hover:opacity-100 transition-opacity`}
          aria-label="Précédent"
          onClick={() => handleClick("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div ref={rowRef} className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-none w-[250px] transition-transform duration-300 hover:scale-110 hover:z-10"
            >
              <Link href={`/movie/${movie.id}`}>
                <div className="relative h-[140px] w-[250px] rounded-md overflow-hidden">
                  <Image
                    src={getImageUrl(movie.backdrop_path || movie.poster_path, "w500")}
                    alt={movie.title || movie.name || "Film"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 mb-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-gray-800/80 text-white hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-gray-800/80 text-white hover:bg-gray-800"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs">
                    <span className="text-green-500 font-bold mr-2">{Math.round(movie.vote_average * 10)}% match</span>
                    <span className="border px-1 mr-2">{movie.adult ? "18+" : "16+"}</span>
                    <span>{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4) || ""}</span>
                  </div>
                  <div className="text-xs mt-1 line-clamp-1">{movie.overview}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Suivant"
          onClick={() => handleClick("right")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}
