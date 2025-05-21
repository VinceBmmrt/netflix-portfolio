import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "La clé API TMDB n'est pas configurée sur le serveur" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageBaseUrl: "https://image.tmdb.org/t/p",
      isConfigured: true,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la configuration TMDB:",
      error
    );
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la configuration" },
      { status: 500 }
    );
  }
}
