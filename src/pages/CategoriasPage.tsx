import React, { useState, useEffect } from 'react';
import { Categoria } from '../types';
import { DADOS_CATEGORIAS } from '../data/BD';

const CategoriasPage: React.FC = () => {
  const [todasAsCategorias, setTodasAsCategorias] = useState<Categoria[]>(() => {
    const dadosSalvos = localStorage.getItem('dados_categorias');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return DADOS_CATEGORIAS;
  });

  const [valorNome, setValorNome] = useState('');
  const [valorTipo, setValorTipo] = useState<'receita' | 'despesa'>('despesa');
  const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('dados_categorias', JSON.stringify(todasAsCategorias));
  }, [todasAsCategorias]);

  const iniciarEdicao = (categoria: Categoria) => {
    setIdEmEdicao(categoria.id);
    setValorNome(categoria.nome);
    setValorTipo(categoria.tipo);
  };

  const cancelarEdicao = () => {
    setIdEmEdicao(null);
    setValorNome('');
    setValorTipo('despesa');
  };

  const processarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    if (valorNome.trim() === '') {
      alert('Por favor, insira o nome da categoria.');
      return;
    }
    if (idEmEdicao !== null) {
      setTodasAsCategorias(
        todasAsCategorias.map(item =>
          item.id === idEmEdicao ? { ...item, nome: valorNome, tipo: valorTipo } : item
        )
      );
    } else {
      const novaCat: Categoria = {
        id: Date.now(),
        nome: valorNome,
        tipo: valorTipo,
      };
      setTodasAsCategorias([...todasAsCategorias, novaCat]);
    }
    cancelarEdicao();
  };

  const removerCategoria = (idAlvo: number) => {
    const listaAposRemocao = todasAsCategorias.filter(item => item.id !== idAlvo);
    setTodasAsCategorias(listaAposRemocao);
  };

  return (
    <div className="card">
      <h1>Gestão de Categorias</h1>
      <div className="card">
        <h2>{idEmEdicao ? 'Editar Categoria' : 'Adicionar Nova Categoria'}</h2>
        <form onSubmit={processarFormulario}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input id="nome" type="text" value={valorNome} onChange={(e) => setValorNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <select id="tipo" value={valorTipo} onChange={(e) => setValorTipo(e.target.value as 'receita' | 'despesa')}>
              <option value="despesa">Despesa</option>
              <option value="receita">Receita</option>
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              {idEmEdicao ? 'Salvar Alterações' : 'Adicionar'}
            </button>
            {idEmEdicao && (
              <button type="button" onClick={cancelarEdicao} className="btn btn-secondary">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="card">
        <h2>Categorias Existentes</h2>
        <ul className="item-list">
          {todasAsCategorias.map(categoria => (
            <li key={categoria.id}>
              <span>{categoria.nome} ({categoria.tipo})</span>
              <div>
                <button onClick={() => iniciarEdicao(categoria)} className="btn btn-edit">Editar</button>
                <button onClick={() => removerCategoria(categoria.id)} className="btn btn-danger">Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriasPage;