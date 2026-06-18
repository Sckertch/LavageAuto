import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Prestation } from '@/Entity/Prestation.ts'
import { getPrestations } from '@/service/prestationService.ts'

export const usePrestationStore = defineStore('prestation', () => {
  const prestations = ref<Prestation[]>([])

  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchPrestations = async () => {
    loading.value = true
    error.value = null

    try {
      prestations.value = await getPrestations()
    } catch (err) {
      error.value = 'Erreur lors de la récupération des prestations'
    } finally {
      loading.value = false
    }
  }

  return { prestations, loading, error, fetchPrestations }
})