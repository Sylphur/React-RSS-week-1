import { Outlet } from 'react-router-dom';
import { PaginationData, PokemonResponse } from '../../shared/interfaces';
import './AppMain.scss';
import AppMainCard from './MainCard/AppMainCard';
import MainPaginator from './MainPaginator/MainPaginator';

interface MainProps {
  takenPokemon: PokemonResponse[];
  paginationData: PaginationData;
  setPaginationData: React.Dispatch<React.SetStateAction<PaginationData>>;
  searchPokemon: () => void;
}

const AppMain = (props: MainProps) => {
  if (props.takenPokemon.length === 0)
    return (
      <main className="app-main-wrong">
        <p>Nothing was found :/</p>
        <p>Try Pikachu, Ditto, Meowth or smth</p>
        <div className="app-main-error-tip">
          <span>Type &apos;error&apos; to break the app</span>
        </div>
      </main>
    );
  else return (
    <main className='app-main'>
      <article className="app-main-error-tip">
        <span>Tip: type &apos;error&apos; to break the app</span>
      </article>
      <div className="app-main-wrapper">
      <section className="app-main-list-wrapper">  
          {props.takenPokemon.length > 1 && <MainPaginator
            paginationData={props.paginationData}
            setPaginationData={props.setPaginationData}
            searchPokemon={props.searchPokemon}
            ></MainPaginator>}
          <ul className="app-main-ul">
            {props.takenPokemon.map((item) => (
              <li key={item.name}>
                <AppMainCard 
                  takenPokemon={item}
                  paginationData={props.paginationData}
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
