import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import MainAbout from './MainAbout';
import { AppContext } from '../../../AppContext';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';

const searchMock = vi.fn();

test('Check that a loading indicator is displayed while fetching data;', async () => {
  render(
    <Provider store={store}>
    <BrowserRouter>
      <AppContext.Provider
        value={{
          paginationData: { currPage: 1, currPageSize: 12, totalCount: 30 },
          setPaginationData: searchMock
        }}
      >
        <MainAbout />
      </AppContext.Provider>
    </BrowserRouter>
    </Provider>
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
