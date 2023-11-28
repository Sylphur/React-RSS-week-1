import { useRouter } from 'next/router';
import { HeaderContextProps } from '@/shared/interfaces';

const SearchButton = (searchProps: HeaderContextProps) => {
  const router = useRouter();
  const searchClick = async () => {
    await router.push({
      query: {...router.query, search: searchProps.searchParam}
    })
  }
  return (
    <div>
      <button
        type="submit"
        onClick={searchClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;
