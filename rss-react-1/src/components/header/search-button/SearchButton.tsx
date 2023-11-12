import { useContext } from "react";
import { AppContext } from "../../../AppContext";

const SearchButton = () => {
  const useAppContext = useContext(AppContext)
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          useAppContext.search(useAppContext.setIsLoading);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;
