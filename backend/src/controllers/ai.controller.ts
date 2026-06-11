import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as aiService from '../services/ai.service';

export const askAI = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { content, conversationId } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Use the AI service with database storage + OpenAI function calling
    const result = await aiService.askAI(
      req.user!.id,
      req.user!.organizationId,
      content,
      conversationId
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const conversations = await aiService.getConversations(req.user!.id);
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const messages = await aiService.getMessages(req.params.conversationId);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};