<template>
  <footer class="bg-deep-navy text-white">

    <!-- Section principale -->
    <div class="bg-steel-blue px-6 py-10 grid gap-8 md:grid-cols-4 items-start">

      <!-- Réseaux sociaux -->
      <div>
        <h2 class="text-neon-ice text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          Nos réseaux
        </h2>
        <ul class="flex flex-col gap-2">
          <li v-for="reseau in reseaux" :key="reseau.name">
            <a
              :href="reseau.path"
              class="text-footer-muted hover:text-frozen-water transition-colors duration-300 text-sm"
            >
              {{ reseau.name }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Liens utiles -->
      <div>
        <h2 class="text-neon-ice text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          Liens utiles
        </h2>
        <ul class="flex flex-col gap-2">
          <li v-for="lien in liensUtiles" :key="lien.name">
            <a
              :href="lien.path"
              class="text-footer-muted hover:text-frozen-water transition-colors duration-300 text-sm"
            >
              {{ lien.name }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Logo aligné à droite sur les 2 dernières colonnes -->
      <div class="flex justify-end items-start col-span-2">
        <img src="https://picsum.photos/100/50" alt="Logo du site" class="rounded-md opacity-90" />
      </div>

    </div>

    <!-- Séparateur dégradé -->
    <div class="w-full h-px bg-linear-to-r from-transparent via-neon-ice to-transparent opacity-30"></div>

    <!-- Bande copyright -->
    <div class="px-6 py-4 flex justify-center items-center">
      <span class="text-footer-muted text-xs tracking-widest">
        &copy; 2026 Lavage auto.fr — Tous droits réservés.
      </span>
    </div>

  </footer>
</template>

<script setup>
const reseaux = [
  { name: 'Instagram', path: '/' },
  { name: 'Tiktok', path: '/' }
]

const liensUtiles = [
  { name: 'Nous contacter', path: '/' },
  { name: 'Mentions légales', path: '/' },
  { name: 'Politiques de confidentialité', path: '/' }
]
</script>