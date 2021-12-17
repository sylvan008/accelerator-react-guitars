import MainLayout from '../layouts/main-layout/main-layout';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogCard from '../catalog-card/catalog-card';
import Pagination from '../pagination/Pagination';

function PageCatalog(): JSX.Element {
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <div className="cards catalog__cards">
              <CatalogCard />
              <CatalogCard />
              <CatalogCard />
              <CatalogCard />
              <CatalogCard />
              <CatalogCard />
              <CatalogCard />
              <CatalogCard />
              <CatalogCard />
            </div>
            <Pagination />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default PageCatalog;
