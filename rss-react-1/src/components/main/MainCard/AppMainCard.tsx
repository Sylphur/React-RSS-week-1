import { PokemonResponse } from "../../../shared/interfaces";

interface CardProps {
  takenPokemon: PokemonResponse;
}

const AppMainCard = ({takenPokemon}: CardProps) => {
  return (
    <>
        <div className="main-card-wrapper">
          <img
            src={takenPokemon.sprites.front_default}
            alt="pokemon-img"
          />
          <p>Name: {takenPokemon.name}</p>
          <p>Height: {takenPokemon.height}</p>
          <p>Weight: {takenPokemon.weight}</p>
        </div>
      </>
  );
};

export default AppMainCard;
