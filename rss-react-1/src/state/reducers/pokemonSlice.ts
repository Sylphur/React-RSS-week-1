import { PokemonResponse } from "../../shared/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  takenPokemon: PokemonResponse[],
  isDetailsPageLoading: boolean
}
const initialState: PokemonState = {
  takenPokemon: [],
  isDetailsPageLoading: false
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<PokemonResponse[]>) => {
      state.takenPokemon = action.payload
    },
    setIsDetailsPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsPageLoading = action.payload
    },
  }
})
export const {setPokemon, setIsDetailsPageLoading} = pokemonSlice.actions;
export default pokemonSlice.reducer;