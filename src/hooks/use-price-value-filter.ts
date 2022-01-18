import {KeyboardEvent, RefObject, useState} from 'react';
import {checkMaxPrice, checkMinPrice, isEnterKey} from '../utils/utils';
import {PriceBounds} from '../types/store';

type InputRef = RefObject<HTMLInputElement>;
type OnPriceUpdate = () => void;
type OnPriceChange = (event: KeyboardEvent) => void;

type ReturnType = [
  priceMin: number,
  priceMax: number,
  onMinPriceUpdate: OnPriceUpdate,
  onMaxPriceUpdate: OnPriceUpdate,
  onPriceMinChange: OnPriceChange,
  onPriceMaxChange: OnPriceChange,
];

function usePriceValueFilter(
  inputMinPriceRef: InputRef,
  inputMaxPriceRef: InputRef,
  priceBounds: PriceBounds,
  priceMinSearch: number,
  priceMaxSearch: number,
): ReturnType {
  const [priceMin, setPriceMin] = useState(priceMinSearch);
  const [priceMax, setPriceMax] = useState(priceMaxSearch);

  const onMinPriceUpdate = () => {
    if (!inputMinPriceRef.current) {
      return;
    }

    const newMinPriceValue = checkMinPrice(priceBounds, Number(inputMinPriceRef.current.value), priceMax);

    inputMinPriceRef.current.value = newMinPriceValue.toString();
    setPriceMin(newMinPriceValue);
  };

  const onMaxPriceUpdate = () => {
    if (!inputMaxPriceRef.current) {
      return;
    }
    const newMaxPriceValue = checkMaxPrice(
      priceBounds,
      Number(inputMaxPriceRef.current.value),
      priceMin,
    );
    inputMaxPriceRef.current.value = newMaxPriceValue.toString();
    setPriceMax(newMaxPriceValue);
  };

  const createPriceValueHandler = (updatePriceBound: () => void) =>
    (event: KeyboardEvent) => {
      if (!isEnterKey(event)) {
        return;
      }
      updatePriceBound();
    };

  const onPriceMinChange = createPriceValueHandler(onMinPriceUpdate);
  const onPriceMaxChange = createPriceValueHandler(onMaxPriceUpdate);

  return [
    priceMin,
    priceMax,
    onMinPriceUpdate,
    onMaxPriceUpdate,
    onPriceMinChange,
    onPriceMaxChange,
  ];
}

export {
  usePriceValueFilter
};
