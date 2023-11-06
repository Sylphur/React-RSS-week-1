export const searchPokemon = (name: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

export const searchPokemonList = (limit:number, offset:number) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
};
