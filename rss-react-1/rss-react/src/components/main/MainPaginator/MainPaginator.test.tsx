import { expect, test } from 'vitest';
import MainPaginator from './MainPaginator';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from '../../../AppContext';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';

test('Update parameters when page changes', async () => {
  render(
    <Provider store={store}>
    <BrowserRouter>
      <AppContextProvider>
        <MainPaginator />
      </AppContextProvider>
    </BrowserRouter>
    </Provider>
  );

  fireEvent.click(screen.getByText<HTMLButtonElement>('>'));
  await waitFor(() => {
    expect(screen.getByText<HTMLLIElement>('2')).toBeInTheDocument();
    fireEvent.click(screen.getByText<HTMLButtonElement>('<'));
  });
  await waitFor(() => {
    expect(screen.getByText<HTMLLIElement>('1')).toBeInTheDocument();
  });
});
