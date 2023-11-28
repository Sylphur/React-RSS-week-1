// API interfaces
export interface PokemonResponse {
  height: number;
  id: number;
  name: string;
  order: number;
  sprites: {
    back_default: string;
    front_default: string;
  };
  weight: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
}
export interface PokemonListResponse {
  count: number;
  results: PokemonUrl[];
}
export interface PokemonUrl {
  name: string;
  url: string;
}

// Context interfaces
export interface HeaderContextProps {
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}
export interface AppContextProps {
  paginationData: PaginationData;
  setPaginationData: React.Dispatch<React.SetStateAction<PaginationData>>;
}

// Other interfaces
export interface PaginationData {
  currPage: number;
  currPageSize: number;
  totalCount: number;
}
export interface ReactNodeProps {
  children: React.ReactNode;
}
