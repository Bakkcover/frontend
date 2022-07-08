export class SearchBookQueryBuilder {
  private queryString = "?q=";

  private readonly TITLE_KEY:string = "intitle:";
  private readonly AUTHOR_KEY:string = "inauthor:";
  private readonly PUBLISHER_KEY:string = "inpublisher:";
  private readonly SUBJECT_KEY:string = "subject:";
  private readonly ISBN_KEY:string = "isbn:";

  private readonly GOOGLE_BOOKS_APIKEY:string = "&key=AIzaSyD6M6d_2o_8cwFJ7cJdihEB0ss1SoUaIEo";

  private queryParams:string[] = [];

  constructer() {}

  public addTitle(title:string): void {
    this.queryParams.push(this.TITLE_KEY.concat(this.replaceSpaceWithPlus(title)));
  }

  public addAuthor(author:string): void {
    this.queryParams.push(this.AUTHOR_KEY.concat(this.replaceSpaceWithPlus(author)));
  }

  public addPublisher(publisher:string): void {
    this.queryParams.push(this.PUBLISHER_KEY.concat(this.replaceSpaceWithPlus(publisher)));
  }

  public addSubject(subject:string): void {
    this.queryParams.push(this.SUBJECT_KEY.concat(this.replaceSpaceWithPlus(subject)));
  }

  public addIsbn(isbn:string): void {
    this.queryParams.push(this.ISBN_KEY.concat(isbn));
  }

  public getQuery(): string {
    let joinedQueryParams:string = this.queryParams.join("+");

    console.log(joinedQueryParams);

    return this.queryString
      .concat(joinedQueryParams)
      .concat(this.GOOGLE_BOOKS_APIKEY);
  }

  private replaceSpaceWithPlus(input:string): string {
    return input.trim().replace(/ /g, '+');
  }
}
