import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    googleTokens?: any;
    outlookTokens?: any;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleTokens: {
        type: Object
    },
    outlookTokens: {
        type: Object
    },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);
