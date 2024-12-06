import React from "react"


import styles from "./SliderControl.module.css"
import Slider from "../Slider"

function SliderControl({ label, value, ...delegated }: { label: string, value: number, [key: string]: any }) {
  const id = React.useId()

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <span className={styles.value}>{value}</span>
      </div>
      <Slider {...delegated} value={value} id={id} />
    </div>
  )
}

export default SliderControl
