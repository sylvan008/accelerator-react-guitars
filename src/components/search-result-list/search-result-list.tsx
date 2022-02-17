import {Link} from 'react-router-dom';
import {Guitar} from '../../types/guitar';
import {AppRoute, RouteParam} from '../../utils/const/app-route';
import {replaceRouteParam} from '../../utils/utils';
import './search-result-list.style.css';

type PropsType = {
  searchResult: Guitar[],
  onResultClick: () => void,
}

function SearchResultList(props: PropsType): JSX.Element {
  const {searchResult, onResultClick} = props;

  return (
    <ul className="form-search__select-list">
      {searchResult.map((item) => (
        <li className="form-search__select-item" key={item.id}>
          <Link
            to={replaceRouteParam(AppRoute.ProductPage, RouteParam.Id, item.id.toString())}
            className="form-search__link"
            onClick={onResultClick}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SearchResultList;
