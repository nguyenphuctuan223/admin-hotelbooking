// PROJECT IMPORTS
import { ConfigProps } from 'types/config';

export const JWT_API = {
  secret: '',
  timeout: ''
};

export const BASE_PATH = '';

export const DASHBOARD_PATH = '/dashboard';

const config: ConfigProps = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: 'light',
  presetColor: 'default',
  locale: 'en',
  rtlLayout: false,
  container: false
};

export default config;
