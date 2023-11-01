import { Component } from 'react';
import { PokemonResponse } from '../../../services/api.service';

interface SearchButtonProps {
  isLoading: boolean;
  setPokemon: (pokemon: PokemonResponse[]) => void;
  setIsLoading: (param: boolean) => void;
  searchPokemon: () => void;
}

class SearchButton extends Component<SearchButtonProps> {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.searchPokemon()
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchButton;
