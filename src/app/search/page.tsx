/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PokemonCard } from '@/models/pokemonCard';
import PokemonCardResult from '@/components/pokemonCardResult';
import { motion } from "framer-motion"

export default function Search() {
    const [cardNbr, setCardNbr] = useState("")
    const [setNbr, setSetNbr] = useState("")
    let toastPostID: string

    const fetchCardData = async (cardNbr: string, setNbr: string) => {
        const response = await axios.get("/api/card", {
            params:
            {
                cardNumber: cardNbr.replace(/^0+/, ''),
                setNumber: setNbr.replace(/^0+/, '')
            }
        })

        return response.data.cards
    }

    const { data, refetch, isError, isInitialLoading, isFetching, error } = useQuery<PokemonCard[]>({
        queryKey: ["getCardData", cardNbr, setNbr],
        queryFn: () => fetchCardData(cardNbr, setNbr),
        enabled: false
    })

    if (data) {
        console.log(data)
    }

    return (
        <div>
            <div className="flex flex-col my-8 p-8">
                <h1 className='text-black text-xl'>Enter card details</h1>
                <input
                    value={cardNbr}
                    name='cardNbr'
                    placeholder='Card number'
                    onChange={(e) => setCardNbr(e.target.value)}
                    className="p-4 text-lg rounded-md my-2  bg-gray-200"
                />
                <input
                    value={setNbr}
                    name='setNbr'
                    placeholder='Set number'
                    onChange={(e) => setSetNbr(e.target.value)}
                    className="p-4 text-lg rounded-md my-2  bg-gray-200"
                />
                <button
                    onClick={(e) => {
                        //e.stopPropagation()
                        toastPostID = toast.loading("Searching...", { id: toastPostID })
                        refetch()
                    }}
                    disabled={isFetching}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"

                >
                    Find Card
                </button>
            </div>
            {
                data ? (data?.map((card) => (
                    <div key={card.cardId} className='flex flex-col px-10'>
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            transition={{ ease: "easeOut" }}
                            className="bg-white my-8 rounded-lg "
                        >
                            <PokemonCardResult pokemonCardInfo={card} />
                        </motion.div>
                    </div>
                ))) :
                    <div>{isFetching ? 'Fetching...' : null}</div>
            }

        </div>
    )
}

