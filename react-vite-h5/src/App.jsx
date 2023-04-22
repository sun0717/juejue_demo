import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import { ConfigProvider } from 'zarm';
import 'zarm/dist/zarm.css';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';

import routes from '../src/router';
function App() {
  return <Router>
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
      <>
        <Routes>
          {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
        </Routes>
      </>
    </ConfigProvider>
   </Router>
}

export default App