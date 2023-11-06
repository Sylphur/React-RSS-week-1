import {
  setLocalSearchParam,
} from '../../../services/local-storage.service';
import './SearchInput.scss';

interface SearchItemProps {
  searchParam: string;
  setSearchParam: (param: string) => void;
}

const SearchInput = (props: SearchItemProps) => {
  if (props.searchParam === 'error') throw new Error('Error has been catched!');
  return (
    <div>
        <input
          type="text"
          className="header-input"
          value={props.searchParam}
          onChange={(event) => {
            props.setSearchParam(event.target.value);
            setLocalSearchParam(event.target.value);
          }}
        />
      </div>
  );
};

export default SearchInput;

// class SearchInput extends Component<SearchItemProps> {
//   render() {
//     const searchParam = getLocalSearchParam();
//     if (searchParam === 'error') throw new Error('Error has been catched!');

//     return (
//       <div>
//         <input
//           type="text"
//           className="header-input"
//           value={this.props.searchParam}
//           onChange={(event) => {
//             this.props.setSearchParam(event.target.value);
//             setLocalSearchParam(event.target.value);
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default SearchInput;
