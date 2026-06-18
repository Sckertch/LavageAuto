import api from '@/utils/axiosApi.ts'
import type { Produit } from '@/Entity/Produit.ts'

export const getProduits = async (): Promise<Produit[]> => {
  const response = await api.get<Produit[]>('/produits')
  return response.data
}
