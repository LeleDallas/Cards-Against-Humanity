import { Cards } from "../types/cards";

export const drawBlackCard = (black: Array<Cards>): Cards =>
    black[Math.floor(Math.random() * black.length)];

export const drawWhiteCards = (white: Array<Cards>, quantity: number): Array<Cards> =>
    [...white].sort(() => 0.5 - Math.random()).slice(0, quantity);


export const drawNew = (playerHand: Array<Cards>, selected: string) =>
    playerHand.filter((card, _) => card.title !== selected)

export const setCurrentSolution = (
    solution: string,
    selected: string,
    setSelected: (string: string) => void,
    setSolution: (isSelected: boolean) => void
) => {
    if (solution !== selected) {
        setSelected(solution)
        setSolution(true)
    }
    else {
        setSelected("")
        setSolution(false)
    }
}
