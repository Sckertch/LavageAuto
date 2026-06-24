export interface Admin {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  access_token: string;
  user: Admin
}
