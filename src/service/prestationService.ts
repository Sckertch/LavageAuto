import api from '@/utils/axiosApi.ts'
import type { Prestation } from '@/Entity/Prestation.ts'

export const getPrestations = async (): Promise<Prestation[]> => {
  const response = await api.get<Prestation[]>('/prestations')
  return response.data
}
