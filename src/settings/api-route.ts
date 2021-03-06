export enum ApiRoute {
  Guitars = '/guitars?_limit=27',
  GuitarsWithComments = '/guitars?_embed=comments',
  Guitar = '/guitars/:id',
  CommentsByID = '/guitars/:id/comments',
  CommentsByIdEmbed = '/guitars/:id?_embed=comments',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}
