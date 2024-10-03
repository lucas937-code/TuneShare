export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: number;
}

interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
   user: User;
   session: Session;
   messageEn: string;
   messageDe: string;
}
