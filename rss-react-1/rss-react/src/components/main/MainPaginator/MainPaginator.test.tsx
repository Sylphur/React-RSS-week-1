import { expect, test } from 'vitest';
import MainPaginator from './MainPaginator';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

test('Update parameters when page changes', async () => {
  render(
    <Provider store={store}>
      <MemoryRouterProvider>
        <MainPaginator />
      </MemoryRouterProvider>
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
