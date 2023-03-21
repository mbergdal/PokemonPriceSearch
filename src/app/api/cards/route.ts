import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://pokemon-tcg-card-prices.p.rapidapi.com/card/c4cbb4b6-ceba-4b14-8e28-ad2b590ccd59",
    {
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.X_RAPID_API_KEY as string,
        "X-RapidAPI-Host": process.env.X_RAPID_API_HOST as string,
      },
    }
  );
  const data = await res.json();

  return NextResponse.json({ data });
}