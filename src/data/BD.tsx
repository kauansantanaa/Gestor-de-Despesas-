import { Categoria, Conta, Transacao } from '../types';

export const DADOS_CATEGORIAS: Categoria[] = [
  { id: 1, nome: 'Salário', tipo: 'receita' },
  { id: 2, nome: 'Alimentação', tipo: 'despesa' },
  { id: 3, nome: 'Transporte', tipo: 'despesa' },
  { id: 4, nome: 'Lazer', tipo: 'despesa' },
];

export const DADOS_CONTAS: Conta[] = [
  { id: 1, nome: 'Carteira', saldoInicial: 50.0, utilizadorId: 1 },
  { id: 2, nome: 'Banco Principal', saldoInicial: 2500.0, utilizadorId: 1 },
];

export const DADOS_TRANSACOES: Transacao[] = [
    { id: 1, descricao: 'Salário Mensal', valor: 5000, data: new Date('2025-07-05'), tipo: 'receita', contaId: 2, categoriaId: 1 },
    { id: 2, descricao: 'Supermercado', valor: 450, data: new Date('2025-07-10'), tipo: 'despesa', contaId: 2, categoriaId: 2 },
    { id: 3, descricao: 'Bilhete de autocarro', valor: 4.5, data: new Date('2025-07-11'), tipo: 'despesa', contaId: 1, categoriaId: 3 },
];