import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import './MainAbout.scss';
import AppLoader from '../../loader/AppLoader';
import { useEffect, useState } from 'react';
import { searchPokemon } from '../../../services/api.service';
import { PokemonResponse } from '../../../shared/interfaces';
import { generateLink } from '../../../services/link-generation.service';

const MainAbout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [takenPokemon, setTakenPokemon] = useState<PokemonResponse>();

  const search = () => {
    setIsLoading(true);
    const param = id + '';
    searchPokemon(param)
      .then((res) => res.json())
      .then(
        (result: PokemonResponse) => {
          setTakenPokemon(result);
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        }
      );
  };
  const returnToSearch = () => {
    const page = searchParams.get('page') || 1;
    const pageSize = searchParams.get('pageSize') || 12;

    navigate(generateLink(+page, +pageSize));
  };
  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="about-wrapper">
      <div className="about-background" onClick={returnToSearch}></div>
      <div className="about-content">
        <div className="about-loader">
          <AppLoader isLoading={isLoading}></AppLoader>
        </div>
        <h2>{takenPokemon?.name.toUpperCase()}</h2>
        <div className="about-img-wrapper">
          <img src={takenPokemon?.sprites.front_default} alt="poke-img-front" />
          <img src={takenPokemon?.sprites.back_default} alt="poke-img-back" />
        </div>
        <p>Height: {takenPokemon?.height}</p>
        <p>Weight: {takenPokemon?.weight}</p>
        <h4 className="about-abilities">Abilities:</h4>
        {takenPokemon?.abilities.map((ability) => (
          <p key={ability.ability.name}>{ability.ability.name}</p>
        ))}
        <button className="about-close-btn" onClick={returnToSearch}>
          X
        </button>
      </div>
    </section>
  );
};

export default MainAbout;
