import mongoose, { Document, Schema } from 'mongoose';

export interface IEmail extends Document {
    userId: string;
    sender: string;
    subject: string;
    body: string;
    category: string;
}

const EmailSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Email = mongoose.model<IEmail>('Email', EmailSchema);
