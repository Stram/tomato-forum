interface IUser {
  id?: number;
  username?: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastActivity?: Date;
}

export {
  IUser
}
