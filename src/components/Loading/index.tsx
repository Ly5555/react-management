import { Spin } from "antd";
import React from "react";
import styles from "./index.module.less";

const Loading = () => {
	return (
		<div className={styles.request_loading}>
			<Spin size="large" />
		</div>
	);
};

export default Loading;
