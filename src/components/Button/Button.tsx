import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
