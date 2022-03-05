import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const/app-route';

type PropsType = {
  className?: string,
};

function Logo(props: PropsType): JSX.Element {
  const {className} = props;
  const classes = ['logo', className ? className : ''].join(' ').trim();
  return (
    <Link className={classes} to={AppRoute.Main}>
      <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
    </Link>
  );
}

export default Logo;
