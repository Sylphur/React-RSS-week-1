import { getLocalSearchParam } from "../../services/local-storage.service";
import { PokemonResponse } from "../../shared/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  search: string,
  takenPokemon: PokemonResponse[],
}
const initialState: PokemonState = {
  search: getLocalSearchParam(),
  takenPokemon: []
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setPokemon: (state, action: PayloadAction<PokemonResponse[]>) => {
      state.takenPokemon = action.payload
    }
  }
})
export const {setSearch, setPokemon} = pokemonSlice.actions;
export default pokemonSlice.reducer;