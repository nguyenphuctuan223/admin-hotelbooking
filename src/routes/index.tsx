// THIRD-PARTY
import { useRoutes } from 'react-router-dom';

// PROJECT IMPORTS
import MainRoutes from 'routes/MainRoutes';
import LoginRoutes from 'routes/LoginRoutes';
import AuthenticationRoutes from 'routes/AuthenticationRoutes';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, LoginRoutes, AuthenticationRoutes]);
}
