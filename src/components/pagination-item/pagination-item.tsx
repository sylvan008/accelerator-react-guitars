import {Link} from 'react-router-dom';
import {replaceRouteParam} from '../../utils/utils';
import {AppRoute, RouteParam} from '../../utils/const/app-route';
import {browserHistory} from '../../services/browser-history';

const ACTIVE_CLASS = 'pagination__page--active';

type PropsType = {
  className?: string
  id?: string,
  isActive?: boolean,
  linkText: string,
  pageNumber: number,
};

function PaginationItem(props: PropsType): JSX.Element {
  const {
    className = '',
    isActive = false,
    linkText,
    pageNumber,
    ...rest
  } = props;

  const {search} = browserHistory.location;

  const optionalProps = {
    id: rest.id,
  };

  const classNames = ['pagination__page', className, isActive ? ACTIVE_CLASS : '']
    .join(' ')
    .trim();

  const route = replaceRouteParam(AppRoute.CatalogPage, RouteParam.PageNumber, pageNumber.toString());

  return (
    <li className={classNames} {...optionalProps}>
      <Link
        className="link pagination__page-link"
        to={`${route}${search.toString()}`}
      >
        {linkText}
      </Link>
    </li>
  );
}

export default PaginationItem;
