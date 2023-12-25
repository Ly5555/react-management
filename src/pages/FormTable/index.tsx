import React, { useCallback, useEffect, useRef, useState } from "react";
import { searchList } from "./model";

import BasicSearch from "@/components/Search/BasicSearch";
import { ApiAllSelect } from "@/components/Select";
// 初始化搜索
const initSearch = {
  pay_date: [1703166192025, 1703338992025],
};
const Index = () => {
  const [isLoading, setLoading] = useState(false);
  const handleSearch = useCallback(async (values: any) => {
    // 数据转换
    const query = { ...values };
    console.log(query, "我是请求参数");
    try {
      setLoading(true);
      // await getDataTrends(query);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    handleSearch(initSearch);
  }, [handleSearch]);
  return (
    <div>
      <BasicSearch list={searchList} data={initSearch} isLoading={isLoading} handleFinish={handleSearch} />
    </div>
  );
};

export default Index;
