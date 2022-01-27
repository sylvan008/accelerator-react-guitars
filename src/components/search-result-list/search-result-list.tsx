import {Guitar} from '../../types/guitar';
import './search-result-list.style.css';

type PropsType = {
  searchResult: Guitar[],
}

function SearchResultList(props: PropsType): JSX.Element {
  const {searchResult} = props;

  return (
    <ul className="form-search__select-list">
      {searchResult.map((item) => (
        <li className="form-search__select-item" tabIndex={0} key={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default SearchResultList;
