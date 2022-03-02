import {Locale} from './const/locale';

const CURRENCY_RUBLE = 'RUB';

const currencyFormat = new Intl.NumberFormat(Locale.RU, {
  currency: CURRENCY_RUBLE,
  currencyDisplay: 'symbol',
  minimumFractionDigits: 0,
  style: 'currency',
});

const dateMothFormat = new Intl.DateTimeFormat(Locale.RU, {
  day: '2-digit',
  month: 'long',
});

/**
 * Форматирует число в виде цены для рублёвой зоны
 */
function formatPrice(value: number): string {
  return currencyFormat.format(value);
}

function formatDateMonth(date: Date): string {
  return dateMothFormat.format(date);
}

export {
  formatPrice,
  formatDateMonth
};
