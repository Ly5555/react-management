/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-10 19:59:01
 */

import React from "react";
import { Spin } from "antd";
import styles from "./index.module.less";

const Loading = () => {
	return (
		<div className={styles.request_loading}>
			<Spin size="large" />
		</div>
	);
};

export default Loading;
