import { name, datatype, random, lorem, image, date } from 'faker';
import { CommentType } from '../types/comment-type';
import { GuitarType } from '../types/guitar-type';
import { GuitarWithCommentsType } from '../types/guitar-with-comments-type';
import { ItemInCartType } from '../types/item-in-cart-type';

export const makeFakeComment = () => ({
  id: datatype.number(25),
  userName: name.firstName(),
  advantage: lorem.sentences(3),
  disadvantage: lorem.sentences(3),
  comment: lorem.sentences(7),
  rating: datatype.number(5),
  createAt: date.past().toString(),
  guitarId: datatype.number(25),
} as unknown as CommentType);

export const makeFakeComments = new Array(10).fill(null).map(() =>  makeFakeComment());

export const makeFakeGuitar = () => ({
  id: datatype.number(25),
  name: name.title(),
  vendorCode: lorem.word(10),
  type: random.word(),
  description: lorem.sentences(3),
  previewImg: image.imageUrl(),
  stringCount: datatype.number(10),
  rating: datatype.number(5),
  price: datatype.number(10000),
} as unknown as GuitarType);

export const makeFakeGuitars = new Array(27).fill(null).map(() =>  makeFakeGuitar());

export const makeFakeGuitarWithComment = () => ({
  id: datatype.number(100000000000),
  name: name.title(),
  vendorCode: lorem.word(10),
  type: random.word(),
  description: lorem.sentences(3),
  previewImg: image.imageUrl(),
  stringCount: datatype.number(10),
  rating: datatype.number(5),
  price: datatype.number(10000),
  comments: makeFakeComments,
} as unknown as GuitarWithCommentsType);

export const makeFakeGuitarsWithComments = new Array(27).fill(null).map(() =>  makeFakeGuitarWithComment());

export const makeGuitarIdiesFromMocks = () => {
  const guitarIdies = [];
  for (let i = 0; i < 10; i++) {
    guitarIdies.push(makeFakeGuitarsWithComments[i].id);
  }
  return guitarIdies;
};

export const makeItemsInCartFromMocks = () => {
  const itemsInCart:ItemInCartType[] = [];
  for (let i = 0; i < 10; i++) {
    const item = {
      id: makeFakeGuitarsWithComments[i].id,
      quantity: datatype.number(5),
    };
    itemsInCart.push(item);
  }
  return itemsInCart;
};

export const makeItemInCart = () => ({
  id: datatype.number(100000000000),
  quantity: datatype.number(99),
} as unknown as ItemInCartType);

