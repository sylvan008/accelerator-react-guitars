export const AppRoute = ({
  Catalog: '/catalog',
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
