// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Profile = Loadable(lazy(() => import('views/pages/account')));
const Admin = Loadable(lazy(() => import('views/pages/admin')));
const Hotel = Loadable(lazy(() => import('views/pages/hotel')));
const Room = Loadable(lazy(() => import('views/pages/room')));
const Booking = Loadable(lazy(() => import('views/pages/booking')));
const Transt = Loadable(lazy(() => import('views/pages/transt')));
const Uti = Loadable(lazy(() => import('views/pages/uti')));
const Comment = Loadable(lazy(() => import('views/pages/comment')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/user',
      element: <Admin />
    },
    {
      path: '/hotel',
      element: <Hotel />
    },
    {
      path: '/room',
      element: <Room />
    },
    {
      path: '/booking',
      element: <Booking />
    },
    {
      path: '/setting',
      element: <Profile />
    },
    {
      path: '/transt',
      element: <Transt />
    },
    {
      path: '/comment',
      element: <Comment />
    },
    {
      path: '/uti',
      element: <Uti />
    }
  ]
};

export default MainRoutes;
