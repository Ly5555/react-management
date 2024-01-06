/*
 * @Author: Lyq
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: Lyq
 * @LastEditTime: 2023-12-06 21:20:03
 */

declare module "*.module.less" {
  const content: { [className: string]: string };
  export = content;
}

declare module 'react-slick';
declare module "qs";
declare module "js-md5";
declare module 'driver.js';