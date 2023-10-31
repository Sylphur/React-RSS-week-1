import { Component } from 'react';
import { PokemonResponse } from '../../services/api.service';

import './AppMain.scss';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface MainProps {
  takenPokemon: PokemonResponse | null;
}

class AppMain extends Component<MainProps> {

  render() {
    if (this.props.takenPokemon !== null)
      return (
        <ErrorBoundary>
          <main className="app-main">
            <img
              src={this.props.takenPokemon.sprites.front_default}
              alt="pokemon-img"
            />
            <p>Name: {this.props.takenPokemon.name}</p>
            <p>Height: {this.props.takenPokemon.height}</p>
            <p>Weight: {this.props.takenPokemon.weight}</p>
            <div className='app-main-error-tip'>
              <span>Tip: type &apos;error&apos; to break the app</span>
            </div>
          </main>
        </ErrorBoundary>
      );
    return (
      <ErrorBoundary>
        <main className="app-main-wrong">
          <p>Nothing was found :(</p>
          <p>Try Pikachu, Ditto, Meowth or smth</p>
          <div className='app-main-error-tip'>
              <span>Type &apos;error&apos; to break the app</span>
          </div>
        </main>
      </ErrorBoundary>
    );
  }
}

export default AppMain;
