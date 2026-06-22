<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { usePrestationStore } from '@/stores/usePrestationStore'
import type { Prestation } from '@/Entity/Prestation'

const props = defineProps<{
  visible: boolean
  prestation: Prestation | null // null = mode ajout
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const prestationStore = usePrestationStore()
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

// Détermine le mode en fonction de la prop
const modeAjout = computed(() => props.prestation === null)

const form = reactive<Omit<Prestation, 'id'>>({
  nom: '',
  caracteristique: '',
  prix: 0,
  image: '',
})

// Prérempli les champs quand la modale s'ouvre
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      error.value = null
      if (props.prestation) {
        form.nom = props.prestation.nom
        form.caracteristique = props.prestation.caracteristique
        form.prix = props.prestation.prix
        form.image = props.prestation.image ?? ''
      } else {
        form.nom = ''
        form.caracteristique = ''
        form.prix = 0
        form.image = ''
      }
    }
  },
)

async function handleSubmit(): Promise<void> {
  loading.value = true
  error.value = null
  try {
    if (modeAjout.value) {
      await prestationStore.addPrestation({ ...form, image: form.image || undefined })
    } else {
      await prestationStore.editPrestation(props.prestation!.id, {
        ...form,
        image: form.image || undefined,
      })
    }
    emit('close')
  } catch {
    error.value = modeAjout.value ? "Erreur lors de l'ajout" : 'Erreur lors de la modification'
  } finally {
    loading.value = false
  }
}

async function handleSupprimer(): Promise<void> {
  if (!confirm(`Supprimer la prestation "${props.prestation?.nom}" ?`)) return
  loading.value = true
  error.value = null
  try {
    await prestationStore.removePrestation(props.prestation!.id)
    emit('close')
  } catch {
    error.value = 'Erreur lors de la suppression'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="emit('close')"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-8 mx-4">
        <!-- Titre dynamique -->
        <h2 class="text-xl font-bold text-gray-800 mb-6">
          {{ modeAjout ? 'Ajouter une prestation' : 'Modifier la prestation' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              v-model="form.nom"
              type="text"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Caractéristique</label>
            <textarea
              v-model="form.caracteristique"
              required
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
            <input
              v-model.number="form.prix"
              type="number"
              min="0"
              step="0.01"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Image (URL, optionnel)</label
            >
            <input
              v-model="form.image"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <img
              v-if="form.image"
              :src="form.image"
              alt="Aperçu"
              class="mt-2 w-full h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

          <!-- Boutons : layout différent selon le mode -->
          <div class="flex mt-2" :class="modeAjout ? 'justify-end gap-3' : 'justify-between gap-3'">
            <!-- Bouton supprimer uniquement en mode modification -->
            <button
              v-if="!modeAjout"
              type="button"
              @click="handleSupprimer"
              :disabled="loading"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              Supprimer
            </button>

            <div class="flex gap-3">
              <button
                type="button"
                @click="emit('close')"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {{ loading ? 'En cours...' : modeAjout ? 'Ajouter' : 'Modifier' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
