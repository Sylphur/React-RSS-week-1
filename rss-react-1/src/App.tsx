import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/main/AppMain';
import { getLocalSearchParam } from './services/local-storage.service';
import {
  PokemonListResponse,
  PokemonResponse,
  PokemonUrl,
  searchPokemon,
  searchPokemonList,
} from './services/api.service';
import AppLoader from './components/loader/AppLoader';

const App = () => {
  const [searchParam, setSearchParam] = useState<string>(getLocalSearchParam());
  const [takenPokemon, setTakenPokemon] = useState<PokemonResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const search = () => {
    console.log('search');
    
    setIsLoading(true);
    const param = getLocalSearchParam().toLowerCase();
    const result = [];

    if (param === '') {
      searchPokemonList()
        .then((res) => res.json())
        .then((list: PokemonListResponse) => {
          const requests = list.results
            .slice(0, 9)
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
      searchPokemon(getLocalSearchParam().toLowerCase())
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
  }

  useEffect(() => {
    search()
  }, []);

  return (
    <>
        <AppHeader
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          searchPokemon={search}
        ></AppHeader>
        <AppMain
          takenPokemon={takenPokemon}
        ></AppMain>
        <AppLoader isLoading={isLoading}></AppLoader>
      </>
  );
};

export default App;