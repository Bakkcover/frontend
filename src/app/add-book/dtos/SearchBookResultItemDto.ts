import {Book} from "../../shared/models/Book";

type SelectedAttributesFromBook = Omit<Book, ("id" | "listedByUser" | "adoptedByUser")>;
type AdditionalAttributes = {
  thumbnail?:string
}

export type SearchBookResultItemDto = SelectedAttributesFromBook & AdditionalAttributes;
