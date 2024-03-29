/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

import { hours, minutes } from '@/constants/times';

import styles from './Select.module.scss';

type SelectProps = {
  onChange: (value: { hour: string | null; minute: string | null }) => void;
  value: { hour: string | null; minute: string | null };
  disabled?: boolean;
};

const Select = ({ value, onChange, disabled }: SelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(value.hour);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(
    value.minute,
  );

  useEffect(() => {
    setSelectedHour(value.hour);
    setSelectedMinute(value.minute);
  }, [value]);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleWithHour = (hour: string) => {
    setSelectedHour(hour);
    onChange({
      hour,
      minute: selectedMinute,
    });
  };

  const handleWithMinute = (minute: string) => {
    setSelectedMinute(minute);
    onChange({
      hour: selectedHour,
      minute: minute,
    });
  };

  return (
    <div
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      className={styles.customSelect}
      ref={selectRef}
    >
      <div
        className={`${styles.selectedOption} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedHour} : {selectedMinute}
        </span>
      </div>

      {isOpen && (
        <div className={styles.optionsContainer}>
          <div className={styles.optionsItemList}>
            {hours
              .map(hour => ({ value: hour, label: `${hour}` }))
              .map((option, idx) => (
                <div
                  key={idx}
                  className={styles.option}
                  onClick={() => handleWithHour(option.value)}
                >
                  {option.label}
                </div>
              ))}
          </div>
          <div className={styles.optionsItemList}>
            {minutes
              .map(hour => ({ value: hour, label: `${hour}` }))
              .map((option, idx) => (
                <div
                  key={idx}
                  className={styles.option}
                  onClick={() => handleWithMinute(option.value)}
                >
                  {option.label}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
