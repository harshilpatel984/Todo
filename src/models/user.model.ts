import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  creationDate: BigInt;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: BigInt, required: false },
});

const User = mongoose.model<User>('User', userSchema);

export default User;
