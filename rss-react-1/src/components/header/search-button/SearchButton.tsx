import { Component } from 'react';
import { PokemonListResponse, PokemonResponse, PokemonUrl, searchPokemon, searchPokemonList } from '../../../services/api.service';
import { getLocalSearchParam } from '../../../services/local-storage.service';

interface SearchButtonProps {
  isLoading: boolean;
  setPokemon: (pokemon: PokemonResponse[]) => void;
  setIsLoading: (param: boolean) => void;
}

class SearchButton extends Component<SearchButtonProps> {
  doSearch() {
    this.props.setIsLoading(true);
    const param = getLocalSearchParam().toLowerCase();
    const result = [];
    const random = Math.random() * 10;

    if (param === '') {
      searchPokemonList()
        .then((res) => res.json())
        .then((
          (list: PokemonListResponse) => {
            const requests = list.results.slice(random, random + 9).map((item: PokemonUrl) => searchPokemon(item.name));
            Promise.all(requests)
            .then(
              (response) => {
                const responses = response.map((res) => res.json());
                console.log(responses);
                
                Promise.all(responses)
                .then(
                  (pokemons: PokemonResponse[]) => {pokemons.forEach((pokemon) => result.push(pokemon));
                  this.props.setPokemon(pokemons);
                  this.props.setIsLoading(false);
                  })
              }
              )
          }
        ))
    } 
    else {
    searchPokemon(getLocalSearchParam().toLowerCase())
      .then((res) => res.json())
      .then(
        (result: PokemonResponse) => {
          this.props.setPokemon([result]);
          this.props.setIsLoading(false);
        },
        () => {
          this.props.setPokemon([]);
          this.props.setIsLoading(false);
        }
      );
  }
}
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.doSearch();
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchButton;
