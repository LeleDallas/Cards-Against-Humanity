
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cards: [],
}

export const blackCards = createSlice({
    name: 'black',
    initialState: initialState,
    reducers: {
        updateBlack: (state, action) => {
            state.cards = action.payload
        }
    },
})

export const whiteCards = createSlice({
    name: 'white',
    initialState: initialState,
    reducers: {
        updateWhite: (state, action) => {
            state.cards = action.payload
        }
    },
})

export const { updateBlack } = blackCards.actions
export const { updateWhite } = whiteCards.actions