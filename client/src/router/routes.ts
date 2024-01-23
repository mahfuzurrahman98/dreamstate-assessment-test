import Home from '../pages/Home';
import Login from '../pages/Login';


import { RouteType } from '../types';

const routes: RouteType[] = [
  { path: '/', element: Home, _protected: -1 },
  { path: '/login', element: Login, _protected: 0 }
];

export default routes;
