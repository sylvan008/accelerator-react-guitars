import {Link} from 'react-router-dom';
import {PageName, useBreadcrumbs} from '../../hooks/use-breadcrumbs';

type PropsType = {
  pageName: PageName,
  text?: string,
};

function Breadcrumbs(props: PropsType): JSX.Element {
  const {pageName, text} = props;
  const breadcrumbs = useBreadcrumbs(pageName, text);
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {breadcrumbs.map(({to, text: linkText}) => (
        <li key={to} className="breadcrumbs__item">
          <Link className="link" to={to}>{linkText}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;
