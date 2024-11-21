import mongoose, { Schema, Document } from 'mongoose';

interface Todo extends Document {
  title: string;
  description: string;
  creationDate: BigInt;
  dueDate: BigInt;
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const todoSchema: Schema = new Schema<Todo>({
  title: { type: String, required: true },
  description: { type: String },
  creationDate: { type: BigInt, required: false },
  dueDate: { type: BigInt, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

todoSchema.set('toJSON', {
  transform: (doc, ret) => {
      Object.keys(ret).forEach((key) => {
          if (typeof ret[key] === 'bigint') {
              ret[key] = ret[key].toString();
          }
      });

      delete ret.user;
      delete ret.__v;
      return ret;
  },
});

const Todo = mongoose.model<Todo>('Todo', todoSchema);
export default Todo;