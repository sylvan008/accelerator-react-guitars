import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getGuitars, getIsCatalogLoad} from '../../store/catalog-process/selectors';
import {Direction, SortType} from '../../types/sort';
import {SortDirection, sortingItems} from '../../utils/const/sorting';
import {sortGuitars} from '../../utils/utils';
import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/Pagination';
import CatalogList from '../catalog-list/catalog-list';
import Loader from '../loader/loader';

const FIRST_ITEM = 0;

function PageCatalog(): JSX.Element {
  const isCatalogLoad = useSelector(getIsCatalogLoad);
  const guitars = useSelector(getGuitars);
  const [sortType, setSortType] = useState<SortType>(null);
  const [sortDirection, setSortDirection] = useState<Direction>(null);

  const sortedList = sortGuitars(guitars, sortType, sortDirection);

  const onSortTypeChange = (type: SortType) => {
    setSortType(type);
    if (!sortDirection) {
      setSortDirection(SortDirection.ASC);
    }
  };
  const onSortDirectionChange = (direction: Direction) => {
    setSortDirection(direction);
    if (!sortType) {
      setSortType(sortingItems[FIRST_ITEM].type);
    }
  };

  if (!isCatalogLoad) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort
              activeDirection={sortDirection}
              activeType={sortType}
              onSortDirectionChange={onSortDirectionChange}
              onSortTypeChange={onSortTypeChange}
              sortingItems={sortingItems}
            />
            <CatalogList guitars={sortedList} />
            <Pagination />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default PageCatalog;
