import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getGuitars, getIsCatalogLoad, getPriceBounds} from '../../store/catalog-process/selectors';
import {sortingItems} from '../../utils/const/sorting';
import {
  checkGuitarStrings,
  checkGuitarTypes,
  checkMinMaxPriceValue, checkSort, checkSortDirection,
  convertSearchStringToArray,
  sortGuitars, updateSortDependency
} from '../../utils/utils';
import {useSort} from '../../hooks/use-sort';
import {useSearchParams} from '../../hooks/use-search-params';
import {SearchParam} from '../../utils/const/searchParam';
import {Direction, SortType} from '../../types/sort';
import {Guitar, GuitarType} from '../../types/guitar';
import {GuitarStringCountType} from '../../types/filter';
import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/Pagination';
import CatalogList from '../catalog-list/catalog-list';
import Loader from '../loader/loader';

function PageCatalog(): JSX.Element {
  const priceBounds = useSelector(getPriceBounds);
  const isCatalogLoad = useSelector(getIsCatalogLoad);
  const guitars = useSelector(getGuitars);
  const [searchParams, setSearchParams] = useSearchParams();

  const nameSearch = searchParams.get(SearchParam.Name) || '';
  const searchGuitarStrings = checkGuitarStrings(
    convertSearchStringToArray(searchParams.get(SearchParam.Strings)) as GuitarStringCountType[],
  );
  const searchGuitarTypes = checkGuitarTypes(
    convertSearchStringToArray(searchParams.get(SearchParam.Type)) as GuitarType[],
  );

  let sortSearch = checkSort(searchParams.get(SearchParam.Sort) as SortType);
  let orderSearch = checkSortDirection(searchParams.get(SearchParam.Order) as Direction);

  [sortSearch, orderSearch] = updateSortDependency(sortSearch, orderSearch);

  let priceMinSearch = Number(searchParams.get(SearchParam.PriceLte)) || 0;
  let priceMaxSearch = Number(searchParams.get(SearchParam.PriceGte)) || 0;
  [priceMinSearch, priceMaxSearch] = checkMinMaxPriceValue(priceBounds, priceMinSearch, priceMaxSearch);

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
            <CatalogFilter
              priceBounds={priceBounds}
              priceMinSearch={priceMinSearch}
              priceMaxSearch={priceMaxSearch}
              searchGuitarTypes={searchGuitarTypes}
              searchGuitarString={searchGuitarStrings}
              setSearchParams={setSearchParams}
            />
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
