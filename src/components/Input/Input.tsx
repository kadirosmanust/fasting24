import React, { forwardRef, useRef } from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
  value: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, type, ...props }, ref): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);
      const input = e.target;
      containerRef.current?.classList.toggle(styles.active, input.value !== '');
    };
    return (
      <div ref={containerRef} className={styles.container}>
        <input
          type={type || 'text'}
          className={styles.input}
          value={value}
          {...props}
          onChange={handleInputChange}
          ref={ref}
        />
        <label>{placeholder}</label>
      </div>
    );
  },
);

export default Input;
