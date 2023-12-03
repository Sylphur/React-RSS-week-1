import { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Outlet } from 'react-router-dom';

const App = () => {
  // const [searchParam, setSearchParam] = useState<string>(getLocalSearchParam());
  // const [takenPokemon, setTakenPokemon] = useState<PokemonResponse[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [paginationData, setPaginationData] = useState<PaginationData>({
  //   currPage: 1,
  //   currPageSize: 12,
  //   totalCount: 30,
  // });
  // const [paginationUrlData] = useSearchParams();

  // const search = () => {
  //   setIsLoading(true);
  //   const param = getLocalSearchParam().toLowerCase();
  //   const result = [];

  //   if (param === '') {
  //     const offset =
  //       (paginationData.currPage - 1) * paginationData.currPageSize;
  //     searchPokemonList(paginationData.currPageSize, offset)
  //       .then((res) => res.json())
  //       .then((list: PokemonListResponse) => {
  //         const requests = list.results
  //           .slice(0, paginationData.currPageSize)
  //           .map((item: PokemonUrl) => searchPokemon(item.name));
  //         Promise.all(requests).then((response) => {
  //           const responses = response.map((res) => res.json());
  //           Promise.all(responses).then((pokemons: PokemonResponse[]) => {
  //             pokemons.forEach((pokemon) => result.push(pokemon));
  //             setTakenPokemon(pokemons);
  //             setIsLoading(false);
  //           });
  //         });
  //       });
  //   } else {
  //     searchPokemon(getLocalSearchParam().toLowerCase())
  //       .then((res) => res.json())
  //       .then(
  //         (result: PokemonResponse) => {
  //           setTakenPokemon([result]);
  //           setIsLoading(false);
  //         },
  //         () => {
  //           setTakenPokemon([]);
  //           setIsLoading(false);
  //         }
  //       );
  //   }
  // };
  useEffect(() => {
    // const page = paginationUrlData.get('page') ?? 1;
    // const pageSize = paginationUrlData.get('pageSize') ?? 12;

    // if (+page !== paginationData.currPage)
    //   setPaginationData({ ...paginationData, currPage: +page });
    // if (
    //   +pageSize !== paginationData.currPageSize &&
    //   possiblePageSize.indexOf(+pageSize) !== -1
    // )
    //   setPaginationData({ ...paginationData, currPageSize: +pageSize });
    // search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
};

export default App;
