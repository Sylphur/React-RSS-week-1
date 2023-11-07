interface SearchButtonProps {
  searchPokemon: () => void;
}
const SearchButton = (props: SearchButtonProps) => {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          props.searchPokemon();
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;
