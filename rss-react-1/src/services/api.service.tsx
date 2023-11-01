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
  url: string
}

export const searchPokemon = (name: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

export const searchPokemonList = () => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/`)
}

export const doSearch = async (param: string):Promise<PokemonResponse[]> => {
    const result: PokemonResponse[] = [];

    if (param === '') {
      searchPokemonList()
        .then((res) => res.json())
        .then((
          (list: PokemonListResponse) => {
            console.log(list);
            const requests = list.results.slice(0, 9).map((item: PokemonUrl) => searchPokemon(item.name));
            Promise.all(requests)
            .then(
              (response) => {
                const responses = response.map((res) => res.json());
                Promise.all(responses)
                .then(
                  (pokemons: PokemonResponse[]) => {pokemons.forEach((pokemon) => result.push(pokemon));
                    return result;
                  })
              }
              )
          }
        ))
        
    } 
    else {
    searchPokemon(param)
      .then((response) => response.json())
      .then(
        (res: PokemonResponse) => {
          return result.push(res);
        },
      );
  }
  return result;
}