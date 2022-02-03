import {useSearch} from '../../hooks/use-search';
import SearchResultList from '../search-result-list/search-result-list';
import {useSearchParams} from '../../hooks/use-search-params';
import {SearchParam} from '../../utils/const/searchParam';
import {browserHistory} from '../../services/browser-history';
import {AppRoute} from '../../utils/const/app-route';
import {useState} from 'react';

function Search(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isInputFocus, setIsInputFocus] = useState(false);
  const nameSearch = searchParams.get(SearchParam.Name) || '';

  const submitFormCallback = (searchData: string) => {
    setSearchParams({
      [SearchParam.Name]: searchData,
    });
    browserHistory.replace({
      pathname: AppRoute.Catalog,
      search: searchParams.toString(),
    });
  };

  const [
    foundedGuitars,
    searchString,
    onSearchInputChange,
    onSearchFormSubmit,
  ] = useSearch(nameSearch, submitFormCallback);

  const createFocusHandler = (flag: boolean) => () => setIsInputFocus(flag);
  const onFocus = createFocusHandler(true);
  const onFocusLeave = createFocusHandler(false);

  const isSearching = isInputFocus && searchString.length > 0;

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
          onBlur={onFocusLeave}
          onFocus={onFocus}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {isSearching && <SearchResultList searchResult={foundedGuitars} />}
    </div>
  );
}

export default Search;
