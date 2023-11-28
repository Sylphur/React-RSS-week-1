'use client'
import SearchInput from './search-input/SearchInput';
import SearchButton from './search-button/SearchButton';
import logo from '../../../public/pokeLogo.png';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import Image from 'next/image';
import { useState } from 'react';

const AppHeader = () => {
  const [searchParam, setSearchParam] = useState<string>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('searchParam') || '' : ''
  );

  return (
      <header className="app-header">
        <ErrorBoundary>
          <Image fill={true} src={logo} alt="Poke-logo" className="header-logo" />
          <SearchInput searchParam={searchParam} setSearchParam={setSearchParam}></SearchInput>
          <SearchButton searchParam={searchParam} setSearchParam={setSearchParam}></SearchButton>
        </ErrorBoundary>
      </header>
  );
};

export default AppHeader;
