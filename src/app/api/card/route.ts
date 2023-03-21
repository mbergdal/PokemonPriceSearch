import { PokemonCard } from "@/models/pokemonCard";
import { NextRequest, NextResponse } from "next/server";
import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

export async function GET(request: NextRequest) {
  const res = await fetch(
    `https://pokemon-tcg-card-prices.p.rapidapi.com/card${request.nextUrl.search}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.X_RAPID_API_KEY as string,
        "X-RapidAPI-Host": process.env.X_RAPID_API_HOST as string,
      },
    }
  );
  const data = await res.json();
  const cards: PokemonCard[] = extractData(data);
  try {
    const pokedex = await P.getPokemonByName(cards[0].name.toLowerCase());
    if (pokedex) {
      cards.map(
        (card) =>
          (card.image =
            pokedex.sprites.other["official-artwork"].front_default ?? null)
      );
    }
  } catch (e) {
    console.log("Error getting images: " + e);
  }
  console.log(cards);
  return NextResponse.json({ cards });
}

function extractData(jsonData: any): PokemonCard[] {
  const resultsList: PokemonCard[] = [];
  jsonData.results.map((cardData: PokemonCard) => {
    resultsList.push({
      name: cardData.name,
      cardId: cardData.cardId,
      variant: cardData.variant,
      rarity: cardData.rarity,
      set: cardData.set,
      highSoldPrice: cardData.highSoldPrice,
      image: null,
    });
  });
  return resultsList;
}
