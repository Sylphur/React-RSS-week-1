import React, { Component } from 'react';
import { PokemonResponse } from '../../services/api.service';

import './AppMain.scss'
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface MainProps {
  takenPokemon: PokemonResponse | null;
}

class AppMain extends Component<MainProps> {
  throwError() {
    throw new Error ('I crashed!');
  }

  render() {
    if (this.props.takenPokemon !== null) return (
      <ErrorBoundary>
        <main className='app-main'>
          <img src={this.props.takenPokemon.sprites.front_default} alt="pokemon-img" />
          <p>Name: {this.props.takenPokemon.name}</p>
          <p>Height: {this.props.takenPokemon.height}</p>
          <p>Weight: {this.props.takenPokemon.weight}</p>
          <button onClick={this.throwError}>Throw an error</button>
        </main>
      </ErrorBoundary>
    );
    return (
      <ErrorBoundary>
        <main className='app-main-wrong'>
          <p>Nothing was found :(</p>
          <p>Try Pikachu, Ditto, Meowth or smth</p>
          <button onClick={this.throwError}>Throw an error</button>
        </main>
      </ErrorBoundary>
    )
  }
}

export default AppMain;