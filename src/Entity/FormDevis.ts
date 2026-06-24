import { reactive } from 'vue'

interface FormDevis {
  client_nom: string
  client_email: string
  client_telephone: string
}

type FormErrors = Partial<Record<keyof FormDevis, string>>

// Un seul endroit pour les champs
const form = reactive<FormDevis>({
  client_nom: '',
  client_email: '',
  client_telephone: '',
})

// errors utilise les mêmes clés, mais sans redéclarer les champs
const errors = reactive<FormErrors>({})
