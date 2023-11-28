import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppMainCard from './MainCard/AppMainCard';
import { PokemonUrl } from '../../shared/interfaces';
import AppMain from './AppMain';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '@/__tests__/utils/createMockRouter';

test('Verify that the component renders the specified number of cards;', async () => {
  const mockedResponse: PokemonUrl[] = [{name: 'bulbasaur', url: '123'}, {name: 'ivysaur', url: '123'}]
  render(
    <RouterContext.Provider value={createMockRouter({query: {page: "1", limit: "12"}})}>
      <Provider store={store}>
      {mockedResponse.map((item: PokemonUrl) => {
        return (
          <li key={item.name}>
            <AppMainCard
              takenPokemon={item.name}
            ></AppMainCard>
          </li>
        );
      })}
      </Provider>
    </RouterContext.Provider>
  );
  await waitFor(() => expect(screen.getAllByRole('img').length).toBe(2))
});

test('Check that an appropriate message is displayed if no cards are present;', async () => {
  const mockedResponse = 's';
  render(
    <Provider store={store}>
    <RouterContext.Provider value={createMockRouter({query: {page: "1", limit: "12"}})}>
      <AppMainCard
        takenPokemon={mockedResponse}
      ></AppMainCard>
    </RouterContext.Provider>
    </Provider>
  );
  await waitFor(() => expect(screen.getByText('Nothing was found :/')).toBeInTheDocument());
});

test('Check that main page renders correctly', () => {
  render(
    <Provider store={store}>
    <RouterContext.Provider value={createMockRouter({query: {page: "1", limit: "12"}})}>
      
        <AppMain></AppMain>
      
    </RouterContext.Provider>
    </Provider>
  );
  expect(screen.getByText('Loading ...')).toBeInTheDocument();
});
