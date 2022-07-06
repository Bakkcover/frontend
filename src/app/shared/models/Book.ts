import {EMPTY_USER, User} from "./User";

export interface Book {
  title:string,
  author:string,
  publisher:string,
  details:string,
  listedByUser: User
}

export const EMPTY_BOOK:Book = {
  title: "-",
  author: "-",
  publisher: "-",
  details: "-",
  listedByUser: EMPTY_USER
}
