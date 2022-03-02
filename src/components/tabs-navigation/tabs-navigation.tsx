import {productTabs} from '../../utils/const/product-tabs';

const INACTIVE_CLASS = 'button--black-border';

type PropsType = {
  selectedTab: string,
  onTabClick: (type: string) => void,
}

function TabsNavigation(props: PropsType): JSX.Element {
  const {selectedTab, onTabClick} = props;

  const setClasses = (isInactive: boolean) => ['button', 'button--medium', 'tabs__button', isInactive ? INACTIVE_CLASS : '']
    .join(' ')
    .trim();

  const createTabClickHandler = (tabType: string) => () => onTabClick(tabType);

  return (
    <>
      {productTabs.map(({label, type}) => (
        <a
          key={type}
          className={setClasses(type !== selectedTab)}
          href={`#${type}`}
          onClick={createTabClickHandler(type)}
        >
          {label}
        </a>
      ))}
    </>
  );
}

export default TabsNavigation;
