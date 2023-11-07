import { generateLink } from '../../../services/link-generation.service';
import { PaginationData, PokemonResponse } from '../../../shared/interfaces';
import { Link } from 'react-router-dom';

import './AppMainCard.scss';

interface CardProps {
  takenPokemon: PokemonResponse;
  paginationData: PaginationData;
}

const AppMainCard = (props: CardProps) => {
  return (
    <>
      <Link
        to={generateLink(
          props.paginationData.currPage,
          props.paginationData.currPageSize,
          props.takenPokemon.id
        )}
        className="main-card-link-wrapper"
      >
        <div className="main-card-wrapper">
          <img
            src={props.takenPokemon.sprites.front_default}
            alt="pokemon-img"
          />
          <p>Name: {props.takenPokemon.name}</p>
          <p>Height: {props.takenPokemon.height}</p>
          <p>Weight: {props.takenPokemon.weight}</p>
        </div>
      </Link>
    </>
  );
};

export default AppMainCard;
