import TransactionsAPI from './TransactionsAPI.js';

export default class Helper {
  static numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  static date_to_custom(date) {
    return (
      new Date(date).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
      ' ساعت ' +
      new Date(date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    );
  }
  static getRotateDeg() {
    if (TransactionsAPI.sorter.order == 'desc') {
      return 180;
    } else {
      return 0;
    }
  }
}
