import api from '@/utils/axiosApi.ts'
import type { AuthResponse } from '@/Entity/AuthResponse.ts'
import type { InfoConnection } from '@/Entity/InfoConnection.ts'

export const login = async (identifiants: InfoConnection): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', identifiants)
  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post('/logout')
}
