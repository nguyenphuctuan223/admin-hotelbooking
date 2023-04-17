export interface LoginState {
  data: Login;
  error: object | string | null;
}

export type Login = {
  email?: string;
  password?: string;
};

export interface Payload {
  params?: any;
  callback?: (response: any) => void;
}
