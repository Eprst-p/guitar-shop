export type CommentType = {
  id: string
  userName: string
  advantage: string
  disadvantage: string
  comment: string
  rating: number
  createAt: string
  guitarId: number
}

export type CommentsType = CommentType[];
