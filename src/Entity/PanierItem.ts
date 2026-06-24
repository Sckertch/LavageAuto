export interface PanierItem {
  id: string
  type: 'produit' | 'prestation'
  nom: string
  prix: number
  quantite: number
}
