import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import MainAbout from './MainAbout';
import items from './../../../__tests__/mockedAPI.json';
import { AppContext } from '../../../AppContext';

const setIsLoadingMock = vi.fn();
const searchMock = vi.fn();

test('Check that a loading indicator is displayed while fetching data;', async () => {
  render(
    <BrowserRouter>
      <AppContext.Provider
        value={{
          takenPokemon: items,
          setTakenPokemon: () => {},
          isLoading: true,
          setIsLoading: setIsLoadingMock,
          paginationData: { currPage: 1, currPageSize: 12, totalCount: 30 },
          setPaginationData: () => {},
          search: searchMock,
        }}
      >
        <MainAbout />
      </AppContext.Provider>
    </BrowserRouter>
  );
  expect(
    screen.getByText<HTMLParagraphElement>('Loading ...')
  ).toBeInTheDocument();
  const closeBtn = screen.getByText<HTMLButtonElement>('X');
  expect(closeBtn).toBeInTheDocument();
  fireEvent.click(closeBtn);
  await waitFor(() => {
    expect(closeBtn).toBeInTheDocument();
  });
});
