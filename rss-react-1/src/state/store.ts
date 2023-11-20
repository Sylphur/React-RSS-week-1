import { configureStore } from "@reduxjs/toolkit";
import { pokemonAPI } from "../services/api-query.service";
import searchSlice from "./reducers/searchSlice";
import pokemonSlice from "./reducers/pokemonSlice";
import paginationSlice from "./reducers/paginationSlice";

export const store = configureStore({
  reducer: {
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    search: searchSlice,
    pokemon: pokemonSlice,
    pagination: paginationSlice
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(pokemonAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;