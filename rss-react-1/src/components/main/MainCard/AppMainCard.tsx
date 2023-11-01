import { Component } from 'react';
import { PokemonResponse } from '../../../services/api.service';

interface CardProps {
  takenPokemon: PokemonResponse;
}

class AppMainCard extends Component<CardProps> {
  render() {
    return (
      <>
        <div className="main-card-wrapper">
          <img
            src={this.props.takenPokemon.sprites.front_default}
            alt="pokemon-img"
          />
          <p>Name: {this.props.takenPokemon.name}</p>
          <p>Height: {this.props.takenPokemon.height}</p>
          <p>Weight: {this.props.takenPokemon.weight}</p>
        </div>
      </>
    );
  }
}

export default AppMainCard;
