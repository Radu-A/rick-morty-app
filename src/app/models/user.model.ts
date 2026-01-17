export interface UserModel {
  id: number;
  email: string;
  password: string;
}

export interface UserState {
  connected: boolean;
  message: string;
}
