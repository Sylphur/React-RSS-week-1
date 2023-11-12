import React, { useState } from 'react';
import {
  AppContextProps,
  PaginationData,
  PokemonListResponse,
  PokemonResponse,
  PokemonUrl,
  ReactNodeProps,
} from './shared/interfaces';
import { getLocalSearchParam } from './services/local-storage.service';
import { searchPokemon, searchPokemonList } from './services/api.service';

const AppContextInitialValues: AppContextProps = {
  takenPokemon: [],
  setTakenPokemon: () => {},
  isLoading: true,
  setIsLoading: () => {},
  paginationData: {
    currPage: 1,
    currPageSize: 12,
    totalCount: 30,
  },
  setPaginationData: () => {},
  search: () => {},
};

export const AppContext = React.createContext<AppContextProps>(
  AppContextInitialValues
);

export const AppContextProvider = ({ children }: ReactNodeProps) => {
  const [takenPokemon, setTakenPokemon] = useState<PokemonResponse[]>(
    AppContextInitialValues.takenPokemon
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    AppContextInitialValues.isLoading
  );
  const [paginationData, setPaginationData] = useState<PaginationData>(
    AppContextInitialValues.paginationData
  );

  const search = (setIsLoading: (isLoading: boolean) => void) => {
    setIsLoading(true);
    const param = getLocalSearchParam().toLowerCase();
    const result = [];

    if (param === '') {
      const offset =
        (paginationData.currPage - 1) * paginationData.currPageSize;
      searchPokemonList(paginationData.currPageSize, offset)
        .then((res) => res.json())
        .then((list: PokemonListResponse) => {
          const requests = list.results
            .slice(0, paginationData.currPageSize)
            .map((item: PokemonUrl) => searchPokemon(item.name));
          Promise.all(requests).then((response) => {
            const responses = response.map((res) => res.json());
            Promise.all(responses).then((pokemons: PokemonResponse[]) => {
              pokemons.forEach((pokemon) => result.push(pokemon));
              setTakenPokemon(pokemons);
              setIsLoading(false);
            });
          });
        });
    } else {
      searchPokemon(param)
        .then((res) => res.json())
        .then(
          (result: PokemonResponse) => {
            setTakenPokemon([result]);
            setIsLoading(false);
          },
          () => {
            setTakenPokemon([]);
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <AppContext.Provider
      value={{
        takenPokemon: takenPokemon,
        setTakenPokemon: setTakenPokemon,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        paginationData: paginationData,
        setPaginationData: setPaginationData,
        search: search,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
