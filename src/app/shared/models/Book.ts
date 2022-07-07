import {EMPTY_USER, User} from "./User";

export interface Book {
  id:number,
  title:string,
  author:string,
  publisher:string,
  details:string,
  listedByUser: User,
  adoptedByUser: User
}

export const EMPTY_BOOK:Book = {
  id: 0,
  title: "-",
  author: "-",
  publisher: "-",
  details: "-",
  listedByUser: EMPTY_USER,
  adoptedByUser: EMPTY_USER
}
