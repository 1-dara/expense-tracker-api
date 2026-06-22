import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
    title: string;
    amount: number;
    category: string;
    description?: string;
    date: Date;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: ['food', 'transport', 'housing', 'health', 'entertainment', 'shopping', 'other']
    },
    description: { type: String },
    date: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
