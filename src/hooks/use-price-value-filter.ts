import {KeyboardEvent, RefObject, useState} from 'react';
import {useSelector} from 'react-redux';
import {getPriceBounds} from '../store/catalog-process/selectors';
import {checkMaxPrice, checkMinPrice, isEnterKey} from '../utils/utils';

type InputRef = RefObject<HTMLInputElement>;
type OnPriceUpdate = () => void;
type OnPriceChange = (event: KeyboardEvent) => void;

type ReturnType = [
  priceMinBound: number,
  priceMaxBound: number,
  onMinPriceUpdate: OnPriceUpdate,
  onMaxPriceUpdate: OnPriceUpdate,
  onPriceMinChange: OnPriceChange,
  onPriceMaxChange: OnPriceChange,
];

function usePriceValueFilter(inputMinPriceRef: InputRef, inputMaxPriceRef: InputRef): ReturnType {
  const [priceMinBound, priceMaxBound] = useSelector(getPriceBounds);
  const [priceMin, setPriceMin] = useState(priceMinBound);
  const [priceMax, setPriceMax] = useState(priceMaxBound);

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
    priceMinBound,
    priceMaxBound,
    onMinPriceUpdate,
    onMaxPriceUpdate,
    onPriceMinChange,
    onPriceMaxChange,
  ];
}

export {
  usePriceValueFilter
};
