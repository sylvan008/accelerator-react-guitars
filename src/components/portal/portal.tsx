import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {TestId} from '../../utils/const/test-id';

type PropsType = {
  children: JSX.Element
};

function Portal(props: PropsType): JSX.Element {
  const {children} = props;
  const [container] = useState(() => document.createElement('div'));
  container.setAttribute('data-testid', TestId.PortalContainer);

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
}

export default Portal;
