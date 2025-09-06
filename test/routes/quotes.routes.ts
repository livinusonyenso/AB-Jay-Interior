import { Router } from 'express';
import {
  createQuote,
  getQuotes,
  getQuote,
  updateQuoteStatus,
} from '../controllers/quotes.controller';
import { validateBody, validateQuery } from '../middlewares/validation.middleware';
import { authenticateAdmin } from '../middlewares/auth.middleware';
import { createQuoteSchema, quoteQuerySchema } from '../validators/quote.validator';

const router = Router();

/**
 * @route POST /api/quotes
 * @desc Submit quote request
 * @access Public
 */
router.post('/', validateBody(createQuoteSchema), createQuote);

/**
 * @route GET /api/quotes
 * @desc Get all quotes (admin only)
 * @access Private (Admin)
 */
router.get('/', authenticateAdmin, validateQuery(quoteQuerySchema), getQuotes);

/**
 * @route GET /api/quotes/:id
 * @desc Get quote by ID (admin only)
 * @access Private (Admin)
 */
router.get('/:id', authenticateAdmin, getQuote);

/**
 * @route PUT /api/quotes/:id/status
 * @desc Update quote status (admin only)
 * @access Private (Admin)
 */
router.put('/:id/status', authenticateAdmin, updateQuoteStatus);

export default router;