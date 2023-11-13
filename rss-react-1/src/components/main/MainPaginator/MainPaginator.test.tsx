import { expect, test } from 'vitest';
import MainPaginator from './MainPaginator';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from '../../../AppContext';

test('Update parameters when page changes', async () => {
  render(
    <BrowserRouter>
      <AppContextProvider>
        <MainPaginator />
      </AppContextProvider>
    </BrowserRouter>
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
