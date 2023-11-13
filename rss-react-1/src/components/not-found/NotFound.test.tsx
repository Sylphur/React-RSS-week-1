import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import App from '../../App';
import NotFoundPage from './NotFoundPage';
import MainAbout from '../main/MainAbout/MainAbout';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

test('Ensuring that the 404 page is displayed when navigating to an invalid route', () => {
  const badRoute = '/badRequest';
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
  const router = createMemoryRouter(routes, {
    initialEntries: [badRoute],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);
  expect(screen.getByText('404: Not Found')).toBeInTheDocument();
})