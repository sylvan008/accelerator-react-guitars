import {useSelector} from 'react-redux';
import {getGuitars} from '../../store/catalog-process/selectors';
import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/Pagination';
import CatalogList from '../catalog-list/catalog-list';

function PageCatalog(): JSX.Element {
  const guitars = useSelector(getGuitars);

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <CatalogList guitars={guitars} />
            <Pagination />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default PageCatalog;
