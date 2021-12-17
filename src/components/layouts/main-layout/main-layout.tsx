import MainHeader from '../../main-header/main-header';
import MainFooter from '../../main-footer/main-footer';

type PropsType = {
  children: JSX.Element[],
};

function MainLayout(props: PropsType): JSX.Element {
  const {children} = props;

  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  );
}

export default MainLayout;
