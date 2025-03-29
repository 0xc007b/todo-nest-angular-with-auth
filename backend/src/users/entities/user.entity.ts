export class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
