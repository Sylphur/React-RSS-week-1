import { PokemonUrl } from "../../shared/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  takenPokemon: PokemonUrl[],
  isCardsLoading: boolean,
  isDetailsPageLoading: boolean,
}
const initialState: PokemonState = {
  takenPokemon: [],
  isCardsLoading: true,
  isDetailsPageLoading: true
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<PokemonUrl[]>) => {
      state.takenPokemon = action.payload
    },
    setIsCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isCardsLoading = action.payload
    },
    setIsDetailsPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsPageLoading = action.payload
    },
  }
})
export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice.reducer;