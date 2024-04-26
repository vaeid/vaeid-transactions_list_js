import TransactionsAPI from './TransactionsAPI.js';
import UI from './UI.js';

document.querySelector('#btn-show-transactions').addEventListener('click', () => {
  UI.init_view();
  TransactionsAPI.getAllTransactions();
});
