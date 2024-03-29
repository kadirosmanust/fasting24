// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAuth from '@/hooks/useAuth';
import {
  getHoursAndMinutes,
  getNowParameter,
  getStartAndEndDate,
} from '@/libs/timerHelper';
import {
  useCreateFastingMutation,
  useGetActiveFastingQuery,
  useUpdateFastingMutation,
} from '@/store/services/fasting';
import { SelectTime } from '@/types/timer';

import Button from '../Button';
import ConfettiAnimation from '../ConfettiAnimation';
import Ring from '../Ring/Ring';
import Select from '../Select';
import styles from './TimerCard.module.scss';

const TimerCard = (): JSX.Element => {
  const { t } = useTranslation('fastings');
  const { user } = useAuth();
  const { data: activeFasting } = useGetActiveFastingQuery(
    {
      userId: user?.id ?? '',
    },
    {
      skip: !user,
    },
  );
  const [isStarted, setIsStarted] = useState(false);
  const [timeRange, setTimeRange] = useState<SelectTime[]>([
    {
      hour: getNowParameter('hour'),
      minute: getNowParameter('minute'),
    },
    {
      hour: getNowParameter('hour', true),
      minute: getNowParameter('minute'),
    },
  ]);

  const [isCompleted, setIsCompleted] = useState(false);
  const createdFastingId = useRef<string | null>(null);

  const [createFasting] = useCreateFastingMutation();
  const [updateFasting] = useUpdateFastingMutation();

  useEffect(() => {
    if (activeFasting) {
      createdFastingId.current = activeFasting._id;

      setIsStarted(activeFasting.isActive);
      setIsCompleted(activeFasting.isCompleted);
      setTimeRange([
        {
          hour: getHoursAndMinutes(activeFasting.startDate, 'hour'),
          minute: getHoursAndMinutes(activeFasting.startDate, 'minute'),
        },
        {
          hour: getHoursAndMinutes(activeFasting.endDate, 'hour'),
          minute: getHoursAndMinutes(activeFasting.endDate, 'minute'),
        },
      ]);
      createdFastingId.current = activeFasting._id;
    }
  }, [activeFasting]);

  const onStartDateChange = (value: SelectTime) => {
    setTimeRange([value, timeRange[1]]);
  };

  const onEndDateChange = (value: SelectTime) => {
    setTimeRange([timeRange[0], value]);
  };
  const resetDatas = () => {
    setIsStarted(false);
    setIsCompleted(false);
    setTimeRange([
      {
        hour: getNowParameter('hour'),
        minute: getNowParameter('minute'),
      },
      {
        hour: getNowParameter('hour', true),
        minute: getNowParameter('minute'),
      },
    ]);
  };
  const activeFastingHandler = async () => {
    if (isCompleted) {
      const newFasting = {
        isCompleted: true,
        isActive: false,
      };
      await updateFasting({
        _id: createdFastingId.current! ?? '',
        ...newFasting,
      });

      createdFastingId.current = null;

      resetDatas();

      return;
    }
    if (isStarted) {
      const date = getStartAndEndDate(timeRange[0], timeRange[1]);
      const newFasting = {
        isCompleted: false,
        isActive: false,
        startDate: date.start.toDate(),
        endDate: date.end.toDate(),
      };

      await updateFasting({
        _id: createdFastingId.current! ?? '',
        ...newFasting,
      });

      createdFastingId.current = null;

      resetDatas();

      return;
    }
    setIsStarted(true);
    const date = getStartAndEndDate(timeRange[0], timeRange[1]);

    const newFasting = {
      startDate: date.start.toDate(),
      endDate: date.end.toDate(),
      isCompleted: false,
      isActive: true,
    };

    const created = await createFasting(newFasting).unwrap();

    createdFastingId.current = created._id;
  };

  const onDurationCompleted = () => {
    setIsStarted(false);
    setIsCompleted(true);
  };

  const getTitle = () => {
    if (isCompleted) {
      return t('fastingCompleted');
    }
    if (isStarted) {
      return t('youAreFasting');
    }
    return t('readyToFasting');
  };
  const buttonText = () => {
    if (isCompleted) {
      return t('startNewFasting');
    }
    if (isStarted) {
      return t('endFasting');
    }
    return t('startFasting');
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{getTitle()}</h2>
      <Ring
        timeRange={timeRange}
        isStarted={isStarted}
        onDurationCompleted={onDurationCompleted}
        isCompleted={isCompleted}
      />
      <div className={styles.selectsContainer}>
        <div className={styles.selectItem}>
          <h3>{t('startTo')}</h3>
          <Select
            disabled={isStarted}
            value={timeRange[0]}
            onChange={onStartDateChange}
          />
        </div>
        <div className={styles.selectItem}>
          <h3>{t('endTo')}</h3>
          <Select
            disabled={isStarted}
            value={timeRange[1]}
            onChange={onEndDateChange}
          />
        </div>
      </div>
      <Button onClick={activeFastingHandler}>{buttonText()}</Button>
      {isCompleted && <ConfettiAnimation isStopped={!isCompleted} />}
    </div>
  );
};

export default TimerCard;
