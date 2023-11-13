import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';
import NotFoundPage from './components/not-found/NotFoundPage';
import MainAbout from './components/main/MainAbout/MainAbout';

test('Ensuring that the router works correctly', () => {
  const baseRoute = '/';
  const routes = [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/search/:id',
          element: <MainAbout />,
          errorElement: <NotFoundPage />
        },
      ],
    },
  ];

  const baseRouter = createMemoryRouter(routes, {
    initialEntries: [baseRoute],
    initialIndex: 1,
  });
  render(<RouterProvider router={baseRouter} />);
  expect(screen.getByText('Search')).toBeInTheDocument();
  
})

test('Verify that typing error renders the error boundary', async () => {
  render(
    <BrowserRouter>
      <App></App>
  </BrowserRouter>
  );

  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'Pikachu' } });

  const searchButton = screen.getByText('Search');
    act(() => {
      fireEvent.click(searchButton);
      expect !(screen.getByText<HTMLParagraphElement>('Loading ...')).toBeInTheDocument();
    });
});