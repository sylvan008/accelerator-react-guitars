import {Locales} from './const/locales';

const CURRENCY_RUBLE = 'RUB';

const currencyFormat = new Intl.NumberFormat(Locales.RU, {
  currency: CURRENCY_RUBLE,
  currencyDisplay: 'symbol',
  minimumFractionDigits: 0,
  style: 'currency',
});

/**
 * Форматирует число в виде цены для рублёвой зоны
 */
function formatPrice(value: number): string {
  return currencyFormat.format(value);
}

export {
  formatPrice
};
