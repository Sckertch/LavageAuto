<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDevisStore } from '@/stores/useDevisStore'
import type { Devis, DevisStatut } from '@/Entity/Devis'

const router = useRouter()
const devisStore = useDevisStore()

// ── Détail / drawer ──
const devisSelectionne = ref<Devis | null>(null)
const loadingAction = ref<boolean>(false)
const errorAction = ref<string | null>(null)

function ouvrirDetail(d: Devis): void {
  devisSelectionne.value = d
  errorAction.value = null
}

function fermerDetail(): void {
  devisSelectionne.value = null
}

async function handleStatut(statut: DevisStatut): Promise<void> {
  if (!devisSelectionne.value) return
  loadingAction.value = true
  errorAction.value = null
  try {
    await devisStore.changerStatut(devisSelectionne.value.id, statut)
    // Met à jour la ref locale aussi
    devisSelectionne.value =
      devisStore.devis.find((d) => d.id === devisSelectionne.value!.id) ?? null
  } catch {
    errorAction.value = 'Erreur lors du changement de statut'
  } finally {
    loadingAction.value = false
  }
}

async function handleTelechargement(id: number): Promise<void> {
  loadingAction.value = true
  errorAction.value = null
  try {
    await devisStore.telechargerPdf(id)
  } catch {
    errorAction.value = 'Erreur lors du téléchargement du PDF'
  } finally {
    loadingAction.value = false
  }
}

// ── Helpers UI ──
const statutLabel: Record<DevisStatut, string> = {
  en_attente: 'En attente',
  accepte: 'Accepté',
  refuse: 'Refusé',
}

