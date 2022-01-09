import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getGuitars} from '../store/catalog-process/selectors';
import {Guitar} from '../types/guitar';
import {findGuitars} from '../utils/utils';

type ReturnType = [
  foundedGuitars: Guitar[],
  searchString: string,
  onSearchInputChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onSearchFormSubmit: (evt: FormEvent) => void,
];

function useSearch(nameSearch: string, submitCallback?: (searchData: string) => void): ReturnType {
  const guitars = useSelector(getGuitars);
  const [searchString, setSearchString] = useState(nameSearch);
  const [foundedGuitars, setFoundedGuitars] = useState<Guitar[]>([]);

  const onSearchInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value);
  };
  const onSearchFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (typeof submitCallback === 'function') {
      submitCallback(searchString);
    }
    setSearchString('');
  };


  useEffect(() => {
    setFoundedGuitars(findGuitars(guitars, searchString));
  }, [searchString, guitars]);

  return [
    foundedGuitars,
    searchString,
    onSearchInputChange,
    onSearchFormSubmit,
  ];
}

export {
  useSearch
};
