import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import MainAbout from './MainAbout';
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

test('Check that a loading indicator is displayed while fetching data;', async () => {
  render(
    <Provider store={store}>
    <MemoryRouterProvider>
        <MainAbout />
    </MemoryRouterProvider>
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
