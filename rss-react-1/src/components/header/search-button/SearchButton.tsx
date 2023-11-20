import { useActions } from '../../../state/redux-hooks';
import { getLocalSearchParam } from '../../../services/local-storage.service';

const SearchButton = () => {
  const { setSearch } = useActions();
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          setSearch(getLocalSearchParam())
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;
