export interface ChildrenProps {
  children: React.ReactNode;
}

export interface AuthState {
  accessToken: string | null;
}

export interface UserCredentials {
  email: string;
  password: string;
  role: "ADMIN";
}

export interface StoredUserCredentials {
  email: string;
  accessToken: string;
}

export interface AuthContextProps {
  user: StoredUserCredentials | null;
  login: (data: UserCredentials) => Promise<void>;
  logout: () => Promise<void>;
  auth: any;
  setAuth: React.Dispatch<any>;
}
