import {useEffect, useRef, useState} from 'react';
import {Guitar} from '../../types/guitar';
import CatalogCard from '../catalog-card/catalog-card';
import Loader from '../loader/loader';

type PropsType = {
  guitars: Guitar[],
}

const TIME_OUT = 400;

function CatalogList(props: PropsType): JSX.Element {
  const {guitars} = props;
  const [showGuitars, setShowGuitars] = useState<Guitar[]>(guitars);
  const [isShowLoader, setIsShowLoader] = useState(false);
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
      {showGuitars.map((guitar) => <CatalogCard key={guitar.id} guitar={guitar} />)}
    </div>
  );
}

export default CatalogList;
