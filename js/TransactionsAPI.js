import UI from './UI.js';
export default class TransactionsAPI {
  static sorter = { field: 'id', order: 'ASC' };
  static input_search = '';
  static getTransactions() {
    this.getTransactionsRequest(
      `http://localhost:3000/transactions?refId_like=${this.input_search.value}&_sort=${this.sorter.field}&_order=${this.sorter.order}`
    );
  }

  static getAllTransactions() {
    this.input_search.value = '';
    this.getTransactionsRequest(`http://localhost:3000/transactions`);
  }
  static getTransactionsRequest(URL) {
    axios
      .get(URL)
      .then(({ data }) => {
        UI.renderTransactions(data);
      })
      .catch((err) => {
        alert('خطا در اتصال به سرور');
        console.log(err);
      });
  }
  static init_sort_value(sortfield) {
    if (this.sorter.field === sortfield) {
      if (this.sorter.order == 'desc') {
        this.sorter.order = 'ASC';
      } else {
        this.sorter.order = 'desc';
      }
    } else {
      this.sorter.field = sortfield;
    }
  }
}
