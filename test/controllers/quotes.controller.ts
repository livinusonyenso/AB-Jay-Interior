import { Request, Response, NextFunction } from 'express';
import { Quote } from '../models/Quote';
import { mailService } from '../services/mail.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export async function createQuote(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const quoteData = req.body;

    // Create quote in database
    const quote = new Quote(quoteData);
    await quote.save();

    // Send emails in parallel
    await Promise.all([
      mailService.sendQuoteNotificationToAdmin(quoteData),
      // mailService.sendQuoteConfirmationToUser(quoteData),
    ]);

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully. We\'ll be in touch soon!',
      quoteId: quote._id,
    });
  } catch (error) {
    // If email fails, still return success since quote was saved
    if (error instanceof Error && error.message.includes('email')) {
      console.error('Email sending failed:', error);
      res.status(201).json({
        success: true,
        message: 'Quote request submitted successfully.',
        warning: 'Email notification may be delayed.',
      });
      return;
    }
    next(error);
  }
}

export async function getQuotes(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page = 1, limit = 10, status } = req.query as any;
    
    const filter: any = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [quotes, total] = await Promise.all([
      Quote.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Quote.countDocuments(filter),
    ]);

    res.json({
      quotes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuote(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    
    const quote = await Quote.findById(id);
    if (!quote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }

    // Mark as read if it was new
    if (quote.status === 'new') {
      quote.status = 'read';
      await quote.save();
    }

    res.json({ quote });
  } catch (error) {
    next(error);
  }
}

export async function updateQuoteStatus(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'archived'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const quote = await Quote.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!quote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Quote status updated successfully',
      quote,
    });
  } catch (error) {
    next(error);
  }
}