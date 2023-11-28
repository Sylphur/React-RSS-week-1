import { pokemonAPI } from '@/services/api-query.service';
import { PokemonUrl } from '../../shared/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PokemonState {
  takenPokemon: PokemonUrl[];
  isCardsLoading: boolean;
  isDetailsPageLoading: boolean;
}
const initialState: PokemonState = {
  takenPokemon: [],
  isCardsLoading: true,
  isDetailsPageLoading: true,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<PokemonUrl[]>) => {
      state.takenPokemon = action.payload;
    },
    setIsCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isCardsLoading = action.payload;
    },
    setIsDetailsPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsPageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonAPI.endpoints.getAllPokemonList.matchPending,
      (state) => {
        state.isCardsLoading = true;
        state.takenPokemon = [];
      }
    );
    builder.addMatcher(
      pokemonAPI.endpoints.getAllPokemonList.matchFulfilled,
      (state, action) => {
        state.isCardsLoading = false;
        if (action.payload?.results) {
          state.takenPokemon = action.payload.results;
        } else {
          state.takenPokemon = [];
        }
      }
    );
    builder.addMatcher(
      pokemonAPI.endpoints.getAllPokemonList.matchRejected,
      (state) => {
        state.isCardsLoading = false;
        state.takenPokemon = [];
      }
    );
  },
});
export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice.reducer;
