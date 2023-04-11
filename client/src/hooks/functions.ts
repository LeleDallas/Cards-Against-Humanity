import { Cards } from "../types/cards";

export const drawBlackCard = (black: Array<Cards>): Cards => {
    const index: number = Math.floor(Math.random() * black.length);
    return black[index];
}

export const drawWhiteCards = (white: Array<Cards>, quantity: number): Array<Cards> => {
    return [...white].sort(() => 0.5 - Math.random()).slice(0, quantity);
}