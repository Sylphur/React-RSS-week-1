import React from 'react';
import { useState } from 'react';
import { ReactNodeProps } from '../../shared/interfaces';
import { getLocalSearchParam } from '../../services/local-storage.service';

interface HeaderContextProps {
  searchParam: string,
  setSearchParam: React.Dispatch<React.SetStateAction<string>>,
}
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
