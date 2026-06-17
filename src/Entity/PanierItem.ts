export interface PanierItem {
  id: string
  type: 'produit' | 'prestation'
  label: string
  prix: number
  quantite: number
}
