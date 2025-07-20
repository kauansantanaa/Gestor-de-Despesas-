import React, { useState, useEffect } from 'react';
import { Conta } from '../types';
import { DADOS_CONTAS } from '../data/BD';

const ContaPage: React.FC = () => {
  const [todasAsContas, setTodasAsContas] = useState<Conta[]>(() => {
    const dadosSalvos = localStorage.getItem('dados_contas');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return DADOS_CONTAS;
  });

  const [valorNome, setValorNome] = useState('');
  const [valorSaldo, setValorSaldo] = useState(0);
  const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('dados_contas', JSON.stringify(todasAsContas));
  }, [todasAsContas]);

  const iniciarEdicao = (conta: Conta) => {
    setIdEmEdicao(conta.id);
    setValorNome(conta.nome);
    setValorSaldo(conta.saldoInicial);
  };

  const cancelarEdicao = () => {
    setIdEmEdicao(null);
    setValorNome('');
    setValorSaldo(0);
  };

  const processarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    if (valorNome.trim() === '') {
      alert('Por favor, insira o nome da conta.');
      return;
    }
    if (idEmEdicao !== null) {
      setTodasAsContas(
        todasAsContas.map(item =>
          item.id === idEmEdicao ? { ...item, nome: valorNome, saldoInicial: valorSaldo } : item
        )
      );
    } else {
      const novaConta: Conta = {
        id: Date.now(),
        nome: valorNome,
        saldoInicial: valorSaldo,
        utilizadorId: 1,
      };
      setTodasAsContas([...todasAsContas, novaConta]);
    }
    cancelarEdicao();
  };

  const removerConta = (idAlvo: number) => {
    const listaAposRemocao = todasAsContas.filter(item => item.id !== idAlvo);
    setTodasAsContas(listaAposRemocao);
  };

  return (
    <div className="card">
      <h1>Gestão de Contas</h1>
      <div className="card">
        <h2>{idEmEdicao ? 'Editar Conta' : 'Adicionar Nova Conta'}</h2>
        <form onSubmit={processarFormulario}>
          <div className="form-group">
            <label htmlFor="nome">Nome da Conta:</label>
            <input id="nome" type="text" value={valorNome} onChange={(e) => setValorNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="saldo">Saldo Inicial:</label>
            <input id="saldo" type="number" step="0.01" value={valorSaldo} onChange={(e) => setValorSaldo(parseFloat(e.target.value))} required />
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
        <h2>Contas Existentes</h2>
        <ul className="item-list">
          {todasAsContas.map(conta => (
            <li key={conta.id}>
              <span>{conta.nome} (Saldo Inicial: R$ {conta.saldoInicial.toFixed(2)})</span>
              <div>
                <button onClick={() => iniciarEdicao(conta)} className="btn btn-edit">Editar</button>
                <button onClick={() => removerConta(conta.id)} className="btn btn-danger">Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContaPage;