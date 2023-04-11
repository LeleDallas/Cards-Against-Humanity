import { configureStore } from '@reduxjs/toolkit'
import { blackCards, whiteCards } from '../reducers'

export const store = configureStore({
    reducer: {
        whiteCards: whiteCards.reducer,
        blackCards: blackCards.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch