import { useEffect } from 'react';
// import './AppMain.scss';
import AppMainCard from './MainCard/AppMainCard';
import MainPaginator from './MainPaginator/MainPaginator';
import AppLoader from '../loader/AppLoader';
import { useActions, useAppSelector } from '../../state/redux-hooks';
import { useGetAllPokemonListQuery } from '../../services/api-query.service';
import { storeWrapper } from '@/state/store';
import { useRouter } from 'next/router';
import MainAbout from './MainAbout/MainAbout';

const AppMain = () => {
  const router = useRouter();
  const { limit, search, page, id } = router.query;
  // const [paginationUrlData] = useSearchParams();
  const searchState = useAppSelector((state) => state.search);
  const pokemonState = useAppSelector((state) => state.pokemon);
  // const paginationState = useAppSelector((state) => state.pagination);
  // const { setPokemon, setIsCardsLoading, setCurrPage, setCurrPageSize } =
  //   useActions();

  // const offset = (paginationState.currPage - 1) * paginationState.currPageSize;
  // const { data, isFetching } = useGetAllPokemonListQuery({
  //   limit: paginationState.currPageSize,
  //   offset,
  // });

  // useEffect(() => {
  //   const actualPage = paginationUrlData.get('page') ?? 1;
  //   const actualPageSize = paginationUrlData.get('pageSize') ?? 12;
  //   if (paginationState.currPage !== actualPage) setCurrPage(+actualPage);
  //   if (paginationState.currPageSize !== actualPageSize)
  //     setCurrPageSize(+actualPageSize);
  //   const init = async () => {
  //     data && setPokemon(data.results);
  //     setIsCardsLoading(isFetching);
  //   };
  //   init();
  // }, [
  //   data,
  //   isFetching,
  //   paginationState.currPage,
  //   paginationState.currPageSize,
  //   paginationUrlData,
  //   setCurrPage,
  //   setCurrPageSize,
  //   setIsCardsLoading,
  //   setPokemon,
  // ]);

  return (
    <main className="app-main">
      <AppLoader isLoading={pokemonState.isCardsLoading}></AppLoader>
      <article className="app-main-error-tip">
        <span>Tip: type &apos;error&apos; to break the app</span>
      </article>
      <div className="app-main-wrapper">
        <section className="app-main-list-wrapper">
          {searchState.search === '' && (
            <>
              <MainPaginator></MainPaginator>
              <ul className="app-main-ul">
                {pokemonState.takenPokemon.map((item) => (
                  <li key={item.name}>
                    <AppMainCard takenPokemon={item.name}></AppMainCard>
                  </li>
                ))}
              </ul>
            </>
          )}
          {searchState.search.length > 0 && (
            <>
              <ul className="app-main-ul">
                <li key={searchState.search}>
                  <AppMainCard takenPokemon={searchState.search}></AppMainCard>
                </li>
              </ul>
            </>
          )}
        </section>
        {id && <MainAbout />}
      </div>
    </main>
  );
};

export default AppMain;
