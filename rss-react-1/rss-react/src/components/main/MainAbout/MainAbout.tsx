import AppLoader from '../../loader/AppLoader';
import { useEffect } from 'react';
import { useActions } from '../../../state/redux-hooks';
import { useGetPokemonQuery } from '../../../services/api-query.service';
import { useRouter } from 'next/router';

const MainAbout = () => {
  const router = useRouter();
  const { id, limit, page, search } = router.query;

  const { setIsDetailsPageLoading } = useActions();
  const { data, isFetching } = useGetPokemonQuery(id + '');

  const returnToSearch = async () => {
    await router.push({
      query: { limit: limit, page: page, search: search },
    });
  };
  useEffect(() => {
    const init = async () => {
      setIsDetailsPageLoading(isFetching);
    };
    init();
  }, [isFetching, setIsDetailsPageLoading]);

  return (
    <section className="about-wrapper">
      <div className="about-background" onClick={returnToSearch}></div>
      <div className="about-content">
        <div className="about-loader">
          <AppLoader isLoading={isFetching}></AppLoader>
        </div>
        <h2>{data?.name.toUpperCase()}</h2>
        <div className="about-img-wrapper">
          <img src={data?.sprites.front_default} alt="poke-img-front" />
          <img src={data?.sprites.back_default} alt="poke-img-back" />
        </div>
        <p>Height: {data?.height}</p>
        <p>Weight: {data?.weight}</p>
        <div className="about-abilities-wrapper">
          <h4 className="about-abilities">Abilities:</h4>
          {data?.abilities.map((ability) => (
            <p key={ability.ability.name}>{ability.ability.name}</p>
          ))}
        </div>

        <button className="about-close-btn" onClick={returnToSearch}>
          X
        </button>
      </div>
    </section>
  );
};

export default MainAbout;
