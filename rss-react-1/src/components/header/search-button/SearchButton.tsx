import { useContext } from 'react';
import { AppContext } from '../../../AppContext';
import { useActions } from '../../../state/redux-hooks';
import { getLocalSearchParam } from '../../../services/local-storage.service';

const SearchButton = () => {
  const useAppContext = useContext(AppContext);
  const { setSearch } = useActions();
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          useAppContext.search(useAppContext.setIsLoading);
          setSearch(getLocalSearchParam())
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;
