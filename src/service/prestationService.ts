import api from '@/utils/axiosApi'
import type { Prestation } from '@/Entity/Prestation'

export const getPrestations = async (): Promise<Prestation[]> => {
  const response = await api.get<Prestation[]>('/prestations')
  return response.data
}

export const createPrestation = async (data: Omit<Prestation, 'id'>): Promise<Prestation> => {
  const response = await api.post<Prestation>('/prestations', data)
  return response.data
}

export const updatePrestation = async (
  id: number,
  data: Omit<Prestation, 'id'>,
): Promise<Prestation> => {
  const response = await api.put<Prestation>(`/prestations/${id}`, data)
  return response.data
}

export const deletePrestation = async (id: number): Promise<void> => {
  await api.delete(`/prestations/${id}`)
}
