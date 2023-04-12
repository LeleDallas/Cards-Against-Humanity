import { configureStore } from '@reduxjs/toolkit'
import { blackCards, userName, whiteCards } from '../reducers'

export const store = configureStore({
    reducer: {
        whiteCards: whiteCards.reducer,
        blackCards: blackCards.reducer,
        user: userName.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch