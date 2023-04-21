import { useEffect, useState } from "react";
const getList = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("query", query);
      resolve([6, 7, 8, 9, 10]);
    }, 3000);
  });
};
// 自定义 hook
const useApi = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [query, setQuery] = useState("");
  // 可以将参数设置在 useEffect 的第二个参数的数组值中，
  // 这样改变查询变量的时候，副作用便会再次触发执行，
  // 相应的函数也会重新带着最新的参数，获取接口数据。
  useEffect(() => {
    (async () => {
      const data = await getList();
      console.log("data", data);
      setData(data);
    })();
  }, [query]);

  return [{ data }, setQuery];
};

export default useApi;
