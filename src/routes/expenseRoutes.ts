import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense,
    getSummary
} from '../controllers/expenseController.js';

const router = express.Router();

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses for logged in user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [food, transport, housing, health, entertainment, shopping, other]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of expenses with total
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, getExpenses);

/**
 * @swagger
 * /api/expenses/summary:
 *   get:
 *     summary: Get spending summary grouped by category
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary grouped by category
 *       401:
 *         description: Unauthorized
 */
router.get('/summary', authenticateToken, getSummary);

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Lunch
 *               amount:
 *                 type: number
 *                 example: 2500
 *               category:
 *                 type: string
 *                 enum: [food, transport, housing, health, entertainment, shopping, other]
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, createExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get a single expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense details
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticateToken, getExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, updateExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, deleteExpense);

export default router;
