// router/index.js
// import Index from '@/container/Index'
// import About from '@/container/About'
import Data from '@/container/Data';
import Home from '@/container/Home';
import User from '@/container/User';
import Login from '@/container/Login';
const routes = [
  {
    path: '/',
    component: Home
  },
  // {
  //   path: "/about",
  //   component: About
  // }
  {
    path: '/data',
    component: Data
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/Login',
    component: Login
  }
];

export default routes