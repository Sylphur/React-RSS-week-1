import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppMainCard from './MainCard/AppMainCard';
import { PokemonUrl } from '../../shared/interfaces';
import AppMain from './AppMain';
import { AppContext } from '../../AppContext';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

test('Verify that the component renders the specified number of cards;', async () => {
  const mockedResponse: PokemonUrl[] = [{name: 'bulbasaur', url: '123'}, {name: 'ivysaur', url: '123'}]
  render(
    <Provider store={store}>
    <BrowserRouter>
      {mockedResponse.map((item: PokemonUrl) => {
        return (
          <li key={item.name}>
            <AppMainCard
              takenPokemon={item.name}
            ></AppMainCard>
          </li>
        );
      })}
    </BrowserRouter>
    </Provider>
  );
  await waitFor(() => expect(screen.getAllByRole('img').length).toBe(2))
});

test('Check that an appropriate message is displayed if no cards are present;', async () => {
  const mockedResponse = 's';
  render(
    <Provider store={store}>
    <BrowserRouter>
            <AppMainCard
              takenPokemon={mockedResponse}
            ></AppMainCard>
    </BrowserRouter>
    </Provider>
  );
  await waitFor(() => expect(screen.getByText('Loading ...')).toBeInTheDocument());
});

test('Check that main page renders correctly', () => {
  render(
    <Provider store={store}>
    <BrowserRouter>
      <AppContext.Provider
        value={{
          paginationData: { currPage: 2, currPageSize: 15, totalCount: 31 },
          setPaginationData: () => {},
        }}
      >
        <AppMain></AppMain>
      </AppContext.Provider>
    </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('Loading ...')).toBeInTheDocument();
});
