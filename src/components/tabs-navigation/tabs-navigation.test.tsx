import {render, screen} from '@testing-library/react';
import {ProductTab, productTabs} from '../../utils/const/product-tabs';
import TabsNavigation from './tabs-navigation';

describe('Component TabsNavigation', () => {
  const onTabClick = jest.fn();

  it('should render correctly', () => {
    const linkRole = 'link';
    const tabsCount = Object.keys(ProductTab).length;

    render(<TabsNavigation selectedTab={ProductTab.Characteristics} onTabClick={onTabClick} />);
    expect(screen.getAllByRole(linkRole)).toHaveLength(tabsCount);
  });

  it('should call onTabClick', () => {
    const buttonRegexp = new RegExp(productTabs[0].label, 'i');
    render(<TabsNavigation selectedTab={ProductTab.Characteristics} onTabClick={onTabClick} />);
    const tabButton = screen.getByText(buttonRegexp);
    tabButton.click();

    expect(onTabClick).toBeCalledTimes(1);
  });
});
