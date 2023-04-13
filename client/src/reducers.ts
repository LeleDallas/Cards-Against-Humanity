
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cards: [],
}

const userState = {
    name: "",
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

export const userName = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        updateUserName: (state, action) => {
            state.name = action.payload
        }
    },
})

export const { updateBlack } = blackCards.actions
export const { updateWhite } = whiteCards.actions
export const { updateUserName } = userName.actions