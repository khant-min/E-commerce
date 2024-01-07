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

export interface DataContextProps {
  user: UserCredentials | null;
  login: (data: UserCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
