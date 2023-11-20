import { generateLink } from '../../../services/link-generation.service';
import { Link } from 'react-router-dom';

import './AppMainCard.scss';
import { useAppSelector } from '../../../state/redux-hooks';
import { useGetPokemonQuery } from '../../../services/api-query.service';

interface CardProps {
  takenPokemon: string;
}

const AppMainCard = (props: CardProps) => {
  const paginationState = useAppSelector((state) => state.pagination);
  const { data, isFetching, isError } = useGetPokemonQuery(props.takenPokemon);

  if (isFetching) return (
    <>
     <p>Loading ...</p>     
    </>
  )
  if (isError || !data) return (
    <div className='main-card-error'>
      <p>Nothing was found :/</p>
      <p>Try Pikachu, Ditto, Meowth or smth</p>
    </div>
  )
  else return (
    <>
      <Link
        to={generateLink(
          paginationState.currPage,
          paginationState.currPageSize,
          data.id
        )}
        className="main-card-link-wrapper"
      >
        <div className="main-card-wrapper">
          <img
            src={data.sprites.front_default}
            alt="pokemon-img"
          />
          <p>Name: {data.name}</p>
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
        </div>
      </Link>
    </>
  );
};

export default AppMainCard;
