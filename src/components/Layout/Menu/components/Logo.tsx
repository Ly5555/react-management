import React from 'react'

import logo from "@/assets/logo.svg"
import styles from "../../css/logo.module.less"

const Logo = () => {
  return (
    <div className='logo-box'>
      <img src={logo} alt="没有找到照片" className={styles.logoImg} /> 
    </div>
  )
}

export default Logo
