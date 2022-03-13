import {useEffect, useRef, useState} from 'react';
import {Guitar} from '../../types/guitar';
import CatalogCard from '../catalog-card/catalog-card';
import Loader from '../loader/loader';
import {useSelector} from 'react-redux';
import {getCartUniqItems} from '../../store/cart-process/selectors';

type PropsType = {
  guitars: Guitar[],
  onBuyClick: (guitarId: number) => void,
}

const TIME_OUT = 400;

function CatalogList(props: PropsType): JSX.Element {
  const {guitars, onBuyClick} = props;
  const [showGuitars, setShowGuitars] = useState<Guitar[]>(guitars);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const uniqCartItems = useSelector(getCartUniqItems);
  const timeout: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    clearTimeout(timeout.current as NodeJS.Timeout);

    setIsShowLoader(true);

    timeout.current = setTimeout(() => {
      setShowGuitars(guitars);
      setIsShowLoader(false);
    }, TIME_OUT);
  }, [guitars]);

  return (
    <div className="cards catalog__cards">
      {isShowLoader && <Loader className="catalog__loader" />}
      {showGuitars.map((guitar) => (
        <CatalogCard
          key={guitar.id}
          guitar={guitar}
          isInCart={uniqCartItems.has(guitar.id)}
          onBuyClick={onBuyClick}
        />
      ))}
    </div>
  );
}

export default CatalogList;
