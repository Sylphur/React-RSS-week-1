'use client';
import SearchInput from './search-input/SearchInput';
import SearchButton from './search-button/SearchButton';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import logo from '../../../public/pokeLogo.png';

import { useState } from 'react';
import Image from 'next/image';

const AppHeader = () => {
  const [searchParam, setSearchParam] = useState<string>(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('searchParam') || ''
      : ''
  );

  return (
    <header className="app-header">
      <ErrorBoundary>
        <Image
          width={200}
          height={120}
          src={logo}
          alt="Poke-logo"
          className="header-logo"
        />
        <SearchInput
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        ></SearchInput>
        <SearchButton
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        ></SearchButton>
      </ErrorBoundary>
    </header>
  );
};

export default AppHeader;
