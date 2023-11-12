import { useContext, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import './AppMain.scss';
import AppMainCard from './MainCard/AppMainCard';
import MainPaginator from './MainPaginator/MainPaginator';
import { possiblePageSize } from '../../shared/constants';
import AppLoader from '../loader/AppLoader';
import { AppContext } from '../../AppContext';

const AppMain = () => {
  const [paginationUrlData] = useSearchParams();
  const useAppContext = useContext(AppContext);

  useEffect(() => {
    const page = paginationUrlData.get('page') ?? 1;
    const pageSize = paginationUrlData.get('pageSize') ?? 12;

    if (+page !== useAppContext.paginationData.currPage)
    useAppContext.setPaginationData({
        ...useAppContext.paginationData,
        currPage: +page,
      });
    if (
      +pageSize !== useAppContext.paginationData.currPageSize &&
      possiblePageSize.indexOf(+pageSize) !== -1
    )
    useAppContext.setPaginationData({
        ...useAppContext.paginationData,
        currPageSize: +pageSize,
      });
      useAppContext.search(useAppContext.setIsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (useAppContext.takenPokemon.length === 0)
    return (
      <main className="app-main-wrong">
        <AppLoader isLoading={useAppContext.isLoading}></AppLoader>
        <p>Nothing was found :/</p>
        <p>Try Pikachu, Ditto, Meowth or smth</p>
        <div className="app-main-error-tip">
          <span>Type &apos;error&apos; to break the app</span>
        </div>
      </main>
    );
  else
    return (
      <main className="app-main">
        <AppLoader isLoading={useAppContext.isLoading}></AppLoader>
        <article className="app-main-error-tip">
          <span>Tip: type &apos;error&apos; to break the app</span>
        </article>
        <div className="app-main-wrapper">
          <section className="app-main-list-wrapper">
            {useAppContext.takenPokemon.length > 1 && (
              <MainPaginator></MainPaginator>
            )}
            <ul className="app-main-ul">
              {useAppContext.takenPokemon.map((item) => (
                <li key={item.name}>
                  <AppMainCard
                    takenPokemon={item}
                    paginationData={useAppContext.paginationData}
                  ></AppMainCard>
                </li>
              ))}
            </ul>
          </section>
          <Outlet />
        </div>
      </main>
    );
};

export default AppMain;
