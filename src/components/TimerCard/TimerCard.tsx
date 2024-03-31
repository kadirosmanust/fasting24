// import { useState } from 'react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAuth from '@/hooks/useAuth';
import { getNowParameter, getStartAndEndDate } from '@/libs/timerHelper';
import {
  useCreateFastingMutation,
  useGetActiveFastingQuery,
  useUpdateFastingMutation,
} from '@/store/services/fasting';
import { Fasting } from '@/types/fasting';
import { SelectTime } from '@/types/timer';

import Button from '../Button';
import ConfettiAnimation from '../ConfettiAnimation';
import Ring from '../Ring';
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
  const [activeFastingData, setActiveFastingData] =
    useState<Partial<Fasting> | null>(null);

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

  const [createFasting] = useCreateFastingMutation();
  const [updateFasting] = useUpdateFastingMutation();

  useEffect(() => {
    if (!activeFastingData?.isActive) {
      const timeRangeInt = setInterval(() => {
        const newTimeRange = [
          {
            hour: getNowParameter('hour'),
            minute: getNowParameter('minute'),
          },
          {
            hour: getNowParameter('hour', true),
            minute: getNowParameter('minute'),
          },
        ];
        const dateRange = getStartAndEndDate(newTimeRange[0], newTimeRange[1]);
        setTimeRange(newTimeRange);
        setActiveFastingData(prev => ({
          ...prev,
          startDate: dateRange.start.toDate(),
          endDate: dateRange.end.toDate(),
        }));
      }, 60000);

      return () => {
        clearInterval(timeRangeInt);
      };
    }
  }, [activeFastingData]);

  useEffect(() => {
    if (activeFasting) {
      setActiveFastingData(activeFasting);

      setTimeRange([
        {
          hour: dayjs(activeFasting.startDate).format('HH'),
          minute: dayjs(activeFasting.startDate).format('mm'),
        },
        {
          hour: dayjs(activeFasting.endDate).format('HH'),
          minute: dayjs(activeFasting.endDate).format('mm'),
        },
      ]);
    } else {
      const newFasting: Partial<Fasting> = {
        isCompleted: false,
        isActive: false,
        startDate: dayjs().toDate(),
        endDate: dayjs().add(1, 'hour').toDate(),
      };
      setActiveFastingData(newFasting);
    }
  }, [activeFasting]);

  const onStartDateChange = (value: SelectTime) => {
    setTimeRange([value, timeRange[1]]);
    const date = getStartAndEndDate(value, timeRange[1]);

    setActiveFastingData(prev => ({
      ...prev,
      startDate: date.start.toDate(),
      endDate: date.end.toDate(),
    }));
  };

  const onEndDateChange = (value: SelectTime) => {
    setTimeRange([timeRange[0], value]);
    const date = getStartAndEndDate(timeRange[0], value);

    setActiveFastingData(prev => ({
      ...prev,
      startDate: date.start.toDate(),
      endDate: date.end.toDate(),
    }));
  };
  const resetDatas = () => {
    const startTime = {
      hour: getNowParameter('hour'),
      minute: getNowParameter('minute'),
    };

    const endTime = {
      hour: getNowParameter('hour', true),
      minute: getNowParameter('minute'),
    };
    setTimeRange([startTime, endTime]);
    const dateRange = getStartAndEndDate(startTime, endTime);

    const newFasting: Partial<Fasting> = {
      isCompleted: false,
      isActive: false,
      startDate: dateRange.start.toDate(),
      endDate: dateRange.end.toDate(),
    };
    setActiveFastingData(newFasting);
  };
  const activeFastingHandler = async () => {
    if (!activeFastingData) return;
    if (activeFastingData.isCompleted) {
      await updateFasting({
        _id: activeFastingData._id,
        isCompleted: activeFastingData.isCompleted,
        isActive: activeFastingData.isActive,
      });

      resetDatas();
      return;
    }
    if (activeFastingData.isActive) {
      await updateFasting({
        _id: activeFastingData._id,
        isActive: false,
        isCompleted: false,
        startDate: activeFastingData.startDate,
        endDate: activeFastingData.endDate,
      });

      resetDatas();
      return;
    }

    const dateRange = getStartAndEndDate(timeRange[0], timeRange[1]);

    const created = await createFasting({
      ...activeFastingData,
      isActive: true,
      startDate: dateRange.start.toDate(),
      endDate: dateRange.end.toDate(),
    }).unwrap();

    setActiveFastingData(prev => ({
      ...prev,
      _id: created._id,
      isActive: true,
      startDate: created.startDate,
      endDate: created.endDate,
    }));
  };

  const onDurationCompleted = async () => {
    setActiveFastingData(prev => ({
      ...prev,
      isCompleted: true,
      isActive: false,
    }));

    await updateFasting({
      _id: activeFastingData!._id,
      isActive: false,
      isCompleted: true,
      startDate: activeFastingData!.startDate,
      endDate: activeFastingData!.endDate,
    });
  };

  const getTitle = () => {
    if (activeFastingData?.isCompleted) {
      return t('fastingCompleted');
    }
    if (activeFastingData?.isActive) {
      return t('youAreFasting');
    }
    return t('readyToFasting');
  };

  const buttonText = () => {
    if (activeFastingData?.isCompleted) {
      return t('startNewFasting');
    }
    if (activeFastingData?.isActive) {
      return t('endFasting');
    }
    return t('startFasting');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{getTitle()}</h2>
      <Ring
        onDurationCompleted={onDurationCompleted}
        fastingData={activeFastingData}
      />
      <div className={styles.selectsContainer}>
        <div className={styles.selectItem}>
          <h3>{t('startTo')}</h3>
          <Select
            disabled={activeFastingData?.isActive}
            value={timeRange[0]}
            onChange={onStartDateChange}
          />
        </div>
        <div className={styles.selectItem}>
          <h3>{t('endTo')}</h3>
          <Select
            disabled={activeFastingData?.isActive}
            value={timeRange[1]}
            onChange={onEndDateChange}
          />
        </div>
      </div>
      <Button onClick={activeFastingHandler}>{buttonText()}</Button>
      {activeFastingData?.isCompleted && <ConfettiAnimation />}
    </div>
  );
};

export default TimerCard;
