import {replaceImagePath} from '../../utils/utils';
import {GuitarDictionary} from '../../utils/const/locale';
import {formatPrice} from '../../utils/format';
import {Guitar} from '../../types/guitar';

type PropsType = Pick<Guitar, 'name' | 'previewImg' | 'price' | 'stringCount' | 'type' | 'vendorCode'>;

function ModalInfo(props: PropsType): JSX.Element {
  const {
    name,
    previewImg,
    price,
    stringCount,
    type,
    vendorCode,
  } = props;
  return (
    <div className="modal__info">
      <img
        className="modal__img"
        src={replaceImagePath(previewImg)}
        width="67"
        height="137"
        alt={name}
      />
      <div className="modal__info-wrapper">
        <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
        <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
        <p className="modal__product-params">{GuitarDictionary[type]}, {stringCount} струнная</p>
        <p className="modal__price-wrapper">
          <span className="modal__price">Цена:</span>
          <span className="modal__price">{formatPrice(price)}</span>
        </p>
      </div>
    </div>
  );
}

export default ModalInfo;
