import api from '@/utils/axiosApi.ts'
import type { Produit } from '@/Entity/Produit.ts'

export const getProduits = async (): Promise<Produit[]> => {
  const response = await api.get<Produit[]>('/produits')
  return response.data
}

export const createProduit = async (data: Omit<Produit, 'id'>): Promise<Produit> => {
  const response = await api.post<Produit>('/produits', data)
  return response.data
}

export const updateProduit = async (
  id: number,
  data: Omit<Produit, 'id'>,
): Promise<Produit> => {
  const response = await api.put<Produit>(`/produits/${id}`, data)
  return response.data
}

export const deleteProduit = async (id: number): Promise<void> => {
  await api.delete(`/produits/${id}`)
}
