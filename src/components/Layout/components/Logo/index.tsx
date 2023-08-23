/*
 * @Author: liuyongqing
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-08-17 21:43:40
 * @FilePath: /个人/react-webpack-ts/src/components/Layout/components/Logo/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import logo from "@/assets/logo.svg"
import styles from "./logo.module.less"
const LayoutLogo = () => {
  return (
    <>
      <div className={styles.logo}>
        <div className={styles.logoBox}>
          <img src={logo} alt="没有找到照片" className={styles.logoImg} />
        </div>
      </div>
    </>
  )
}

export default LayoutLogo
