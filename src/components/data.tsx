// Data.ts

import "../index.css";

// Define the shape of each card item in the data
export interface CardType {
  id: number;
  name: string;
  img: string;
  matched: boolean;
}

// Define the array of card items
const Data: CardType[] = [
  {
    id: 1,
    name: "chips",
    img: "/memory/casino-chips.png",
    matched: false,
  },
  {
    id: 2,
    name: "club",
    img: "/memory/club.png",
    matched: false,
  },
  {
    id: 3,
    name: "coin",
    img: "/memory/coin.png",
    matched: false,
  },
  {
    id: 4,
    name: "diamonds",
    img: "/memory/diamonds.png",
    matched: false,
  },
  {
    id: 5,
    name: "dices",
    img: "/memory/dices.png",
    matched: false,
  },
  {
    id: 6,
    name: "seven",
    img: "/memory/seven.png",
    matched: false,
  },
  {
    id: 7,
    name: "chips",
    img: "/memory/casino-chips.png",
    matched: false,
  },
  {
    id: 8,
    name: "club",
    img: "/memory/club.png",
    matched: false,
  },
  {
    id: 9,
    name: "coin",
    img: "/memory/coin.png",
    matched: false,
  },
  {
    id: 10,
    name: "diamonds",
    img: "/memory/diamonds.png",
    matched: false,
  },
  {
    id: 11,
    name: "dices",
    img: "/memory/dices.png",
    matched: false,
  },
  {
    id: 12,
    name: "seven",
    img: "/memory/seven.png",
    matched: false,
  },
];

export default Data;
