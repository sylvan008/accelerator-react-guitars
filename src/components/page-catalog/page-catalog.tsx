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
import {useSearchParams} from '../../hooks/use-search-params';
import {SearchParam} from '../../utils/const/searchParam';
import {Direction, SortType} from '../../types/sort';
import {useEffect} from 'react';
import {Guitar} from '../../types/guitar';

function PageCatalog(): JSX.Element {
  const isCatalogLoad = useSelector(getIsCatalogLoad);
  const guitars = useSelector(getGuitars);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortSearch = searchParams.get(SearchParam.Sort) as SortType | null;
  const orderSearch = searchParams.get(SearchParam.Order) as Direction | null;
  const nameSearch = searchParams.get(SearchParam.Name) || '';

  const [
    sortType,
    sortDirection,
    onSortTypeChange,
    onSortDirectionChange,
  ] = useSort(sortSearch, orderSearch);

  useEffect(() => {
    if (sortType && sortDirection) {
      setSearchParams({
        [SearchParam.Sort]: sortType,
        [SearchParam.Order]: sortDirection,
      });
    }
  },[sortType, sortDirection, setSearchParams]);

  if (!isCatalogLoad) {
    return <Loader />;
  }

  const filterLIst = (guitarsList: Guitar[]) => {
    if (!nameSearch) {
      return guitarsList;
    }
    return guitarsList.filter((guitar) => (
      guitar.name
        .toLowerCase()
        .includes(nameSearch.toLocaleLowerCase())
    ));
  };
  const sortedList = sortGuitars(filterLIst(guitars), sortType, sortDirection);

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter setSearchParams={setSearchParams} />
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
