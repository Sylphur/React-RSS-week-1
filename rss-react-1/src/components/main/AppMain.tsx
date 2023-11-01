import { Component } from 'react';
import { PokemonResponse } from '../../services/api.service';

import './AppMain.scss';
import AppMainCard from './MainCard/AppMainCard';

interface MainProps {
  searchParam: string;
  takenPokemon: PokemonResponse[];
}

class AppMain extends Component<MainProps> {
  render() {
    if (this.props.takenPokemon.length === 0)
      return (
        <main className="app-main-wrong">
          <p>Nothing was found :(</p>
          <p>Try Pikachu, Ditto, Meowth or smth</p>
          <div className="app-main-error-tip">
            <span>Type &apos;error&apos; to break the app</span>
          </div>
        </main>
      );
    else
      return (
        <>
          <div className="app-main-error-tip">
            <span>Tip: type &apos;error&apos; to break the app</span>
          </div>
          <ul className="app-main-ul">
            {this.props.takenPokemon.map((item) => (
              <li key={item.name}>
                <AppMainCard takenPokemon={item}></AppMainCard>
              </li>
            ))}
          </ul>
        </>
      );
  }
}

export default AppMain;
