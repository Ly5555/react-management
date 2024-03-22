/*
 * @Author: Lyq
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-21 21:26:13
 */

declare module "*.module.less" {
  const content: { [className: string]: string };
  export = content;
}

declare module 'react-slick';
declare module "qs";
declare module "js-md5";
declare module 'driver.js';
declare module 'lodash'