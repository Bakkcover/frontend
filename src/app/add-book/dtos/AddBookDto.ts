import {Book} from "../../shared/models/Book";
import {Nullable} from "../../shared/types/Nullable";

export type AddBookDto = Nullable<Omit<Book, "listedByUser">>;

export const DEFAULT_ADD_BOOK_DTO:AddBookDto = {
  title: "",
  author: null,
  publisher: null,
  details: null
};
