// THIRD-PARTY
import { lazy } from 'react';

// PROJECT IMPORTS
import GuestGuard from 'utils/route-guard/GuestGuard';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';

const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/auth/Login')));
const AuthForgot = Loadable(lazy(() => import('views/pages/authentication/auth/Forgot')));

const LoginRoutes = {
  path: '/',
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout />
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/forgot',
      element: <AuthForgot />
    }
  ]
};

export default LoginRoutes;
