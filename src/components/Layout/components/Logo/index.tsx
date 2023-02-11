import React from 'react'
import logo from "@/assets/logo.svg"
import styles from "./css/logo.module.less"
const LayoutLogo = () => {
  return (
    <div className={styles.logo}>
       <div className={styles.logoBox}>
      <img src={logo} alt="没有找到照片" className={styles.logoImg} /> 
    </div>
    </div>
  )
}

export default LayoutLogo
