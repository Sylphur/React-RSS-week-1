import React, { useState } from 'react';
import {
  AppContextProps,
  PaginationData,
  ReactNodeProps,
} from '../shared/interfaces';

const AppContextInitialValues: AppContextProps = {
  paginationData: {
    currPage: 1,
    currPageSize: 12,
    totalCount: 30,
  },
  setPaginationData: () => {},
};

export const AppContext = React.createContext<AppContextProps>(
  AppContextInitialValues
);

export const AppContextProvider = ({ children }: ReactNodeProps) => {
  const [paginationData, setPaginationData] = useState<PaginationData>(
    AppContextInitialValues.paginationData
  );

  return (
    <AppContext.Provider
      value={{
        paginationData: paginationData,
        setPaginationData: setPaginationData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};