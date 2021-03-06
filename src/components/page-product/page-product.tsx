import {MouseEvent, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AxiosError} from 'axios';
import {browserHistory} from '../../services/browser-history';
import {AppRoute} from '../../utils/const/app-route';
import {loadComments, loadGuitar} from '../../store/api-action';
import {ThunkAppDispatch} from '../../types/actionType';
import {getComments, getGuitar} from '../../store/product-process/selectors';
import {Guitar} from '../../types/guitar';
import {formatPrice} from '../../utils/format';
import {ProductTab} from '../../utils/const/product-tabs';
import {replaceImagePath} from '../../utils/utils';
import {PageName} from '../../hooks/use-breadcrumbs';
import Loader from '../loader/loader';
import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ProductRating from '../product-rating/product-rating';
import Tabs from '../tabs/tabs';
import TabCharacteristic from '../tab-characteristic/tab-characteristic';
import TabDescription from '../tab-description/tab-description';
import Reviews from '../reviews/reviews';
import {addCartItem} from '../../store/action';
import ModalAddToCart from '../modal-add-to-cart/modal-add-to-cart';
import ModalAddCartSuccess from '../modal-add-cart-success/modal-add-cart-success';

type PageParams = {
  id: string,
};

function PageProduct(): JSX.Element {
  const {id: guitarId}: PageParams = useParams();
  const guitar: Guitar | null = useSelector(getGuitar);
  const comments = useSelector(getComments);
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isAddToCartModalShow, setIsAddToCartModalShow] = useState(false);
  const [isAddCartSuccessShow, setIsAddCartSuccessShow] = useState(false);

  const fetchComments = useCallback(
    () => (dispatch as ThunkAppDispatch)(loadComments(Number(guitarId))),
    [dispatch, guitarId],
  );

  useEffect( () => {
    const guitarIdString =  Number(guitarId);
    setIsDataLoaded(false);
    (dispatch as ThunkAppDispatch)(loadGuitar(guitarIdString))
      .then(fetchComments)
      .then(() => setIsDataLoaded(true))
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          browserHistory.push(AppRoute.NotFound);
        } else {
          throw error;
        }
      });
  }, [guitarId, dispatch, fetchComments]);

  if (!guitar) {
    return <Loader className="catalog__loader" />;
  }

  const onAddCartSuccessClose = () => setIsAddCartSuccessShow(false);
  const onAddToCartModalShow = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsAddToCartModalShow(true);
  };
  const onAddToCartModalClose = () => setIsAddToCartModalShow(false);
  const onCartItemAdd = () => {
    dispatch(addCartItem(Number(guitarId)));
    setIsAddToCartModalShow(false);
    setIsAddCartSuccessShow(true);
  };

  const onCartSuccessContinue = () => {
    browserHistory.push(AppRoute.Catalog);
  };

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
          <h1 className="page-content__title title title--bigger">??????????</h1>
          <Breadcrumbs text={name} pageName={PageName.Product} />
          <div className="product-container">
            <img
              className="product-container__img"
              src={replaceImagePath(previewImg)}
              width="90"
              height="235"
              alt={`???????????? ${name}`}
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <ProductRating rating={rating} />
              <Tabs>
                <TabCharacteristic
                  type={type}
                  stringCount={stringCount}
                  vendorCode={vendorCode}
                  label={ProductTab.Characteristics}
                />
                <TabDescription
                  description={description}
                  label={ProductTab.Description}
                />
              </Tabs>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">????????:</p>
              <p className="product-container__price-info product-container__price-info--value">
                {formatPrice(price)}
              </p>
              <a
                className="button button--red button--big product-container__button"
                href="#"
                onClick={onAddToCartModalShow}
              >
                ???????????????? ?? ??????????????
              </a>
            </div>
          </div>
          <Reviews comments={comments} guitarId={Number(guitarId)} guitarName={name} onCommentsUpdate={fetchComments} />
        </div>
        {isAddToCartModalShow && (
          <ModalAddToCart guitar={guitar} onCartItemAdd={onCartItemAdd} onClose={onAddToCartModalClose} />
        )}
        {isAddCartSuccessShow && (
          <ModalAddCartSuccess onClose={onAddCartSuccessClose} onContinueClick={onCartSuccessContinue} />
        )}
      </main>
    </MainLayout>
  );
}

export default PageProduct;
