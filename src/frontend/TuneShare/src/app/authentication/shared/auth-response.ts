export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
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
