import { Component, ReactNode } from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/main/AppMain';
import { getLocalSearchParam } from './services/local-storage.service';
import { PokemonListResponse, PokemonResponse, PokemonUrl, searchPokemon, searchPokemonList } from './services/api.service';
import AppLoader from './components/loader/AppLoader';

class App extends Component {
  state = {
    searchParam: getLocalSearchParam(),
    takenPokemon: [],
    isLoading: true,
  };
  setSearchParam(param: string) {
    this.setState({ searchParam: param });
  }
  setTakenPokemon(pokemon: PokemonResponse[]) {
    this.setState({ takenPokemon: pokemon });
  }
  setIsLoading(param: boolean) {
    this.setState({ isLoading: param });
  }
  searchPokemon() {
    this.setIsLoading(true);
    const param = getLocalSearchParam().toLowerCase();
    const result = [];
    const random = Math.random() * 10;

    if (param === '') {
      searchPokemonList()
        .then((res) => res.json())
        .then((
          (list: PokemonListResponse) => {
            console.log(list);
            const requests = list.results.slice(random, random + 9).map((item: PokemonUrl) => searchPokemon(item.name));
            Promise.all(requests)
            .then(
              (response) => {
                const responses = response.map((res) => res.json());
                Promise.all(responses)
                .then(
                  (pokemons: PokemonResponse[]) => {pokemons.forEach((pokemon) => result.push(pokemon));
                  this.setTakenPokemon(pokemons);
                  this.setIsLoading(false);
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
          this.setTakenPokemon([result]);
          this.setIsLoading(false);
        },
        () => {
          this.setTakenPokemon([]);
          this.setIsLoading(false);
        }
      );
  }
  }

  componentDidMount() {
    this.searchPokemon();
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
          searchPokemon={this.searchPokemon.bind(this)}
        ></AppHeader>
        <AppMain 
        searchParam={this.state.searchParam}
        takenPokemon={this.state.takenPokemon}
        ></AppMain>
        <AppLoader isLoading={this.state.isLoading}></AppLoader>
      </>
    );
  }
}

export default App;
