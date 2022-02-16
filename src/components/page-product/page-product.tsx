import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loadGuitar} from '../../store/api-action';
import Loader from '../loader/loader';
import {ThunkAppDispatch} from '../../types/actionType';
import {getGuitar} from '../../store/catalog-process/selectors';
import {Guitar} from '../../types/guitar';
import {formatPrice} from '../../utils/format';
import {replaceImagePath} from '../../utils/utils';
import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ProductRating from '../product-rating/product-rating';

type PageParams = {
  id: string,
};

function PageProduct(): JSX.Element {
  const {id: guitarId}: PageParams = useParams();
  const guitar: Guitar | null = useSelector(getGuitar);
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect( () => {
    setIsDataLoaded(false);
    (dispatch as ThunkAppDispatch)(loadGuitar(Number(guitarId)))
      .then(() => setIsDataLoaded(true));
  }, [guitarId, dispatch]);

  if (!guitar) {
    return <Loader />;
  }

  const {
    description,
    name,
    rating,
    price,
    previewImg,
    stringCount,
    type,
    vendorCode,
  } = guitar;

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          {!isDataLoaded && <Loader className="catalog__loader" />}
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <Breadcrumbs />
          <div className="product-container">
            <img
              className="product-container__img"
              src={replaceImagePath(previewImg)}
              width="90"
              height="235"
              alt={`гитара ${name}`}
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <ProductRating rating={rating} />
              <div className="tabs">
                <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
                <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{type}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{stringCount}</td>
                    </tr>
                  </table>
                  <p className="tabs__product-description hidden">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">
                {formatPrice(price)}
              </p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true">
                <span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="rate__count" />
                <span className="rate__message" />
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
                ремня.
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true">
                <span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="rate__count" />
                <span className="rate__message" />
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская Ксения</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true">
                <span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="rate__count" />
                <span className="rate__message" />
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
                ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный
                цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево.
                Тяжелая, в компдлекте неть чехла и ремня.
              </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}

export default PageProduct;
