import {useSelector} from 'react-redux';
import {getGuitars, getIsCatalogLoad} from '../../store/catalog-process/selectors';
import {sortingItems} from '../../utils/const/sorting';
import {sortGuitars} from '../../utils/utils';
import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/Pagination';
import CatalogList from '../catalog-list/catalog-list';
import Loader from '../loader/loader';
import {useSort} from '../../hooks/use-sort';

function PageCatalog(): JSX.Element {
  const isCatalogLoad = useSelector(getIsCatalogLoad);
  const guitars = useSelector(getGuitars);

  const [
    sortType,
    sortDirection,
    onSortTypeChange,
    onSortDirectionChange,
  ] = useSort();

  const sortedList = sortGuitars(guitars, sortType, sortDirection);

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
