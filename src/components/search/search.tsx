import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState
} from 'react';
import {useSelector} from 'react-redux';
import {getGuitars} from '../../store/catalog-process/selectors';
import {Guitar} from '../../types/guitar';
import {findGuitars} from '../../utils/utils';
import SearchResultList from '../search-result-list/search-result-list';

function Search(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const [searchString, setSearchString] = useState('');
  const [foundedGuitars, setFoundedGuitars] = useState<Guitar[]>([]);

  const onSearchInputChange = (evt: ChangeEvent<HTMLInputElement>) => setSearchString(evt.target.value);
  const onSearchFormSubmit = (evt: FormEvent) => evt.preventDefault();

  useEffect(() => {
    setFoundedGuitars(findGuitars(guitars, searchString));
  }, [searchString, guitars]);

  return (
    <div className="form-search">
      <form
        className="form-search__form"
        onSubmit={onSearchFormSubmit}
      >
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search" />
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={searchString}
          onChange={onSearchInputChange}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {searchString.length !== 0 && <SearchResultList searchResult={foundedGuitars} />}
    </div>
  );
}

export default Search;
