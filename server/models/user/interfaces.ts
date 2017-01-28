import * as mongoose from 'mongoose';

interface ICreateUser {
  email: string;
  password: string;
}

interface IUser extends mongoose.Document {
  id: string;
  username: string;
  local: {
    email: string,
    password: string
  };

  token: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivity: Date;
}

export {
  ICreateUser,
  IUser
}
