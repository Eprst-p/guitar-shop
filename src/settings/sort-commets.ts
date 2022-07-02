import {CommentType} from '../types/comment-type';

const sortByNewerDate = (first:CommentType, second:CommentType) => {
  const firstDate = new Date(first.createAt);
  const secondDate = new Date(second.createAt);
  return +secondDate - +firstDate;
};

export {sortByNewerDate};
