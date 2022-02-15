export const AppRoute = ({
  Catalog: '/catalog',
  Main: '/',
  CatalogPage: '/catalog/page/:pageNumber',
  ProductPage: '/catalog/guitar/:id',
  NotFound: '/404',
} as const);

export const ApiRoute = ({
  AddComment: '/comments',
  ApplyCoupon: '/coupons',
  GetGuitar: '/guitars/:id',
  GetGuitars: '/guitars',
  GetComments: '/guitars/:id/comments',
  SendOrder: '/orders',
} as const);

export const RouteParam = ({
  Id: ':id',
  PageNumber: ':pageNumber',
} as const);
