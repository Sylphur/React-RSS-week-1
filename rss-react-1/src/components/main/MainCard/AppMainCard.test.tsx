import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import items from './../../../__tests__/mockedAPI.json';
import AppMainCard from './AppMainCard';
import { PokemonResponse } from '../../../shared/interfaces';
import { generateLink } from '../../../services/link-generation.service';

test('Ensure that the card component renders the relevant card data;', () => {
  const paginationData = {
    currPage: 1,
    currPageSize: 12,
    totalCount: 30,
  };
  const mockedResponse: PokemonResponse[] = items;
  render(
    <BrowserRouter>
      {mockedResponse.map((item: PokemonResponse) => {
        return (
          <li key={item.name}>
            <AppMainCard
              takenPokemon={item}
              paginationData={paginationData}
            ></AppMainCard>
          </li>
        );
      })}
    </BrowserRouter>
  );
  for (const { name } of items) {
    expect(
      screen.getByText<HTMLParagraphElement>(`Name: ${name}`)
    ).toBeInTheDocument();
  }
});

test('Validate that clicking on a card opens a detailed card component', async () => {
  const paginationData = {
    currPage: 1,
    currPageSize: 12,
    totalCount: 30,
  };
  const mockedResponse: PokemonResponse[] = items;
  render(
    <BrowserRouter>
      <AppMainCard
        takenPokemon={mockedResponse[0]}
        paginationData={paginationData}
      ></AppMainCard>
    </BrowserRouter>
  );
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute(
    'href',
    generateLink(
      paginationData.currPage,
      paginationData.currPageSize,
      mockedResponse[0].id
    )
  );
});
