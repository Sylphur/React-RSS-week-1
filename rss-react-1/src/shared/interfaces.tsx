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
  next: string | null;
  previous: string | null;
  results: PokemonUrl[];
}
export interface PokemonUrl {
  name: string;
  url: string;
}
// Context interfaces

// Other interfaces
export interface PaginationData {
  currPage: number;
  currPageSize: number;
  totalCount: number;
}
export interface ReactNodeProps {
  children: React.ReactNode;
}