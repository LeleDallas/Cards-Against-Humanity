
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cards: [
        {
            title: "1",
            isBlack: false,
        },
        {
            title: "2",
            isBlack: false,
        },
        {
            title: "3",
            isBlack: false,
        },
        {
            title: "4",
            isBlack: false,
        },
        {
            title: "5",
            isBlack: false,
        },
        {
            title: "6",
            isBlack: false,
        },
        {
            title: "7",
            isBlack: false,
        },
        {
            title: "8",
            isBlack: false,
        },
        {
            title: "9",
            isBlack: false,
        },
        {
            title: "10",
            isBlack: false,
        },
        {
            title: "11",
            isBlack: false,
        },
        {
            title: "12",
            isBlack: false,
        },
    ],
}

const userState = {
    name: "",
}


export const testBlackCards = createSlice({
    name: 'black',
    initialState: initialState,
    reducers: {
        updateBlack: (state, action) => {
            state.cards = action.payload
        }
    },
})

export const testWhiteCards = createSlice({
    name: 'white',
    initialState: initialState,
    reducers: {
        updateWhite: (state, action) => {
            state.cards = action.payload
        }
    },
})

export const testUserName = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        updateUserName: (state, action) => {
            state.name = action.payload
        }
    },
})

export const { updateBlack } = testBlackCards.actions
export const { updateWhite } = testWhiteCards.actions
export const { updateUserName } = testUserName.actions