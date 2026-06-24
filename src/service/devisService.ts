// src/service/devisService.ts
import api from '@/utils/axiosApi'
import type { Devis, DevisPayload, DevisResponse, DevisStatut } from '@/Entity/Devis'

export const createDevis = async (payload: DevisPayload): Promise<DevisResponse> => {
  const response = await api.post<DevisResponse>('/devis', payload)
  return response.data
}

// ── Admin ──
export const getDevis = async (): Promise<Devis[]> => {
  const response = await api.get<Devis[]>('/devis')
  return response.data
}

export const getDevisById = async (id: number): Promise<Devis> => {
  const response = await api.get<Devis>(`/devis/${id}`)
  return response.data
}

export const updateStatutDevis = async (id: number, statut: DevisStatut): Promise<Devis> => {
  const response = await api.patch<Devis>(`/devis/${id}/statut`, { statut })
  return response.data
}

export const downloadDevisPdf = async (id: number): Promise<Blob> => {
  const response = await api.get(`/devis/${id}/download`, {
    responseType: 'blob',
  })
  return response.data
}
