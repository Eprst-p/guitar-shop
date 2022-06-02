export type GuitarType = {
  id: number
  name: string
  vendorCode: string
  type: string
  description: string
  previewImg: string
  stringCount: number
  rating: number
  price: number
}

export type GuitarsType = GuitarType[];
