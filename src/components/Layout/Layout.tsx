import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

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
