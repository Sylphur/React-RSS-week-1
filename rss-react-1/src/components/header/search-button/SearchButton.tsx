import React, { Component } from 'react';
import { PokemonResponse, searchPokemon } from '../../../services/api.service';
import { getLocalSearchParam } from '../../../services/local-storage.service';

interface SearchButtonProps {
  isLoading:boolean;
  setPokemon: (pokemon: PokemonResponse | null) => void
  setIsLoading: (param: boolean) => void;
}

class SearchButton extends Component<SearchButtonProps> {
  doSearch () {
    this.props.setIsLoading(true);
    searchPokemon(getLocalSearchParam().toLowerCase())
    .then(res => res.json())
    .then(
      (result:PokemonResponse) => {
      this.props.setPokemon(result)
      this.props.setIsLoading(false);
    },
      () => {
        this.props.setPokemon(null);
        this.props.setIsLoading(false);
      }
    )
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          this.doSearch()
        }}>Search</button>
      </div>
    );
  }
}

export default SearchButton;