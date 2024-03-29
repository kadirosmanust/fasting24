import { useTranslation } from 'react-i18next';

import FastingsList from '@/components/FastingsList';
import TimerCard from '@/components/TimerCard';
import useAuth from '@/hooks/useAuth';

import styles from './Home.module.scss';

const Home = (): JSX.Element => {
  const { user } = useAuth();
  const { t } = useTranslation('common');
  return (
    <div className={styles.container}>
      {user && (
        <p className={styles.title}>
          {t('hello')} <span>{user.name}</span>
        </p>
      )}
      <TimerCard />
      <FastingsList showViewAllOption />
    </div>
  );
};

export default Home;
