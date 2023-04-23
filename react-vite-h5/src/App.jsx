import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";

import NavBar from '@/components/NavBar';
import { ConfigProvider } from 'zarm';
import 'zarm/dist/zarm.css';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';

import routes from '@/router';
function App() {
  const location = useLocation(); // 拿到 location 实例
  const { pathname } = location; // 获取当前路径
  const needNav = ['/', '/data', '/user']; // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]); // [] 内的参数若是变化，便会执行上述回调函数
  // 点击相应的 Tab，调用的 navigateTo 方法，将地址栏的 pathname 改变，随之而来的是页面组件的改变。
  return <>
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
      <>
        <Routes>
          {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
        </Routes>
        <NavBar showNav={ showNav }/>
      </>
    </ConfigProvider>
    <NavBar showNav={ true } />
    </>
}

export default App