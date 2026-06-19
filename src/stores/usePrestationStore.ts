import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Prestation } from '@/Entity/Prestation.ts'
import {
  getPrestations,
  createPrestation,
  updatePrestation,
  deletePrestation,
} from '@/service/prestationService.ts'

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

  async function addPrestation(data: Omit<Prestation, 'id'>): Promise<void> {
    const nouvelle = await createPrestation(data)
    prestations.value.push(nouvelle)
  }

  async function editPrestation(id: number, data: Omit<Prestation, 'id'>): Promise<void> {
    const modifiee = await updatePrestation(id, data)
    const index = prestations.value.findIndex((p) => p.id === id)
    if (index !== -1) prestations.value[index] = modifiee
  }

  async function removePrestation(id: number): Promise<void> {
    await deletePrestation(id)
    prestations.value = prestations.value.filter((p) => p.id !== id)
  }

  return {
    prestations,
    loading,
    error,
    fetchPrestations,
    addPrestation,
    editPrestation,
    removePrestation,
  }
})