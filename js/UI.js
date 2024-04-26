import Helper from './Helper.js';
import TransactionsAPI from './TransactionsAPI.js';
export default class UI {
  static init_view() {
    document.querySelector('.content').innerHTML = this.drawBasic();
    this.init_listeners();
  }
  static init_listeners() {
    document.querySelector('#btn-refresh').addEventListener('click', () => {
      TransactionsAPI.getAllTransactions();
    });
    TransactionsAPI.input_search = document.querySelector('.input_search');
    TransactionsAPI.input_search.addEventListener('input', () => {
      TransactionsAPI.getTransactions();
    });
    document.querySelectorAll('.sort-data').forEach((sort_data) => {
      sort_data.addEventListener('click', (e) => {
        TransactionsAPI.init_sort_value(e.target.dataset.sortfield);
        TransactionsAPI.getTransactions();
        e.target.getElementsByTagName('i')[0].style.transform = `rotate(${Helper.getRotateDeg()}deg)`;
      });
    });
  }

  static drawBasic() {
    return `<section class="container">
        <div class="header">
          <h2>لیست تراکنش ها </h2>
          <div class="container_search">
            <input type="text" class="input_search" placeholder="جستجو شماره پیگیری تراکنش ..." />
            <button><i class="fa fa-search" aria-hidden="true"></i></button>
          </div>
        </div>
      </section>
      <section class="container">
        <div class="card">
          <h2 class="mb-2 text-secondary">لیست تراکنش های شما <span class="text-primary"><i class="fa fa-refresh"  id="btn-refresh"></i></span></h2>
          <table class="table">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نوع تراکنش</th>
                <th class="sort-data" data-sortfield="price">مبلغ <i class="fa fa-caret-up text-primary disable_click"></i></th>
                <th>شماره پیگیری</th>
                <th class="sort-data sorted"  data-sortfield="date">تاریخ تراکنش <i class="fa fa-caret-up text-primary disable_click"></i>
                </th>
              </tr>
            </thead>
            <tbody id="transactions">
              
            </tbody>
          </table>
        </div>
      </section>`;
  }
  static renderTransactions(transactions) {
    const tbody = document.getElementById('transactions');
    tbody.innerHTML = '';
    transactions.forEach((transaction) => {
      tbody.innerHTML += this.drawTransaction(transaction);
    });
  }
  static drawTransaction(transaction) {
    return `<tr>
                <td>${transaction.id}</td>
                <td class="${transaction.type == 'افزایش اعتبار' ? 'text-success' : 'text-danger'}">
                ${transaction.type}</td>
                <td>${Helper.numberWithCommas(transaction.price)}</td>
                <td>${transaction.refId}</td>
                <td> ${Helper.date_to_custom(transaction.date)}</td>
              </tr>`;
  }
}
