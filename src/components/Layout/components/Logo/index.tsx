import React from 'react'
import logo from "@/assets/logo.svg"
import styles from "./css/logo.module.less"
const LayoutLogo = () => {
  return (
    <div>
       <div className='logo-box'>
      <img src={logo} alt="没有找到照片" className={styles.logoImg} /> 
    </div>
    </div>
  )
}

export default LayoutLogo
