import {Schema, model} from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    salt?: string;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    }
});

export default model<IUser>('User', userSchema);
