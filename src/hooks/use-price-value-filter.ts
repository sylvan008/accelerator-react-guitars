import {KeyboardEvent, RefObject, useState} from 'react';
import {checkMaxPrice, checkMinPrice, isEnterKey} from '../utils/utils';

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
  priceMinBound: number,
  priceMaxBound: number,
  priceMinValue: number,
  priceMaxValue: number,
): ReturnType {

  const [priceMin, setPriceMin] = useState(checkMinPrice(priceMinValue, priceMinBound, priceMaxValue));
  const [priceMax, setPriceMax] = useState(checkMaxPrice(priceMaxValue, priceMaxBound, priceMinValue));

  const onMinPriceUpdate = () => {
    if (!inputMinPriceRef.current) {
      return;
    }
    const newMinPriceValue = checkMinPrice(
      Number(inputMinPriceRef.current.value),
      priceMinBound,
      priceMax,
    );
    inputMinPriceRef.current.value = newMinPriceValue.toString();
    setPriceMin(newMinPriceValue);
  };

  const onMaxPriceUpdate = () => {
    if (!inputMaxPriceRef.current) {
      return;
    }
    const newMaxPriceValue = checkMaxPrice(
      Number(inputMaxPriceRef.current.value),
      priceMaxBound,
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
