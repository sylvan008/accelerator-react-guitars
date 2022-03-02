import {Guitar} from '../../types/guitar';
import {Tab} from '../../types/tab';

type PropsType = Pick<Guitar, 'description'> & Tab;

function TabDescription(props: PropsType): JSX.Element {
  const {description} = props;

  return (
    <p className="tabs__product-description">
      {description}
    </p>
  );
}

export default TabDescription;
