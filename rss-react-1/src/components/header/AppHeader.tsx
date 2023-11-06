import SearchInput from './search-input/SearchInput';
import SearchButton from './search-button/SearchButton';
import logo from '../../public/pokeLogo.png';

import './AppHeader.scss';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export interface HeaderProps {
  searchParam: string;
  setSearchParam: (param: string) => void;
  searchPokemon: () => void;
}

const AppHeader = (props: HeaderProps) => {
  return (
    <header className="app-header">
      <ErrorBoundary>
        <img src={logo} alt="Poke-logo" className="header-logo" />
        <SearchInput
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
        ></SearchInput>

        <SearchButton
          searchPokemon={props.searchPokemon}
        ></SearchButton>
      </ErrorBoundary>
    </header>
  );
};

export default AppHeader;