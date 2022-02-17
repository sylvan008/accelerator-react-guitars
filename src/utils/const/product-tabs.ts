const ProductTab = ({
  Characteristics: 'characteristics',
  Description: 'description',
} as const);

const productTabs = ([
  {
    type: ProductTab.Characteristics,
    label: 'Характеристики',
  },
  {
    type: ProductTab.Description,
    label: 'Описание',
  },
] as const);

export {
  ProductTab,
  productTabs
};
