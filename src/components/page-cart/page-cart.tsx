import {ChangeEvent, FormEvent, useState} from 'react';
import {AxiosError} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {getIsCatalogLoad} from '../../store/catalog-process/selectors';
import {getAppliedCoupon, getDiscount, getGuitarsFromCart, getItemCount} from '../../store/cart-process/selectors';
import {formatPrice} from '../../utils/format';
import {MessageType} from '../../utils/const/message';
import {CouponMessage} from '../../utils/const/cart';
import {postCoupon} from '../../store/api-action';
import {ThunkAppDispatch} from '../../types/actionType';
import {addAppliedCoupon, addDiscount, removeCartItemAll} from '../../store/action';
import CartItem from '../cart-item/cart-item';
import MainLayout from '../layouts/main-layout/main-layout';
import Loader from '../loader/loader';
import InputMessage from '../input-message/input-message';

function PageCart(): JSX.Element {
  const dispatch = useDispatch();
  const appliedCoupon = useSelector(getAppliedCoupon);
  const isCatalogLoad = useSelector(getIsCatalogLoad);
  const guitars = useSelector(getGuitarsFromCart);
  const itemCount = useSelector(getItemCount);
  const discount = useSelector(getDiscount);
  const [coupon, setCoupon] = useState(appliedCoupon);
  const [isCouponError, setIsCouponError] = useState(false);
  const [isCouponSuccess, setIsCouponSuccess] = useState(Boolean(appliedCoupon));

  if (!isCatalogLoad) {
    return <Loader className="page__loader" />;
  }

  const totalInfo = guitars.reduce((total, guitar) => total + guitar.price * itemCount[guitar.id], 0);
  const discountInfo = totalInfo * discount / 100;
  const totalPrice = totalInfo - discountInfo;

  const discountClasses = ['cart__total-value', discountInfo ? 'cart__total-value--bonus' : ''].join(' ').trim();
  const minusSymbol = discountInfo ? '-' : '';

  const onGuitarRemove = (guitarId: number) => dispatch(removeCartItemAll(guitarId));

  const onCouponChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setCoupon(value);
  };
  const onCouponApply = (event: FormEvent) => {
    event.preventDefault();
    dispatch(addAppliedCoupon(''));
    dispatch(addDiscount(0));
    setIsCouponError(false);
    setIsCouponSuccess(false);
    (dispatch as ThunkAppDispatch)(postCoupon({
      coupon,
    }))
      .then(() => {
        dispatch(addAppliedCoupon(coupon));
        setIsCouponSuccess(true);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          setIsCouponError(true);
        } else {
          throw error;
        }
      });
  };

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Каталог</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Корзина</a>
            </li>
          </ul>

          <div className="cart">
            {guitars.map((guitar) => (
              <CartItem
                key={guitar.id}
                guitar={guitar}
                count={itemCount[guitar.id]}
                onItemRemove={onGuitarRemove}
              />
            ))}

            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form
                  className="coupon__form"
                  id="coupon-form"
                  method="post"
                  action="/"
                  onSubmit={onCouponApply}
                >
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      id="coupon"
                      name="coupon"
                      value={coupon}
                      onChange={onCouponChange}
                    />
                    {isCouponSuccess && <InputMessage text={CouponMessage.Success} type={MessageType.Success}/>}
                    {isCouponError && <InputMessage text={CouponMessage.Error} type={MessageType.Error}/>}
                  </div>
                  <button type="submit" className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{formatPrice(totalInfo)}</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className={discountClasses}>{`${minusSymbol} ${formatPrice(discountInfo)}`}</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">{formatPrice(totalPrice)}</span>
                </p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default PageCart;
