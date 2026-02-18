export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  expiresAt: Date | string;
}
