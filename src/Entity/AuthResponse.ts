import type { Admin } from '@/Entity/Admin.ts'

export interface AuthResponse {
  access_token: string;
  user: Admin
}