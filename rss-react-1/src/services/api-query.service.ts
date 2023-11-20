import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonListResponse, PokemonResponse } from "../shared/interfaces";

interface getAllPokemonProps {
  limit: number,
  offset: number
}
export const pokemonAPI = createApi({
  reducerPath: 'Pokemon API',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => {
    return {
      getAllPokemonList: builder.query<PokemonListResponse, getAllPokemonProps>({
        query: ({ limit, offset }) => ({
          url: '',
          params: {
            limit,
            offset
          }
        })
      }),
      getPokemon: builder.query<PokemonResponse, string>({
        query: (name) => ({
          url: `/${name}`,
        })
      }),
    }
  }
})

export const { useGetAllPokemonListQuery, useGetPokemonQuery } = pokemonAPI;