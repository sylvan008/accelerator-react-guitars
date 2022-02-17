import {useState} from 'react';
import TabsNavigation from '../tabs-navigation/tabs-navigation';

type PropsType = {
  children: JSX.Element[]
};

function Tabs(props: PropsType): JSX.Element {
  const {children} = props;
  const [selectedTab, setSelectedTab] = useState(children[0].props.label);

  return (
    <div className="tabs">
      <TabsNavigation selectedTab={selectedTab} onTabClick={setSelectedTab} />
      <div className="tabs__content" id={selectedTab}>
        {children.filter((child) => child.props.label === selectedTab)}
      </div>
    </div>
  );
}

export default Tabs;
