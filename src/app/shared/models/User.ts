export interface User {
  sub:string,
  username:string,
  email:string,
  firstName?:string,
  lastName?:string
}

export const EMPTY_USER:User = {
  sub: "No sub",
  username: "No username",
  email: "No email",
  firstName: "No first name",
  lastName: "No last name"
}
