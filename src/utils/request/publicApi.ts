import axios from './request'; // 导入http中创建的axios实例
// import { HeaderConfigListParam } from "@/utils/errorCode"

/**
 * @param status 状态类型
 * @param name 名字
 */
export interface statusDataProps {
    status: '1' | '2';
    name: string;
}

/**
 * @method 获取状态数据api
 */
export const status = () => {
    return axios<never, statusDataProps[]>({
        url: `/status`,
        method: 'get'
    });
};

/**
 * @method 获取表头配置
 */
export const headerConfig = () => {
    return axios<never, any[]>({
        url: `/getHeader`,
        method: 'get'
    });
};
