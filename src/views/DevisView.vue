<script setup lang="ts">
import { useDevisForm } from '@/service/devisFormService'

const {
  form,
  errors,
  error,
  loading,
  succes,
  devisId,
  panierVide,
  panierStore,
  handleSubmit,
  router,
  pdfExpire,
  ouvrirPdf,
} = useDevisForm()
</script>
<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- ── Succès ── -->
      <div
        v-if="succes"
        class="bg-white rounded-xl shadow-sm border border-green-200 p-10 text-center"
      >
        <div class="text-5xl mb-4">✅</div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Devis généré avec succès !</h1>
        <p class="text-gray-500 mb-2">
          Votre devis n°<strong>{{ String(devisId).padStart(5, '0') }}</strong> a bien été créé.
        </p>

        <!-- Message si le PDF s'est bien ouvert -->
        <p v-if="!pdfExpire" class="text-green-600 text-sm mb-8">
          📄 Votre PDF s'est ouvert dans un nouvel onglet.
        </p>

        <!-- Fallback si popup bloqué ou erreur PDF -->
        <p v-else class="text-amber-600 text-sm mb-8">
          ⚠️ Votre devis a bien été créé mais le PDF n'a pas pu s'ouvrir automatiquement.<br />
          Vous le recevrez par e-mail à l'adresse indiquée.
        </p>

        <div class="flex justify-center gap-4">
          <button
            @click="router.push('/')"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retour à l'accueil
          </button>
          <button
            @click="router.push('/prestations')"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors"
          >
            Voir les prestations
          </button>
        </div>
      </div>

      <!-- ── Formulaire ── -->
      <template v-else>
        <div class="mb-8">
          <button
            @click="router.push('/panier')"
            class="text-gray-500 hover:text-gray-700 transition-colors text-sm mb-4 block"
          >
            ← Retour au panier
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Générer votre devis</h1>
          <p class="text-gray-500 mt-1">
            Renseignez vos coordonnées pour recevoir votre devis par e-mail.
          </p>
        </div>

        <!-- Panier vide -->
        <div
          v-if="panierVide"
          class="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400"
        >
          <div class="text-4xl mb-3">🛒</div>
          <p class="font-medium">Votre panier est vide.</p>
          <button
            @click="router.push('/prestations')"
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors text-sm"
          >
            Voir les prestations
          </button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-6">
          <!-- ── Récapitulatif du panier ── -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 class="font-semibold text-gray-800">Récapitulatif</h2>
              <span class="text-sm text-gray-400">{{ panierStore.itemTotaux }} article(s)</span>
            </div>
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th class="px-6 py-3 text-left">Désignation</th>
                  <th class="px-6 py-3 text-left">Type</th>
                  <th class="px-6 py-3 text-right">Qté</th>
                  <th class="px-6 py-3 text-right">Prix unit.</th>
                  <th class="px-6 py-3 text-right">Sous-total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in panierStore.itemsDuPanier"
                  :key="`${item.type}-${item.id}`"
                  class="border-t border-gray-100"
                >
                  <td class="px-6 py-3 font-medium text-gray-800">{{ item.nom }}</td>
                  <td class="px-6 py-3">
                    <span
                      class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                      :class="
                        item.type === 'prestation'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      "
                    >
                      {{ item.type === 'prestation' ? 'Prestation' : 'Produit' }}
                    </span>
                  </td>
                  <td class="px-6 py-3 text-right text-gray-600">{{ item.quantite }}</td>
                  <td class="px-6 py-3 text-right text-gray-600">{{ item.prix.toFixed(2) }} €</td>
                  <td class="px-6 py-3 text-right font-medium text-gray-800">
                    {{ (item.prix * item.quantite).toFixed(2) }} €
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Total -->
            <div class="px-6 py-4 border-t border-gray-100 flex justify-end">
              <div class="bg-blue-600 text-white px-6 py-3 rounded-lg text-right">
                <div class="text-xs uppercase tracking-wide opacity-80 mb-0.5">Total HT</div>
                <div class="text-xl font-bold">{{ panierStore.prixTotal.toFixed(2) }} €</div>
              </div>
            </div>
          </div>

          <!-- ── Infos client ── -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 class="font-semibold text-gray-800 mb-5">Vos coordonnées</h2>

            <div class="flex flex-col gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.client_nom"
                  type="text"
                  maxlength="60"
                  required
                  placeholder="Jean Dupont"
                  :class="[
                    'w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2',
                    errors.client_nom
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-400',
                  ]"
                />
                <p v-if="errors.client_nom" class="text-red-500 text-xs mt-1">
                  {{ errors.client_nom }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Adresse e-mail <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.client_email"
                  type="email"
                  maxlength="255"
                  required
                  placeholder="jean@exemple.fr"
                  :class="[
                    'w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2',
                    errors.client_email
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-400',
                  ]"
                />
                <p v-if="errors.client_email" class="text-red-500 text-xs mt-1">
                  {{ errors.client_email }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone <span class="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <input
                  v-model="form.client_telephone"
                  type="tel"
                  maxlength="17"
                  placeholder="06 12 34 56 78"
                  :class="[
                    'w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2',
                    errors.client_telephone
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-400',
                  ]"
                />
                <p v-if="errors.client_telephone" class="text-red-500 text-xs mt-1">
                  {{ errors.client_telephone }}
                </p>
              </div>
            </div>
          </div>

          <!-- Erreur globale -->
          <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

          <!-- Bouton submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-base transition-colors disabled:opacity-50"
          >
            {{ loading ? 'Génération en cours...' : '📄 Générer mon devis' }}
          </button>

          <p class="text-center text-xs text-gray-400">
            Le devis vous sera envoyé par e-mail à l'adresse indiquée.
          </p>
        </form>
      </template>
    </div>
  </div>
</template>
