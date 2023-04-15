import { configureStore } from '@reduxjs/toolkit'
import { blackCards, userName, whiteCards } from '../reducers'
import { testBlackCards, testUserName, testWhiteCards } from '../testReducer'

export const store = configureStore({
    reducer: {
        whiteCards: whiteCards.reducer,
        blackCards: blackCards.reducer,
        user: userName.reducer,
    },
})


export const testStore = configureStore({
    reducer: {
        whiteCards: testWhiteCards.reducer,
        blackCards: testBlackCards.reducer,
        user: testUserName.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch