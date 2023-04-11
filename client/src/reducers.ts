
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cards: [],
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        getCards: (state, action) => {
            state.cards = action.payload
            // localStorage.setItem("Cards", JSON.stringify(action.payload))
        },
        updateCards: (state, action) => {
            state.cards = action.payload
            // localStorage.setItem("Cards", JSON.stringify(action.payload))
        }
    },
})

export const { getCards: userCards, updateCards } = cardsSlice.actions

export default cardsSlice.reducer