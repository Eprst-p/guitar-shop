import { CommentsType } from './comment-type';

export type GuitarWithCommentsType = {
  id: number
  name: string
  vendorCode: string
  type: string
  description: string
  previewImg: string
  stringCount: number
  rating: number
  price: number
  comments: CommentsType
}

export type GuitarsWithCommentsType = GuitarWithCommentsType[];
