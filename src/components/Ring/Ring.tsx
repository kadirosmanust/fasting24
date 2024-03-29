import {
  getDurationFromNowInSeconds,
  getDurationToDisplay,
  parseDateAndCalculateDuration,
  timeRangeToDateRange,
} from '@/libs/timerHelper';
import { SelectTime } from '@/types/timer';
import { useEffect, useMemo, useState } from 'react';
import styles from './Ring.module.scss';
import { useTranslation } from 'react-i18next';

const radius = 170;
const strokeWidth = 35;

type RingProps = {
  timeRange: SelectTime[];
  isStarted: boolean;
  onDurationCompleted: () => void;
  isCompleted: boolean;
};

const Ring = ({
  timeRange,
  isStarted,
  onDurationCompleted,
  isCompleted,
}: RingProps) => {
  const [progressPercent, setProgressPercent] = useState(100);
  const { t } = useTranslation('fastings');
  const totalDuration = useMemo(
    () => parseDateAndCalculateDuration(timeRange),
    [timeRange],
  );

  const [duration, setDuration] = useState(
    parseDateAndCalculateDuration(timeRange),
  );

  useEffect(() => {
    if (!isStarted) {
      setProgressPercent(100);
    }
  }, [isStarted]);

  useEffect(() => {
    const dateRange = timeRangeToDateRange(timeRange);

    const wastedDuration = getDurationFromNowInSeconds(dateRange.startDate);
    const totalDuration = parseDateAndCalculateDuration(timeRange);

    setDuration(totalDuration - wastedDuration);
  }, [timeRange]);

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        if (duration === 1) {
          clearInterval(interval);
          setProgressPercent(100);
          setDuration(totalDuration);
          onDurationCompleted();
          return;
        }
        setDuration(prevDuration => prevDuration - 1);
        setProgressPercent(((duration - 1) / totalDuration) * 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [duration, isStarted, onDurationCompleted, totalDuration]);

  const progress = progressPercent * 0.6;
  const circumference = 2 * Math.PI * radius;
  const progressValue = ((100 - progress) / 100) * circumference;

  const descText = () => {
    if (isCompleted) {
      return t('totalTime');
    }
    if (isStarted) {
      return `${t('elapsedTime')} %${progressPercent.toFixed(0)}`;
    }
    return t('setFastingTime');
  };

  const lineColor = useMemo(() => {
    if (isCompleted) {
      return ['#52D13D', '#89C36D', '#E6FFDA'];
    }
    if (isStarted) {
      return ['#FF6B00', '#FFCB8D', '#FFDCC2'];
    }
    return ['#6567D9', '#B4B5F9', '#D6D6FF'];
  }, [isCompleted, isStarted]);

  return (
    <div className={styles.container}>
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
