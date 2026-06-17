export interface PanierItem {
  id: number
  type: 'produit' | 'prestation'
  label: string
  prix: number
  quantite: number
}
