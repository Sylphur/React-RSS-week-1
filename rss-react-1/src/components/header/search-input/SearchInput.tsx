import { useContext } from 'react';
import { setLocalSearchParam } from '../../../services/local-storage.service';

import './SearchInput.scss';
import { HeaderContext } from '../HeaderContext';

const SearchInput = () => {
  const useHeaderContext = useContext(HeaderContext);
  if (useHeaderContext.searchParam === 'error')
    throw new Error('Error has been catched!');
  return (
    <div>
      <input
        type="text"
        className="header-input"
        value={useHeaderContext.searchParam}
        name="header-input"
        onChange={(event) => {
          useHeaderContext.setSearchParam(event.target.value);
          setLocalSearchParam(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
