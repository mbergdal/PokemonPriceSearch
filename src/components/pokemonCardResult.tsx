'use client'

import { PokemonCard } from "@/models/pokemonCard";
import Image from "next/image";
import pokemonDefault from "../../public/pokemon-default.webp"

type Props = {
    pokemonCardInfo: PokemonCard
}

export default function PokemonCardResult({ pokemonCardInfo }: Props) {
    return (
        <div className="w-full rounded-lg shadow-md lg:max-w-sm">
            <Image className="object-cover w-full h-48"
                src={pokemonCardInfo.image ?? pokemonDefault}
                alt="image" width={300} height={200} />
            <div className="p-4">
                <h1 className="text-xl font-semibold tracking-tight text-blue-600">
                    {pokemonCardInfo.name}
                </h1>
                <p className="mb-2 leading-normal">
                    Rarity: {pokemonCardInfo.rarity}
                </p>
                <p className="mb-2 leading-normal">
                    Set: {pokemonCardInfo.set}
                </p>
                <p className="mb-2 leading-normal">
                    Variant: {pokemonCardInfo.variant}
                </p>
                <div>
                    <h3 className="font-bold text-lg">Highest selling price</h3>
                    {pokemonCardInfo.highSoldPrice ?
                        <p className="font-bold">{pokemonCardInfo.highSoldPrice?.amountInMinorUnits / 100} {pokemonCardInfo.highSoldPrice?.currencyCode}</p> :
                        <p className="font-bold text-red-400">No price information found</p>
                    }
                </div>
                <button
                    className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow justify-center"
                    onClick={() => alert("Added")}
                >

                    Add to my Cards
                </button>
            </div>
        </div>


    )
}