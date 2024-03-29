import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './FastingListItem.module.scss';
import ThreeDot from '@/assets/icons/threeDot.svg?react';
import TrashIcon from '@/assets/icons/trashIcon.svg?react';
import { Fasting } from '@/types/fasting';
import dayjs from 'dayjs';

import { useDeleteUserFastingMutation } from '@/store/services/fasting';
import { getDateTagText } from '@/libs/timerHelper';

import 'dayjs/locale/en';
import useAuth from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

type FastingListItemProps = {
  fasting: Fasting;
};

const FastingListItem = ({
  fasting: { _id, startDate, endDate, createdAt, totalDuration: duration },
}: FastingListItemProps): JSX.Element => {
  const { t } = useTranslation('fastings');
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const contextButtonRef = useRef<HTMLButtonElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [durationText, setDurationText] = useState<string>(
    getDateTagText(createdAt, t),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDurationText(getDateTagText(createdAt, t));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [createdAt, t]);

  const [deleteFasting, { isLoading, isError, reset }] =
    useDeleteUserFastingMutation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setIsContextMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      isContextMenuOpen &&
      contextButtonRef.current &&
      contextMenuRef.current
    ) {
      const rect = contextButtonRef.current.getBoundingClientRect();
      const contextMenuRect = contextMenuRef.current.getBoundingClientRect();

      if (contextMenuRect.y + contextMenuRect.height > window.innerHeight) {
        contextMenuRef.current.style.top = `${-rect.height}px`;
      }
    }

    if (!isContextMenuOpen) {
      reset(); // reset error state when context menu is closed
    }
  }, [isContextMenuOpen, reset]);

  const handleDeleteFasting = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    try {
      await deleteFasting({
        fastingId: _id,
        userId: user!.id,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  const toggleContextMenu = () => {
    setIsContextMenuOpen(prevState => !prevState);
  };

  const totalDurationText = useMemo(() => {
    const totalMinutes = Math.floor(duration / 60);

    if (totalMinutes < 60) {
      return `${totalMinutes} ${t('minutes')}`;
    }

    const hours = Math.floor(totalMinutes / 60);

    return `${hours} ${t('hours')}`;
  }, [duration, t]);

  const timeText = useMemo(() => {
    const start = dayjs(startDate).format('HH:mm');
    const end = dayjs(endDate).format('HH:mm');

    return `${start} - ${end}`;
  }, [startDate, endDate]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.titleContainer}>
          <h4 className={styles.title}>{totalDurationText}</h4>
          <span className={styles.dateTag}>{durationText}</span>
        </div>
        <p className={styles.time}>{timeText}</p>
      </div>
      <button
        ref={contextButtonRef}
        onClick={toggleContextMenu}
        className={`${styles.contextButton} ${
          isContextMenuOpen ? styles.active : ''
        }`}
      >
        <ThreeDot />
        {isContextMenuOpen && (
          <div ref={contextMenuRef} className={styles.contextMenu}>
            <div
              onClick={handleDeleteFasting}
              className={`${styles.deleteButton} ${isError ? styles.error : ''}`}
              aria-disabled={isLoading}
            >
              <TrashIcon />
              {t('deleteButton')}
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FastingListItem;
