import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import items from './../../../__tests__/mockedAPI.json';
import AppMainCard from './AppMainCard';
import { PokemonResponse } from '../../../shared/interfaces';
import { generateLink } from '../../../services/link-generation.service';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

test('Ensure that the card component renders the relevant card data;', async () => {
  const mockedResponse: PokemonResponse[] = items;
  render(
    <Provider store={store}>
    <MemoryRouterProvider>
      {mockedResponse.map((item: PokemonResponse) => {
        return (
          <li key={item.name}>
            <AppMainCard
              takenPokemon={item.name}
            ></AppMainCard>
          </li>
        );
      })}
    </MemoryRouterProvider>
    </Provider>
  );
  await waitFor (() => {
    for (const { name } of items) {
      expect(
        screen.getByText<HTMLParagraphElement>(`Name: ${name}`)
      ).toBeInTheDocument();
    }
  })
});

test('Validate that clicking on a card opens a detailed card component', async () => {
  const paginationData = {
    currPage: 1,
    currPageSize: 12,
    totalCount: 30,
  };
  const mockedResponse: PokemonResponse[] = items;
  render(
    <Provider store={store}>
    <MemoryRouterProvider>
      <AppMainCard
        takenPokemon={mockedResponse[0].name}
      ></AppMainCard>
    </MemoryRouterProvider>
    </Provider>
  );
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute(
    'href',
    generateLink(
      paginationData.currPage,
      paginationData.currPageSize,
      '',
      mockedResponse[0].name + '',
    )
  );
});
