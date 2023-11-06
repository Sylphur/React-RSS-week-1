import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/main/AppMain';
import { getLocalSearchParam } from './services/local-storage.service';
import {
  searchPokemon,
  searchPokemonList,
} from './services/api.service';
import AppLoader from './components/loader/AppLoader';
import { PaginationData, PokemonListResponse, PokemonResponse, PokemonUrl } from './shared/interfaces';
import { useSearchParams } from 'react-router-dom';
import { possiblePageSize } from './shared/constants';

const App = () => {
  const [searchParam, setSearchParam] = useState<string>(getLocalSearchParam());
  const [takenPokemon, setTakenPokemon] = useState<PokemonResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationData, setPaginationData] = useState<PaginationData>({currPage: 1, currPageSize: 12, totalCount: 30});
  const [paginationUrlData] = useSearchParams();

  const search = () => {
    console.log(paginationData);
    
    setIsLoading(true);
    const param = getLocalSearchParam().toLowerCase();
    const result = [];

    if (param === '') {
      const offset = (paginationData.currPage - 1) * (paginationData.currPageSize);
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
    const page = paginationUrlData.get('page') ?? 1;
    const pageSize = paginationUrlData.get('pageSize') ?? 12;

    if (+page !== paginationData.currPage) setPaginationData({...paginationData, currPage: +page});
    if (+pageSize !== paginationData.currPageSize && possiblePageSize.indexOf(+pageSize) !== -1) 
      setPaginationData({...paginationData, currPageSize: +pageSize});
    search();
  }, [])

  return (
    <>
        <AppHeader
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          searchPokemon={search}
        ></AppHeader>
        <AppMain
          takenPokemon={takenPokemon}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
          searchPokemon={search}
        ></AppMain>
        <AppLoader isLoading={isLoading}></AppLoader>
      </>
  );
};

export default App;