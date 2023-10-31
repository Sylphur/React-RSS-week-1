import { Component, ReactNode } from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/main/AppMain';
import { getLocalSearchParam } from './services/local-storage.service';
import { PokemonResponse, searchPokemon } from './services/api.service';
import AppLoader from './components/loader/AppLoader';

class App extends Component {
  state = {
    searchParam: getLocalSearchParam(),
    takenPokemon: null,
    isLoading: true,
  };
  setSearchParam(param: string) {
    this.setState({ searchParam: param });
  }
  setTakenPokemon(pokemon: PokemonResponse | null) {
    this.setState({ takenPokemon: pokemon });
  }
  setIsLoading(param: boolean) {
    this.setState({ isLoading: param });
  }

  componentDidMount() {
    searchPokemon(this.state.searchParam.toLowerCase())
      .then((res) => res.json())
      .then(
        (result: PokemonResponse) => {
          this.setState({ takenPokemon: result });
          this.setIsLoading(false);
        },
        () => {
          this.setState({ takenPokemon: null });
          this.setIsLoading(false);
        }
      );
  }

  render(): ReactNode {
    return (
      <>
        <AppHeader
          searchParam={this.state.searchParam}
          isLoading={this.state.isLoading}
          setSearchParam={this.setSearchParam.bind(this)}
          setPokemon={this.setTakenPokemon.bind(this)}
          setIsLoading={this.setIsLoading.bind(this)}
        ></AppHeader>
        <AppMain takenPokemon={this.state.takenPokemon}></AppMain>
        <AppLoader isLoading={this.state.isLoading}></AppLoader>
      </>
    );
  }
}

export default App;
