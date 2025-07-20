import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <NavLink to="/">Categorias</NavLink>
        <NavLink to="/contas">Contas</NavLink>
        <NavLink to="/transacoes">Transações</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;