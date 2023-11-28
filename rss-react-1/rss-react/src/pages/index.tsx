import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { storeWrapper } from '@/state/store';
import {
  getRunningQueriesThunk,
  pokemonAPI,
} from '@/services/api-query.service';
import { PokemonState } from '@/state/reducers/pokemonSlice';
import AppMain from '@/components/main/AppMain';
import { searchActions } from '@/state/reducers/searchSlice';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps<{
  data: { cards: PokemonState };
}> = storeWrapper.getServerSideProps((store) => async (context) => {
  const { limit, search, page } = context.query;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 12;
  const limitNumber2 = search ? 1 : limitNumber;
  const currentOffset = limitNumber * (pageNumber - 1);
  const searchString = search?.toString() || '';

  store.dispatch(
    pokemonAPI.endpoints.getAllPokemonList.initiate({
      limit: limitNumber2,
      offset: currentOffset,
    })
  );
  store.dispatch(searchActions.setSearch(searchString));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {
      data: {
        cards: store.getState().pokemon,
      },
    },
  };
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppMain></AppMain>
      </main>
    </>
  );
}
