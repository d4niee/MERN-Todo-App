import {Schema, model} from "mongoose";

export interface Todo extends Document {
    userId: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

const TodoSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

export default model<Todo>('Todo', TodoSchema);