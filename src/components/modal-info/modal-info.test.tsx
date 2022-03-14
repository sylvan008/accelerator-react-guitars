import {render, screen} from '@testing-library/react';
import ModalInfo from './modal-info';
import {createMockGuitar} from '../../utils/mock/guitar-mock';

describe('Component: ModalInfo', () => {
  const guitar = createMockGuitar();
  const {type, name, price, previewImg, stringCount, vendorCode} = guitar;

  const nameRegepx = new RegExp(name, 'i');
  const priceRegepx = /цена/i;

  it('should render correctly', () => {
    render(
      <ModalInfo
        type={type}
        name={name}
        price={price}
        previewImg={previewImg}
        stringCount={stringCount}
        vendorCode={vendorCode}
      />,
    );

    expect(screen.getByText(nameRegepx)).toBeInTheDocument();
    expect(screen.getByText(priceRegepx)).toBeInTheDocument();
  });
});
