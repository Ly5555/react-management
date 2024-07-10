/*
 * @Author: Lyq
 * @Date: 2023-11-16 22:28:43
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-07-10 20:35:57
 */

declare module "*.module.less" {
  const content: { [className: string]: string };
  export = content;
}

declare module 'react-slick';
declare module "qs";
declare module "js-md5";
declare module 'lodash'