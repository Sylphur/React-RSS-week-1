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

export const searchPokemon = (name: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

export const searchPokemonList = () => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/`);
};
