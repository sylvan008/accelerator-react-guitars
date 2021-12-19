import {Guitar} from '../../types/guitar';
import CatalogCard from '../catalog-card/catalog-card';

type PropsType = {
  guitars: Guitar[],
}

function CatalogList(props: PropsType): JSX.Element {
  const {guitars} = props;
  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => <CatalogCard key={guitar.id} guitar={guitar} />)}
    </div>
  );
}

export default CatalogList;