const statutClasses: Record<DevisStatut, string> = {
  en_attente: 'bg-yellow-100 text-yellow-800',
  accepte: 'bg-green-100  text-green-800',
  refuse: 'bg-red-100    text-red-800',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

onMounted(async () => {
  await devisStore.fetchDevis()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-10">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button
          @click="router.push('/admin/dashboard')"
          class="text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Retour
        </button>
        <h1 class="text-3xl font-bold text-gray-800">Gestion des Devis</h1>
      </div>

      <p v-if="devisStore.loading" class="text-gray-500">Chargement...</p>
      <p v-else-if="devisStore.error" class="text-red-500">{{ devisStore.error }}</p>

      <!-- Tableau -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-4 py-3">N° Devis</th>
              <th class="px-4 py-3">Client</th>
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Date</th>
              <th class="px-4 py-3 text-right">Total HT</th>
              <th class="px-4 py-3 text-center">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="d in devisStore.devis"
              :key="d.id"
              @click="ouvrirDetail(d)"
              class="border-t border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
              title="Cliquer pour voir le détail"
            >
              <td class="px-4 py-4 font-mono font-medium text-gray-800">
                #{{ String(d.id).padStart(5, '0') }}
              </td>
              <td class="px-4 py-4 font-medium text-gray-800">{{ d.client_nom }}</td>
              <td class="px-4 py-4 text-gray-500">{{ d.client_email }}</td>
              <td class="px-4 py-4 text-gray-500">{{ formatDate(d.created_at) }}</td>
              <td class="px-4 py-4 text-right font-medium text-gray-800">
                {{ Number(d.total_ht).toFixed(2) }} €
              </td>
              <td class="px-4 py-4 text-center">
                <span
                  class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                  :class="statutClasses[d.statut]"
                >
                  {{ statutLabel[d.statut] }}
                </span>
              </td>
            </tr>
            <tr v-if="devisStore.devis.length === 0">
              <td colspan="6" class="px-6 py-10 text-center text-gray-400">
                Aucun devis pour le moment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ── Drawer de détail ── -->
  <Teleport to="body">
    <div
      v-if="devisSelectionne"
      class="fixed inset-0 z-50 flex justify-end bg-black/40"
      @click.self="fermerDetail"
    >
      <div class="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl flex flex-col">
        <!-- Header drawer -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 class="text-lg font-bold text-gray-800">
              Devis #{{ String(devisSelectionne.id).padStart(5, '0') }}
            </h2>
            <p class="text-xs text-gray-400 mt-0.5">
              {{ formatDate(devisSelectionne.created_at) }}
            </p>
          </div>
          <button
            @click="fermerDetail"
            class="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div class="px-6 py-5 flex flex-col gap-6 flex-1">
          <!-- Infos client -->
          <div>
            <p class="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Client</p>
            <div class="bg-gray-50 rounded-lg border border-gray-200 p-4 flex flex-col gap-1">
              <p class="font-semibold text-gray-800">{{ devisSelectionne.client_nom }}</p>
              <p class="text-sm text-gray-500">{{ devisSelectionne.client_email }}</p>
              <p v-if="devisSelectionne.client_telephone" class="text-sm text-gray-500">
                {{ devisSelectionne.client_telephone }}
              </p>
            </div>
          </div>

          <!-- Lignes du devis -->
          <div>
            <p class="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Lignes</p>
            <div class="rounded-lg border border-gray-200 overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-gray-100 text-gray-500 text-xs uppercase">
                  <tr>
                    <th class="px-4 py-2 text-left">Désignation</th>
                    <th class="px-4 py-2 text-right">Qté</th>
                    <th class="px-4 py-2 text-right">P.U.</th>
                    <th class="px-4 py-2 text-right">S-Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="ligne in devisSelectionne.lignes"
                    :key="ligne.id"
                    class="border-t border-gray-100"
                  >
                    <td class="px-4 py-2">
                      <span
                        class="inline-block px-1.5 py-0.5 rounded text-xs font-semibold mr-1"
                        :class="
                          ligne.type === 'prestation'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        "
                      >
                        {{ ligne.type === 'prestation' ? 'P' : 'Pr' }}
                      </span>
                      {{ ligne.nom }}
                    </td>
                    <td class="px-4 py-2 text-right text-gray-600">{{ ligne.quantite }}</td>
                    <td class="px-4 py-2 text-right text-gray-600">
                      {{ Number(ligne.prix_unitaire).toFixed(2) }} €
                    </td>
                    <td class="px-4 py-2 text-right font-medium text-gray-800">
                      {{ Number(ligne.sous_total).toFixed(2) }} €
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Total -->
              <div
                class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center"
              >
                <span class="text-sm font-semibold text-gray-700">Total HT</span>
                <span class="font-bold text-gray-900">
                  {{ Number(devisSelectionne.total_ht).toFixed(2) }} €
                </span>
              </div>
            </div>
          </div>

          <!-- Statut actuel + changement -->
          <div>
            <p class="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Statut</p>
            <div class="flex items-center gap-3 flex-wrap">
              <span
                class="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                :class="statutClasses[devisSelectionne.statut]"
              >
                {{ statutLabel[devisSelectionne.statut] }}
              </span>
              <button
                v-if="devisSelectionne.statut !== 'accepte'"
                @click="handleStatut('accepte')"
                :disabled="loadingAction"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                ✓ Accepter
              </button>
              <button
                v-if="devisSelectionne.statut !== 'refuse'"
                @click="handleStatut('refuse')"
                :disabled="loadingAction"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                ✗ Refuser
              </button>
              <button
                v-if="devisSelectionne.statut !== 'en_attente'"
                @click="handleStatut('en_attente')"
                :disabled="loadingAction"
                class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                ↺ En attente
              </button>
            </div>
            <p v-if="errorAction" class="text-red-500 text-sm mt-2">{{ errorAction }}</p>
          </div>
        </div>

        <!-- Footer drawer : télécharger le PDF -->
        <div class="px-6 py-4 border-t border-gray-100">
          <button
            @click="handleTelechargement(devisSelectionne.id)"
            :disabled="!devisSelectionne.fichier_path || loadingAction"
            class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors disabled:opacity-40 font-medium"
          >
            📄 Télécharger le PDF
          </button>
          <p v-if="!devisSelectionne.fichier_path" class="text-center text-xs text-gray-400 mt-2">
            PDF non disponible pour ce devis
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
