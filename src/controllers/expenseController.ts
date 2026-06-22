import { Response } from 'express';
import dotenv from 'dotenv';
import Expense from '../models/Expense.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

dotenv.config();

// CREATE EXPENSE
export async function createExpense(req: AuthRequest, res: Response): Promise<void> {
    try {
        const { title, amount, category, description, date } = req.body;

        const expense = await Expense.create({
            title,
            amount,
            category,
            description,
            date: date ? new Date(date) : new Date(),
            userId: req.userId
        });

        res.status(201).json(expense);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET ALL EXPENSES
export async function getExpenses(req: AuthRequest, res: Response): Promise<void> {
    try {
        const { category, startDate, endDate } = req.query;

        const filter: any = { userId: req.userId };
        if (category) filter.category = category;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate as string);
            if (endDate) filter.date.$lte = new Date(endDate as string);
        }

        const expenses = await Expense.find(filter).sort({ date: -1 });

        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        res.json({ total, count: expenses.length, expenses });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET SINGLE EXPENSE
export async function getExpense(req: AuthRequest, res: Response): Promise<void> {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!expense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }

        res.json(expense);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// UPDATE EXPENSE
export async function updateExpense(req: AuthRequest, res: Response): Promise<void> {
    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!expense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }

        res.json(expense);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE EXPENSE
export async function deleteExpense(req: AuthRequest, res: Response): Promise<void> {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!expense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }

        res.json({ message: 'Expense deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET SUMMARY BY CATEGORY
export async function getSummary(req: AuthRequest, res: Response): Promise<void> {
    try {
        const summary = await Expense.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
            { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
            { $sort: { total: -1 } }
        ]);

        res.json(summary);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}