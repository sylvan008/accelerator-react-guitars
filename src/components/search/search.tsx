import {useEffect, useRef, useState} from 'react';
import {useSearch} from '../../hooks/use-search';
import {useSearchParams} from '../../hooks/use-search-params';
import {SearchParam} from '../../utils/const/searchParam';
import {browserHistory} from '../../services/browser-history';
import {AppRoute} from '../../utils/const/app-route';
import SearchResultList from '../search-result-list/search-result-list';

function Search(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isInputFocus, setIsInputFocus] = useState(false);
  const nameSearch = searchParams.get(SearchParam.Name) || '';
  const searchRef = useRef<HTMLDivElement>(null);

  const submitFormCallback = (searchData: string) => {
    setSearchParams({
      [SearchParam.Name]: searchData,
    });
    browserHistory.replace({
      pathname: AppRoute.Catalog,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    const onCloseResult = (event: MouseEvent) => {
      if (!searchRef.current) {
        return;
      }
      const target = event.target as HTMLElement;
      const isInner = searchRef.current.contains(target);

      if (!isInner) {
        setIsInputFocus(false);
        document.body.removeEventListener('click', onCloseResult);
      }
    };

    if (isInputFocus) {
      document.body.addEventListener('click', onCloseResult);
    }

    return () => {
      document.body.removeEventListener('click', onCloseResult);
    };
  }, [isInputFocus]);

  const [
    foundedGuitars,
    searchString,
    onSearchInputChange,
    onSearchFormSubmit,
  ] = useSearch(nameSearch, submitFormCallback);

  const createFocusHandler = (flag: boolean) => () => setIsInputFocus(flag);
  const onFocus = createFocusHandler(true);

  const onResultClick = () => {
    setIsInputFocus(false);
  };

  const isSearching = isInputFocus && searchString.length > 0;

  return (
    <div className="form-search" ref={searchRef}>
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
          onFocus={onFocus}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {isSearching && <SearchResultList searchResult={foundedGuitars} onResultClick={onResultClick} />}
    </div>
  );
}

export default Search;
