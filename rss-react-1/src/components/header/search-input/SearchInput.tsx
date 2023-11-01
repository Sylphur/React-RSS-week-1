import { Component } from 'react';
import {
  getLocalSearchParam,
  setLocalSearchParam,
} from '../../../services/local-storage.service';
import './SearchInput.scss';

interface SearchItemProps {
  searchParam: string;
  setSearchParam: (param: string) => void;
}

class SearchInput extends Component<SearchItemProps> {
  render() {
    const searchParam = getLocalSearchParam();
    if (searchParam === 'error') throw new Error('Error has been catched!');

    return (
      <div>
        <input
          type="text"
          className="header-input"
          value={this.props.searchParam}
          onChange={(event) => {
            this.props.setSearchParam(event.target.value);
            setLocalSearchParam(event.target.value);
          }}
        />
      </div>
    );
  }
}

export default SearchInput;
