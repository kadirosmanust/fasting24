import { useNavigate } from 'react-router-dom';
import AnalyticItem from '../AnalyticItem/AnalyticItem';
import FastingListItem from '../FastingListItem';
import styles from './FastingsList.module.scss';
import { Fasting } from '@/types/fasting';
import { useGetUserFastingsQuery } from '@/store/services/fasting';
import useAuth from '@/hooks/useAuth';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type FastingsListProps = {
  showViewAllOption?: boolean;
};

const FastingsList = ({
  showViewAllOption,
}: FastingsListProps): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation('fastings');
  const { user } = useAuth();

  const {
    data: fastings,
    // isLoading,
    isSuccess,
  } = useGetUserFastingsQuery(
    {
      userId: user?.id ?? '',
    },
    {
      skip: !user,
    },
  );

  const showAllHandler = () => {
    navigate('/fastings');
  };

  const oldFastings = useMemo(
    () =>
      fastings?.filter((fasting: Fasting) => {
        return !fasting.isActive;
      }) ?? [],
    [fastings],
  );

  const completedFastings = useMemo(
    () =>
      fastings?.filter((fasting: Fasting) => {
        return fasting.isCompleted;
      }).length,
    [fastings],
  );

  return (
    <div className={styles.container}>
      <div className={styles.analyticsContainer}>
        <AnalyticItem
          icon="⌛"
          title={oldFastings ? oldFastings.length.toString() : '0'}
          description={t('totalFastings')}
        />
        <AnalyticItem
          icon="🎉"
          title={completedFastings?.toString() ?? '0'}
          description={t('totalCompletedFastings')}
        />
      </div>
      <div className={styles.fastingsList}>
        <div className={styles.header}>
          <h2>{t('latestFastings')}</h2>
          {showViewAllOption && (
            <button onClick={showAllHandler}>{t('viewAll')}</button>
          )}
        </div>
        {isSuccess &&
          oldFastings?.map(fasting => (
            <FastingListItem key={fasting._id} fasting={fasting} />
          ))}
        {!oldFastings?.length && (
          <div className={styles.noFoundText}>
            <span>{t('noFastings')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FastingsList;
