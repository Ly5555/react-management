import React from "react";
import { Spin } from "antd";
import styles from "./index.module.less";


const Loading = ({ tip = "Loading" }: { tip?: string }) => {
	return <Spin tip={tip} size="large" className={styles.request_loading} />;
};

export default Loading;
