import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TFunction } from 'i18next';

import { SelectTime } from '@/types/timer';

dayjs.extend(duration);

export const getDateTagText = (
  createdAt: Date,
  t: TFunction<string, undefined>,
) => {
  const createdDate = dayjs(createdAt);
  const currentDate = dayjs();

  const diffInMinutes = currentDate.diff(createdDate, 'minute');
  const diffInHours = currentDate.diff(createdDate, 'hour');
  const diffInDays = currentDate.diff(createdDate, 'day');

  let relativeTime;
  if (diffInMinutes < 1) {
    relativeTime = t('justNow');
  } else if (diffInMinutes < 60) {
    relativeTime = `${diffInMinutes} ${t('minutesAgo')}`;
  } else if (diffInHours < 24) {
    relativeTime = `${diffInHours} ${t('hoursAgo')}`;
  } else if (diffInDays === 1) {
    relativeTime = t('yesterday');
  } else {
    relativeTime = `${diffInDays} ${t('daysAgo')}`;
  }
  return relativeTime;
};

export const calculateDurationInSeconds = (startDate: Date, endDate: Date) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return end.diff(start, 'second');
};

export const getNowParameter = (
  parameter: 'minute' | 'hour',
  addAnHour?: boolean,
): string => {
  let now = dayjs();

  if (addAnHour && parameter === 'hour') {
    now = now.add(1, 'hour');
  }

  return now[parameter]() < 10 ? '0' + now[parameter]() : '' + now[parameter]();
};

export const getHoursAndMinutes = (
  date: Date,
  parameter: 'minute' | 'hour',
) => {
  const nDate = dayjs(date);

  return nDate[parameter]() < 10
    ? '0' + nDate[parameter]()
    : '' + nDate[parameter]();
};

export const getStartAndEndDate = (
  startTime: SelectTime,
  endTime: SelectTime,
) => {
  const parsedStartHour = parseInt(startTime.hour || '0');
  const parsedStartMinute = parseInt(startTime.minute || '0');
  const parsedEndHour = parseInt(endTime.hour || '0');
  const parsedEndMinute = parseInt(endTime.minute || '0');

  const start = dayjs().hour(parsedStartHour).minute(parsedStartMinute);

  let end = dayjs().hour(parsedEndHour).minute(parsedEndMinute);

  if (start.isAfter(end)) {
    end = end.add(1, 'day');
  }

  return {
    start,
    end,
  };
};

export const getDurationToDisplay = (durationInMilliseconds: number) => {
  const duration = dayjs.duration(durationInMilliseconds);

  return duration.format('HH:mm:ss');
};

export const timeRangeToDateRange = (timeRange: SelectTime[]) => {
  const startDate = dayjs()
    .hour(parseInt(timeRange[0].hour || '0'))
    .minute(parseInt(timeRange[0].minute || '0'));
  let endDate = dayjs()
    .hour(parseInt(timeRange[1].hour || '0'))
    .minute(parseInt(timeRange[1].minute || '0'));

  if (startDate.isAfter(endDate)) {
    endDate = endDate.add(1, 'day');
  }

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
  };
};

export const parseDateAndCalculateDuration = (timeRange: SelectTime[]) => {
  const { startDate, endDate } = timeRangeToDateRange(timeRange);
  return calculateDurationInSeconds(startDate, endDate);
};

export const getDurationFromNowInSeconds = (date: Date) => {
  const now = dayjs();
  const end = dayjs(date);

  return now.diff(end, 'second');
};
