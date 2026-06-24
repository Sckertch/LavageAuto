import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Devis, DevisStatut } from '@/Entity/Devis'
import { getDevis, updateStatutDevis, downloadDevisPdf } from '@/service/devisService'

export const useDevisStore = defineStore('devis', () => {
  const devis = ref<Devis[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function fetchDevis(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      devis.value = await getDevis()
    } catch {
      error.value = 'Erreur lors de la récupération des devis'
    } finally {
      loading.value = false
    }
  }

  async function changerStatut(id: number, statut: DevisStatut): Promise<void> {
    const mis_a_jour = await updateStatutDevis(id, statut)
    const index = devis.value.findIndex((d) => d.id === id)
    if (index !== -1) devis.value[index] = mis_a_jour
  }

  async function telechargerPdf(id: number): Promise<void> {
    const blob = await downloadDevisPdf(id)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `devis-${String(id).padStart(5, '0')}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return { devis, loading, error, fetchDevis, changerStatut, telechargerPdf }
})
