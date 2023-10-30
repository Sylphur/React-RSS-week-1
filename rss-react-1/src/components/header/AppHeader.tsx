import React, { Component } from 'react';
import SearchInput from './search-input/SearchInput';
import SearchButton from './search-button/SearchButton';
import logo from '../../public/pokeLogo.png';

import './AppHeader.scss';
import { PokemonResponse } from '../../services/api.service';

export interface HeaderProps {
  searchParam:string;
  isLoading:boolean;
  setSearchParam: (param: string) => void;
  setPokemon: (pokemon: PokemonResponse | null) => void;
  setIsLoading: (param: boolean) => void;
}

class AppHeader extends Component<HeaderProps> {
  render() {
    return (
      <header className='app-header'>
        <img src={logo} alt="Poke-logo" className='header-logo'/>
        <SearchInput 
          searchParam={this.props.searchParam} 
          setSearchParam={this.props.setSearchParam}
        ></SearchInput>

        <SearchButton 
          isLoading={this.props.isLoading}
          setPokemon={this.props.setPokemon}
          setIsLoading={this.props.setIsLoading}
        ></SearchButton>
      </header>
    );
  }
}

export default AppHeader;