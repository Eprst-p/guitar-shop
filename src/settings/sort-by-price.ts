import { GuitarWithCommentsType } from '../types/guitar-with-comments-type';

const sortByPrice = (first:GuitarWithCommentsType, second:GuitarWithCommentsType) => {
  const firstPrice = first.price;
  const secondPrice = second.price;
  return firstPrice - secondPrice;
};

export {sortByPrice};
