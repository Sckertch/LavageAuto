import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePanierStore } from '@/stores/usePanierStore'
import { createDevis } from '@/service/devisService'
import type { DevisPayload } from '@/Entity/Devis'
import axios from 'axios'

interface FormDevis {
  client_nom: string
  client_email: string
  client_telephone: string
}

type FormErrors = Partial<Record<keyof FormDevis, string>>

export function useDevisForm() {
  const router = useRouter()
  const panierStore = usePanierStore()

  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const succes = ref<boolean>(false)
  const devisId = ref<number | null>(null)
  const pdfExpire = ref<boolean>(false)

  const form = reactive<FormDevis>({
    client_nom: '',
    client_email: '',
    client_telephone: '',
  })

  const errors = reactive<FormErrors>({})

  const panierVide = computed(() => panierStore.itemsDuPanier.length === 0)

  function resetErrors(): void {
    Object.keys(errors).forEach((key) => {
      delete errors[key as keyof FormErrors]
    })
  }

  function nettoyerTelephone(telephone: string): string {
    return telephone.replace(/\s+/g, '')
  }

  function validerFormulaire(): boolean {
    resetErrors()
    let valide = true

    const nom = form.client_nom.trim()
    const email = form.client_email.trim()
    const telephone = nettoyerTelephone(form.client_telephone.trim())

    if (!nom) {
      errors.client_nom = 'Le nom complet est obligatoire.'
      valide = false
    } else if (nom.length > 100) {
      errors.client_nom = 'Le nom ne peut pas dépasser 100 caractères.'
      valide = false
    }

    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
    if (!email) {
      errors.client_email = "L'adresse e-mail est obligatoire."
      valide = false
    } else if (!emailRegex.test(email)) {
      errors.client_email = "L'adresse e-mail est invalide."
      valide = false
    }

    const telRegex = /^(\+33|0)[1-9](\d{2}){4}$/
    if (telephone && !telRegex.test(telephone)) {
      errors.client_telephone = 'Le numéro de téléphone est invalide.'
      valide = false
    }

    if (panierStore.itemsDuPanier.length === 0) {
      error.value = 'Votre panier est vide.'
      valide = false
    }

    for (const item of panierStore.itemsDuPanier) {
      const q = Number(item.quantite)
      if (!Number.isInteger(q) || q < 1 || q > 100) {
        error.value = `Quantité invalide pour "${item.nom}".`
        valide = false
        break
      }
    }

    return valide
  }

  async function ouvrirPdf(id: number): Promise<void> {
    pdfExpire.value = false
    const pdfUrl = `${import.meta.env.VITE_API_URL}/devis/${id}/pdf`

    try {
      const check = await fetch(pdfUrl, { method: 'HEAD' })

      if (check.status === 410) {
        pdfExpire.value = true
        error.value = 'Le lien PDF a expiré (5 minutes). Veuillez générer un nouveau devis.'
        return
      }

      if (!check.ok) {
        error.value = 'Impossible de récupérer le PDF. Veuillez réessayer.'
        return
      }

      window.open(pdfUrl, '_blank')
    } catch {
      error.value = "Une erreur réseau est survenue lors de l'ouverture du PDF."
    }
  }

  async function handleSubmit(): Promise<void> {
    if (panierVide.value || loading.value) return

    error.value = null
    pdfExpire.value = false

    if (!validerFormulaire()) return

    loading.value = true

    const payload: DevisPayload = {
      client_nom: form.client_nom.trim(),
      client_email: form.client_email.trim(),
      client_telephone: form.client_telephone.trim() || undefined,
      lignes: panierStore.itemsDuPanier.map((item) => ({
        type: item.type,
        id: Number(item.id),
        quantite: Number(item.quantite),
      })),
    }

    try {
      const response = await createDevis(payload)
      devisId.value = response.devis_id
      succes.value = true
      panierStore.viderPanier()
      resetErrors()
      await ouvrirPdf(response.devis_id)
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        const backErrors = err.response.data?.errors as Record<string, string[]>

        if (backErrors?.client_email) {
          errors.client_email = "L'adresse e-mail est invalide ou inconnue."
        }
        if (backErrors?.client_nom) {
          errors.client_nom = 'Le nom contient des caractères non autorisés.'
        }
        if (backErrors?.client_telephone) {
          errors.client_telephone = 'Le numéro de téléphone est invalide.'
        }
        if (backErrors?.lignes) {
          error.value = 'Un ou plusieurs articles de votre panier sont invalides.'
        }
        if (!Object.keys(errors).length && !error.value) {
          error.value = 'Certaines informations saisies sont incorrectes. Vérifiez le formulaire.'
        }
      } else if (axios.isAxiosError(err) && err.response?.status === 429) {
        error.value = "Vous avez généré trop de devis dans l'heure. Revenez plus tard."
      } else {
        error.value = 'Une erreur est survenue lors de la génération du devis. Veuillez réessayer.'
      }
    } finally {
      loading.value = false
    }
  }

  return {
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
  }
}
