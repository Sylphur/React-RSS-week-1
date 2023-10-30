import React, { Component } from 'react';
import { setLocalSearchParam } from '../../../services/local-storage.service';
import './SearchInput.scss'

interface SearchItemProps {
  searchParam:string;
  setSearchParam: (param: string) => void;
}

class SearchInput extends Component<SearchItemProps> {
  render() {
    return (
      <div>
        <input 
          type="text" 
          className='header-input'
          value={this.props.searchParam}
          onChange={ event => {
            this.props.setSearchParam(event.target.value);
            setLocalSearchParam(event.target.value);
          }}
          />
      </div>
    );
  }
}

export default SearchInput;