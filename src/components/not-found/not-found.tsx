import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const/app-route';
import './styles.css';

function NotFound (): JSX.Element {
  return (
    <section className="not-found">
      <h1 className="not-found__title">Ничего не найдено!</h1>
      <Link to={AppRoute.Main} className="not-found__link">Вернуться на главную</Link>
    </section>
  );
}

export default NotFound;
