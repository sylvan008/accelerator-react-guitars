import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

type PropsType = {
  children: JSX.Element
};

function Portal(props: PropsType): JSX.Element {
  const {children} = props;
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
}

export default Portal;
