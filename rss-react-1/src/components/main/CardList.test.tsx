import { BrowserRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import items from "./../../__tests__/mockedAPI.json";
import AppMainCard from './MainCard/AppMainCard';
import { PokemonResponse } from '../../shared/interfaces';
import AppMain from './AppMain';

test('Verify that the component renders the specified number of cards;', () => {
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
        )
      })}
    </BrowserRouter>,
  )
  expect(screen.getAllByRole('img').length).toBe(items.length)
})

test('Check that an appropriate message is displayed if no cards are present;', () => {
  render(
    <BrowserRouter>
      <AppMain></AppMain>
    </BrowserRouter>,
  )
  expect(screen.getByText('Nothing was found :/')).toBeInTheDocument();
})