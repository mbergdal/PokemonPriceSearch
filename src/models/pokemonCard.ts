export type PokemonCard = {
  cardId: string;
  name: string;
  variant: string;
  rarity: string;
  set: string;
  highSoldPrice: {
    amountInMinorUnits: number;
    currencyCode: string;
  };
  image: string | null;
};
