import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useWindowSize from '@/hooks/useWindowSize';
import {
  calculateDurationInSeconds,
  getDurationFromNowInSeconds,
  getDurationToDisplay,
} from '@/libs/timerHelper';
import { Fasting } from '@/types/fasting';

import styles from './Ring.module.scss';

type RingProps = {
  onDurationCompleted: () => void;
  fastingData: Partial<Fasting> | null;
};

const Ring = ({ onDurationCompleted, fastingData }: RingProps) => {
  const [progressPercent, setProgressPercent] = useState(100);
  const { t } = useTranslation('fastings');
  const [radius, setRadius] = useState(170);
  const [strokeWidth, setStrokeWidth] = useState(35);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width && windowSize.width < 400) {
      setRadius(130);
      setStrokeWidth(25);
    } else {
      setRadius(170);
      setStrokeWidth(35);
    }
  }, [windowSize]);

  const totalDuration = useMemo(() => {
    if (fastingData && fastingData.startDate && fastingData.endDate) {
      return calculateDurationInSeconds(
        fastingData.startDate,
        fastingData.endDate,
      );
    }
    return 0;
  }, [fastingData]);

  const [duration, setDuration] = useState(totalDuration);

  useEffect(() => {
    if (!fastingData?.isActive) {
      setProgressPercent(100);
    }
  }, [fastingData]);

  useEffect(() => {
    if (fastingData && fastingData.startDate && fastingData.endDate) {
      const totalDuration = calculateDurationInSeconds(
        fastingData.startDate,
        fastingData.endDate,
      );
      const wastedDuration = getDurationFromNowInSeconds(fastingData.startDate);
      const diff = totalDuration - wastedDuration;
      if (diff > 0) {
        setDuration(totalDuration - wastedDuration);
      }
    }
  }, [fastingData]);

  useEffect(() => {
    if (fastingData?.isActive) {
      const interval = setInterval(() => {
        if (duration === 1) {
          clearInterval(interval);
          setProgressPercent(100);
          setDuration(totalDuration);
          onDurationCompleted();
          return;
        }
        const wastedDuration = getDurationFromNowInSeconds(
          fastingData.startDate!,
        );
        const diff = totalDuration - wastedDuration;
        setDuration(diff);
        setProgressPercent(((duration - 1) / totalDuration) * 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [duration, fastingData, onDurationCompleted, totalDuration]);

  const progress = progressPercent * 0.6;
  const circumference = 2 * Math.PI * radius;
  const progressValue = ((100 - progress) / 100) * circumference;

  const descText = () => {
    if (fastingData?.isCompleted) {
      return t('totalTime');
    }
    if (fastingData?.isActive) {
      return `${t('elapsedTime')} %${progressPercent.toFixed(0)}`;
    }
    return t('setFastingTime');
  };

  const lineColor = useMemo(() => {
    if (fastingData?.isCompleted) {
      return ['#52D13D', '#89C36D', '#E6FFDA'];
    }
    if (fastingData?.isActive) {
      return ['#FF6B00', '#FFCB8D', '#FFDCC2'];
    }
    return ['#6567D9', '#B4B5F9', '#D6D6FF'];
  }, [fastingData]);

  return (
    <div className={styles.container} data-testid="ring">
      <div className={styles.textContainer}>
        <p className={styles.description}>{descText()}</p>
        <h1 className={styles.durationText}>
          {getDurationToDisplay(duration * 1000)}
        </h1>
      </div>
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
        }}
      >
        {/* Background circle */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <linearGradient id={'gr'}>
          <stop offset="0%" stopColor={lineColor[0]} />
          <stop offset="100%" stopColor={lineColor[1]} />
        </linearGradient>
        {/* Progress line */}
        <circle
          className={styles.progressCircle}
          style={{
            filter: `drop-shadow(0px 10px 60px ${lineColor[2]}`,
          }}
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="url(#gr)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressValue}
          strokeLinecap="round"
          transform={`rotate(150 ${radius} ${radius})`}
        />
        //make a dot end of the progress endX
        {/* <circle
        cx={x}
        cy={y}
        r={strokeWidth / 6} // Adjust the size of the dot as necessary
        fill="#6567D9" // Use the color of your choice
      /> */}
      </svg>
    </div>
  );
};

export default Ring;
