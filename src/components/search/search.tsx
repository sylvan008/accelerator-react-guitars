import {useSearch} from '../../hooks/use-search';
import SearchResultList from '../search-result-list/search-result-list';

function Search(): JSX.Element {
  const [
    foundedGuitars,
    searchString,
    onSearchInputChange,
    onSearchFormSubmit,
  ] = useSearch();

  const isSearching = searchString.length !== 0;

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
      {isSearching && <SearchResultList searchResult={foundedGuitars} />}
    </div>
  );
}

export default Search;
