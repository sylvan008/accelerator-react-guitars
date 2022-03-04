import {render, screen} from '@testing-library/react';
import Tabs from './tabs';

describe('Component: Tabs', () => {
  function Tab(props: any) {
    return <p>{props.text}</p>;
  }

  it('should render correctly', () => {
    const tabs = [
      {label: 'one', text: 'tab one'},
      {label: 'two', text: 'tab two'},
    ];

    render(
      <Tabs>
        {tabs.map((tab) => <Tab key={tab.label} label={tab.label} text={tab.text} />)}
      </Tabs>,
    );

    expect(screen.getByText(tabs[0].text)).toBeInTheDocument();
  });
});
