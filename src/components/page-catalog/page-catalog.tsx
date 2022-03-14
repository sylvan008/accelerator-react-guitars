import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getGuitars, getIsCatalogLoad, getPriceBounds} from '../../store/catalog-process/selectors';
import {sortingItems} from '../../utils/const/sorting';
import {
  checkGuitarStrings,
  checkGuitarTypes,
  checkMinMaxPriceValue,
  checkSort,
  checkSortDirection,
  convertSearchStringToArray,
  getTotalPages,
  parsePageNumberParam,
  replaceRouteParam,
  sliceElementsForPage,
  sortGuitars,
  updateSortDependency
} from '../../utils/utils';
import {useSort} from '../../hooks/use-sort';
import {useSearchParams} from '../../hooks/use-search-params';
import {SearchParam} from '../../utils/const/searchParam';
import {Direction, SortType} from '../../types/sort';
import {GuitarType} from '../../types/guitar';
import {GuitarStringCountType} from '../../types/filter';
import {filterByName, filterByPrice, filterByStrings, filterByType} from '../../utils/filters';
import {browserHistory} from '../../services/browser-history';
import {AppRoute, RouteParam} from '../../utils/const/app-route';
import {PageName} from '../../hooks/use-breadcrumbs';
import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';
import CatalogList from '../catalog-list/catalog-list';
import Loader from '../loader/loader';
import ModalAddToCart from '../modal-add-to-cart/modal-add-to-cart';
import ModalAddCartSuccess from '../modal-add-cart-success/modal-add-cart-success';
import {addCartItem} from '../../store/action';

type RouteParams = {
  pageNumber: string,
};

function PageCatalog(): JSX.Element {
  const dispatch = useDispatch();
  const routeParams: RouteParams = useParams();
  const pageNumber = routeParams.pageNumber
    ? parsePageNumberParam(routeParams.pageNumber)
    : 1;

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

  const [selectedGuitarId, setSelectedGuitarId] = useState<number | null>(null);
  const [isAddCartSuccessShow, setIsAddCartSuccessShow] = useState(false);

  const selectedGuitar = guitars.find((guitar) => guitar.id === selectedGuitarId);
  const onBuyClick = (guitarId: number) => setSelectedGuitarId(guitarId);
  const onCartItemAdd = () => {
    if (!selectedGuitarId) {
      return;
    }
    dispatch(addCartItem(selectedGuitarId));
    setSelectedGuitarId(null);
    setIsAddCartSuccessShow(true);
  };
  const onCartItemAddModalClose = () => setSelectedGuitarId(null);

  const onModalCartSuccessClose = () => setIsAddCartSuccessShow(false);

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

  let filterList = filterByName(guitars, nameSearch);
  filterList = filterByPrice(filterList, [priceMinSearch, priceMaxSearch]);
  filterList = filterByType(filterList, searchGuitarTypes);
  filterList = filterByStrings(filterList, searchGuitarStrings);

  const totalPages = useMemo(
    () => (getTotalPages(filterList.length)),
    [filterList.length],
  );

  useEffect(() => {
    browserHistory.replace({
      pathname: replaceRouteParam(AppRoute.CatalogPage, RouteParam.PageNumber, '1'),
      search: searchParams.toString(),
    });
  }, [totalPages, searchParams]);

  let catalogCards = sortGuitars(filterList, sortType, sortDirection);
  catalogCards = sliceElementsForPage(catalogCards, pageNumber);

  if (!isCatalogLoad) {
    return <Loader className="page__loader" />;
  }

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs pageName={PageName.Catalog} />
          <div className="catalog">
            <CatalogFilter
              priceBounds={priceBounds}
              priceMinSearch={priceMinSearch}
              priceMaxSearch={priceMaxSearch}
              searchGuitarTypes={searchGuitarTypes}
              searchGuitarString={searchGuitarStrings}
              onSearchParamsSet={setSearchParams}
            />
            <CatalogSort
              activeDirection={sortDirection}
              activeType={sortType}
              onSortDirectionChange={onSortDirectionChange}
              onSortTypeChange={onSortTypeChange}
              sortingItems={sortingItems}
            />
            <CatalogList guitars={catalogCards} onBuyClick={onBuyClick} />
            <Pagination pageNumber={pageNumber} totalPages={totalPages} />
          </div>
        </div>
        {selectedGuitar && (
          <ModalAddToCart
            guitar={selectedGuitar}
            onCartItemAdd={onCartItemAdd}
            onClose={onCartItemAddModalClose}
          />
        )}
        {isAddCartSuccessShow && (
          <ModalAddCartSuccess onClose={onModalCartSuccessClose} onContinueClick={onModalCartSuccessClose} />
        )}
      </main>
    </MainLayout>
  );
}

export default PageCatalog;
