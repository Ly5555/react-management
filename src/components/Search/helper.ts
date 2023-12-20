import dayjs from "dayjs";

/**
 * @description isDayjs必须使用dayjs.isDayjs形式，否则打包会失败
 */

/**
 * dayjs数组类型转字符串类型
 * @param value - dayjs时间类型值
 */
export function dayjsRang2StringRang(value: any,) {
  if (!value) return undefined;
  if (value?.length > 1 && dayjs.isDayjs(value?.[0]) && dayjs.isDayjs(value?.[1])) {
    return [value[0].valueOf(), value[1].valueOf()];
  }
  return value;
}
/**
 * 将Dayjs转为字符串
 * @param obj - 检测对象
 * @param list - 列表值
 */
export function filterDayjs(obj: any, list: any): object {
  for (const key in obj) {
    // 判断是否是时间区间
    if (obj[key]?.length === 2 && dayjs.isDayjs(obj[key][0]) && dayjs.isDayjs(obj[key][1])) {
      obj[key] = dayjsRang2StringRang(obj[key]);
    }
  }

  return obj;
}
