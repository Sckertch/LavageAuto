export interface DevisLignePayload {
  type: 'prestation' | 'produit'
  id: number
  quantite: number
}

export interface DevisPayload {
  client_nom: string
  client_email: string
  client_telephone?: string
  lignes: DevisLignePayload[]
}

export interface DevisResponse {
  message: string
  devis_id: number
  fichier: string
}

// ── Modèles retournés par l'API admin ──
export interface DevisLigne {
  id: number
  devis_id: number
  type: 'prestation' | 'produit'
  reference_id: number
  nom: string
  prix_unitaire: number
  quantite: number
  sous_total: number
}

export type DevisStatut = 'en_attente' | 'accepte' | 'refuse'

export interface Devis {
  id: number
  client_nom: string
  client_email: string
  client_telephone: string | null
  total_ht: number
  statut: DevisStatut
  fichier_path: string | null
  created_at: string
  updated_at: string
  lignes: DevisLigne[]
}