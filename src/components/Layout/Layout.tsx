import { ReactNode } from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      {children || <Outlet />}
    </>
  );
};

export default Layout;
