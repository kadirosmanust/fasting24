import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import confettiAnimationData from '@/assets/lottieFiles/confettiAnimation.json';

import styles from './ConfettiAnimation.module.scss';

type ConfettiAnimationProps = {
  isStopped: boolean;
};

const ConfettiAnimation = ({
  isStopped,
}: ConfettiAnimationProps): JSX.Element => {
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    if (!isStopped) {
      setTimeout(() => {
        setIsDone(true);
      }, 5000);
    }

    if (isStopped) {
      setIsDone(false);
    }
  }, [isStopped]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confettiAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={styles.container}>
      <Lottie options={defaultOptions} isStopped={isStopped || isDone} />
    </div>
  );
};

export default ConfettiAnimation;
