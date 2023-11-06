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
    <>
          <div className="app-main-error-tip">
            <span>Tip: type &apos;error&apos; to break the app</span>
          </div>
          {props.takenPokemon.length > 1 && <MainPaginator
            paginationData={props.paginationData}
            setPaginationData={props.setPaginationData}
            searchPokemon={props.searchPokemon}
            ></MainPaginator>}
          <ul className="app-main-ul">
            {props.takenPokemon.map((item) => (
              <li key={item.name}>
                <AppMainCard takenPokemon={item}></AppMainCard>
              </li>
            ))}
          </ul>
        </>
  );
};

export default AppMain;
