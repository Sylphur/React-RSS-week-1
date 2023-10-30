import React, { Component } from 'react';
import { PokemonResponse } from '../../services/api.service';

import './AppMain.scss'

interface MainProps {
  takenPokemon: PokemonResponse | null;
}

class AppMain extends Component<MainProps> {
  render() {
    if (this.props.takenPokemon !== null) return (
      <main className='app-main'>
        <img src={this.props.takenPokemon.sprites.front_default} alt="pokemon-img" />
        <p>Name: {this.props.takenPokemon.name}</p>
        <p>Height: {this.props.takenPokemon.height}</p>
        <p>Weight: {this.props.takenPokemon.weight}</p>
      </main>
    );
    return (
      <main className='app-main-wrong'>
        <p>Nothing was found :(</p>
        <p>Try Pikachu, Ditto, Meowth or smth</p>
      </main>
    )
  }
}

export default AppMain;