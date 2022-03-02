import {generatePath, useParams} from 'react-router-dom';
import {AppRoute} from '../utils/const/app-route';

const PageName = {
  Main: 'Main',
  Catalog: 'Catalog',
  Product: 'Product',
} as const;

type PageName = keyof typeof PageName;
type BreadcrumbOptions = {text?: string, params?: RouteParams};
type RouteParams = Record<string, string>;
type Crumb = Record<'to' | 'text', string>;
type Creator = (options?: BreadcrumbOptions) => Crumb[];

const Breadcrumb: Record<string, Creator> = {};

function setCrumb(name: PageName, creator: Creator) {
  Breadcrumb[name] = creator;
}

function initCrumbs() {
  setCrumb(PageName.Main, () => ([
    {
      to: AppRoute.Main,
      text: 'Главная',
    },
  ]));

  setCrumb(PageName.Catalog, () =>
    Breadcrumb[PageName.Main]()
      .concat({
        to: AppRoute.Catalog,
        text: 'Каталог',
      }));

  setCrumb(PageName.Product, (options) => {
    const text = options?.text || '';
    const params = options?.params || {};
    return Breadcrumb[PageName.Catalog]()
      .concat({
        to: generatePath(AppRoute.ProductPage, params as {id: string}),
        text: text || '',
      });
  });
}

function createBreadcrumbs(pageName: string, options: BreadcrumbOptions) {
  return Breadcrumb[pageName](options);
}

function useBreadcrumbs(pageName: string, text?: string) {
  const routeParams: RouteParams = useParams();

  return createBreadcrumbs(pageName, {
    params: routeParams,
    text,
  });
}

initCrumbs();

export {
  PageName,
  useBreadcrumbs
};

