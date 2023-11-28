import AppMainCard from './MainCard/AppMainCard';
import MainPaginator from './MainPaginator/MainPaginator';
import AppLoader from '../loader/AppLoader';
import { useAppSelector } from '../../state/redux-hooks';
import { useRouter } from 'next/router';
import MainAbout from './MainAbout/MainAbout';

const AppMain = () => {
  const router = useRouter();
  const { id } = router.query;
  const searchState = useAppSelector((state) => state.search);
  const pokemonState = useAppSelector((state) => state.pokemon);

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
