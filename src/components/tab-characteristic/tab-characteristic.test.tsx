import {render, screen} from '@testing-library/react';
import TabCharacteristic from './tab-characteristic';
import {GuitarKind, stringsCounts} from '../../utils/const/filter';

describe('Component: TabCharacteristic', () => {
  it('should render correctly', () => {
    const label = 'характеристики';
    const vendorCode = 'code';
    render(
      <TabCharacteristic
        label={label}
        stringCount={Number(stringsCounts[0])}
        type={GuitarKind.Electric}
        vendorCode={vendorCode}
      />);

    expect(screen.getByText(vendorCode)).toBeInTheDocument();
  });
});
