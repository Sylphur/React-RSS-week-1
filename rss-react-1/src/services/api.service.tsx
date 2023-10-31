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

export const searchPokemon = (name: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
};
