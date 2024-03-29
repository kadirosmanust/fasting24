import React from 'react';

import styles from './AnalyticItem.module.scss';

type AnalyticItemProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

const AnalyticItem = ({
  icon,
  title,
  description,
}: AnalyticItemProps): JSX.Element => {
  return (
    <div className={styles.analyticItem}>
      {icon && <span>{icon}</span>}
      <div>
        <h3>{title ?? ''}</h3>
        <p>{description ?? ''}</p>
      </div>
    </div>
  );
};

export default AnalyticItem;
