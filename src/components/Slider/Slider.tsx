import React from 'react';
import clsx from 'clsx';

import styles from './Slider.module.css';

export function Slider({ className, ...delegated }: { className?: string, [key: string]: any }) {
  return (
    <input
      type="range"
      className={clsx(styles.slider, className)}
      {...delegated}
    />
  );
}

export default Slider;
