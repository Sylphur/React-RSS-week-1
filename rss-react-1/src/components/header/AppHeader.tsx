import SearchInput from './search-input/SearchInput';
import SearchButton from './search-button/SearchButton';
import logo from '../../public/pokeLogo.png';

import './AppHeader.scss';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { HeaderContextProvider } from './HeaderContext';

const AppHeader = () => {
  return (
    <HeaderContextProvider>
      <header className="app-header">
        <ErrorBoundary>
          <img src={logo} alt="Poke-logo" className="header-logo" />
          <SearchInput></SearchInput>
          <SearchButton></SearchButton>
        </ErrorBoundary>
      </header>
    </HeaderContextProvider>
  );
};

export default AppHeader;
