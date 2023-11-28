'use client'
import { setLocalSearchParam } from '../../../services/local-storage.service';
import { HeaderContextProps } from '@/shared/interfaces';

const SearchInput = (searchProps: HeaderContextProps) => {

  if (searchProps.searchParam === 'error')
    throw new Error('Error has been catched!');
  
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;;
    searchProps.setSearchParam(value);
    setLocalSearchParam(value);
  }
  return (
    <div>
      <input
        type="text"
        className="header-input"
        value={searchProps.searchParam}
        name="header-input"
        onChange={inputHandler}
      />
    </div>
  );
};

export default SearchInput;
