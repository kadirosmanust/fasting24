import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import confettiAnimationData from '@/assets/lottieFiles/confettiAnimation.json';

import styles from './ConfettiAnimation.module.scss';

const ConfettiAnimation = (): JSX.Element => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDone(true);
    }, 9000);
  }, []);

  const defaultOptions = {
    loop: !isDone,
    autoplay: !isDone,
    animationData: confettiAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={styles.container}>
      {!isDone && <Lottie options={defaultOptions} isStopped={isDone} />}
    </div>
  );
};

export default ConfettiAnimation;
