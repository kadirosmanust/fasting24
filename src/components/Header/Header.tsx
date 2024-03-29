import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/icons/logo.svg?react';
import LogoutIcon from '@/assets/icons/logout.svg?react';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { clearCreadentials } from '@/store/reducers/auth';

import styles from './Header.module.scss';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(clearCreadentials());
  };

  return (
    <button onClick={logoutHandler} className={styles.logout}>
      <LogoutIcon />
    </button>
  );
};

const Header = (): JSX.Element => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <header className={styles.header}>
      <div onClick={navigateToHome} className={styles.logoContainer}>
        <Logo />
        <h1 className={styles.title}>
          FASTING<span>24</span>
        </h1>
      </div>
      {user && <LogoutButton />}
    </header>
  );
};

export default Header;
