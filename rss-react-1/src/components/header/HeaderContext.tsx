import React from 'react';
import { useState } from 'react';
import { HeaderContextProps, ReactNodeProps } from '../../shared/interfaces';
import { getLocalSearchParam } from '../../services/local-storage.service';

const HeaderContextInitialValues: HeaderContextProps = {
  searchParam: '',
  setSearchParam: () => {},
}

export const HeaderContext = React.createContext<HeaderContextProps>(HeaderContextInitialValues);

export function HeaderContextProvider({ children }: ReactNodeProps) {
  const [searchParam, setSearchParam] = useState<string>(getLocalSearchParam());


  return (
    <HeaderContext.Provider
      value={{ 
        searchParam: searchParam,
        setSearchParam: setSearchParam
       }}>
      {children}
    </HeaderContext.Provider>
  );
}
