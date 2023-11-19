import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MainAbout from './components/main/MainAbout/MainAbout.tsx';
import NotFoundPage from './components/not-found/NotFoundPage.tsx';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/search/:id',
        element: <MainAbout />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);