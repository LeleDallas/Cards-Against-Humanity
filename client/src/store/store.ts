import { configureStore } from '@reduxjs/toolkit'
import { cardsSlice } from '../reducers'

export const store = configureStore({
    reducer: {
        cards: cardsSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch