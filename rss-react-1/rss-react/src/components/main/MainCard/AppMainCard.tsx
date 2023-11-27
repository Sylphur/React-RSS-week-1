import { generateLink } from '../../../services/link-generation.service';
import { useGetPokemonQuery } from '../../../services/api-query.service';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CardProps {
  takenPokemon: string;
}

const AppMainCard = (props: CardProps) => {
  const router = useRouter();
  const { limit, page, search } = router.query;
  const actualPage = page ? Number(page) : 1;
  const actualPageSize = limit ? Number(limit) : 12;
  const actualSearch = search ? search+'' : '';
  const { data, isFetching, isError } = useGetPokemonQuery(props.takenPokemon);

  if (isFetching)
    return (
      <>
        <p>Fetching ...</p>
      </>
    );
  if (isError || !data)
    return (
      <div className="main-card-error">
        <p>Nothing was found :/</p>
        <p>Try Pikachu, Ditto, Meowth or smth</p>
      </div>
    );
  else
    return (
      <>
        <Link
          href={generateLink(
            actualPage,
            actualPageSize,
            actualSearch,
            props.takenPokemon
          )
          }
          className="main-card-link-wrapper"
        >
          <div className="main-card-wrapper">
            <img src={data.sprites.front_default} alt="pokemon-img" />
            <p>Name: {data.name}</p>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
          </div>
        </Link>
      </>
    );
};

export default AppMainCard;
