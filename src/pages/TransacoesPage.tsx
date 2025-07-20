import React, { useState, useEffect } from 'react';
import { Transacao, Conta, Categoria } from '../types';
import { DADOS_TRANSACOES } from '../data/BD';

const TransacoesPage: React.FC = () => {
  const [listaDeTransacoes, setListaDeTransacoes] = useState<Transacao[]>(() => {
    const dadosSalvos = localStorage.getItem('dados_transacoes');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return DADOS_TRANSACOES;
  });
  
  const [listaDeContas] = useState<Conta[]>(() => {
    const dadosSalvos = localStorage.getItem('dados_contas');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [listaDeCategorias] = useState<Categoria[]>(() => {
    const dadosSalvos = localStorage.getItem('dados_categorias');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [formDescricao, setFormDescricao] = useState('');
  const [formValor, setFormValor] = useState(0);
  const [formData, setFormData] = useState(new Date().toISOString().substring(0, 10));
  const [formContaId, setFormContaId] = useState<number>(listaDeContas[0]?.id || 0);
  const [formCategoriaId, setFormCategoriaId] = useState<number>(listaDeCategorias[0]?.id || 0);

  const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('dados_transacoes', JSON.stringify(listaDeTransacoes));
  }, [listaDeTransacoes]);

  const obterNomeDaEntidade = (id: number, lista: {id: number, nome: string}[]) => {
    const item = lista.find(item => item.id === id);
    return item ? item.nome : 'Desconhecido';
  };
  
  const limparFormulario = () => {
    setIdEmEdicao(null);
    setFormDescricao('');
    setFormValor(0);
    setFormData(new Date().toISOString().substring(0, 10));
    setFormContaId(listaDeContas[0]?.id || 0);
    setFormCategoriaId(listaDeCategorias[0]?.id || 0);
  };

  const prepararEdicao = (transacao: Transacao) => {
    setIdEmEdicao(transacao.id);
    setFormDescricao(transacao.descricao);
    setFormValor(transacao.valor);
    setFormData(new Date(transacao.data).toISOString().substring(0, 10));
    setFormContaId(transacao.contaId);
    setFormCategoriaId(transacao.categoriaId);
  };

  const submeterFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    const categoriaSelecionada = listaDeCategorias.find(c => c.id === formCategoriaId);
    if (!categoriaSelecionada) return;

    const dadosDaTransacao = {
      descricao: formDescricao,
      valor: formValor,
      data: new Date(formData),
      contaId: formContaId,
      categoriaId: formCategoriaId,
      tipo: categoriaSelecionada.tipo,
    };

    if (idEmEdicao !== null) {
      setListaDeTransacoes(
        listaDeTransacoes.map(item =>
          item.id === idEmEdicao ? { ...item, ...dadosDaTransacao } : item
        )
      );
    } else {
      const novaTransacao: Transacao = {
        id: Date.now(),
        ...dadosDaTransacao,
      };
      setListaDeTransacoes([...listaDeTransacoes, novaTransacao]);
    }

    limparFormulario();
  };

  const apagarTransacao = (idAlvo: number) => {
    setListaDeTransacoes(listaDeTransacoes.filter(t => t.id !== idAlvo));
  };
  
  return (
    <div className="card">
      <h1>Gestão de Transações</h1>
      <div className="card">
        <h2>{idEmEdicao ? 'Editar Transação' : 'Adicionar Nova Transação'}</h2>
        <form onSubmit={submeterFormulario}>
          <div className="form-group">
            <label htmlFor="formDesc">Descrição:</label>
            <input id="formDesc" type="text" value={formDescricao} onChange={e => setFormDescricao(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="formValor">Valor:</label>
            <input id="formValor" type="number" step="0.01" value={formValor} onChange={e => setFormValor(parseFloat(e.target.value))} required />
          </div>
          <div className="form-group">
            <label htmlFor="formData">Data:</label>
            <input id="formData" type="date" value={formData} onChange={e => setFormData(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="formConta">Conta:</label>
            <select id="formConta" value={formContaId} onChange={e => setFormContaId(Number(e.target.value))}>
              {listaDeContas.map(conta => <option key={conta.id} value={conta.id}>{conta.nome}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="formCategoria">Categoria:</label>
            <select id="formCategoria" value={formCategoriaId} onChange={e => setFormCategoriaId(Number(e.target.value))}>
              {listaDeCategorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nome} ({cat.tipo})</option>)}
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">{idEmEdicao ? 'Salvar' : 'Adicionar'}</button>
            {idEmEdicao && <button type="button" onClick={limparFormulario} className="btn btn-secondary">Cancelar</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2>Transações Recentes</h2>
        <ul className="item-list">
          {listaDeTransacoes.map(transacao => (
            <li key={transacao.id}>
              <span>
                {new Date(transacao.data).toLocaleDateString()}: {transacao.descricao} - 
                <span style={{color: transacao.tipo === 'receita' ? '#4caf50' : '#f44336'}}> R$ {transacao.valor.toFixed(2)} </span>
                (Conta: {obterNomeDaEntidade(transacao.contaId, listaDeContas)}, 
                Categoria: {obterNomeDaEntidade(transacao.categoriaId, listaDeCategorias)})
              </span>
              <div>
                <button onClick={() => prepararEdicao(transacao)} className="btn btn-edit">Editar</button>
                <button onClick={() => apagarTransacao(transacao.id)} className="btn btn-danger">Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransacoesPage;