import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import CategoriasPage from './pages/CategoriasPage.tsx';
import ContaPage from './pages/ContaPage.tsx';
import TransacoesPage from './pages/TransacoesPage.tsx';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <CategoriasPage />,
        },
        {
          path: 'contas',
          element: <ContaPage />,
        },
        {
          path: 'transacoes',
          element: <TransacoesPage />,
        },
      ],
    },
  ],
  {
    basename: "/Gestor-de-Despesas-/",
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);