import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse, PokemonResponse } from '../shared/interfaces';

interface getAllPokemonProps {
  limit: number;
  offset: number;
  search: string
}
export const pokemonAPI = createApi({
  reducerPath: 'Pokemon API',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => {
    return {
      getAllPokemonList: builder.query<PokemonListResponse, getAllPokemonProps>(
        {
          query: ({ limit, offset, search }) => ({
            url: `/${search}`,
            params: {
              limit,
              offset,
            },
          }),
        }
      ),
      getPokemon: builder.query<PokemonResponse, string>({
        query: (name) => ({
          url: `/${name}`,
        }),
      }),
    };
  },
});

export const { useGetAllPokemonListQuery, useGetPokemonQuery, util: {getRunningQueriesThunk} } = pokemonAPI;
export const { getAllPokemonList, getPokemon } = pokemonAPI.endpoints;
