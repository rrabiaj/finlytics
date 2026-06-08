import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as aiService from '../services/ai.service';
import { getAIResponse } from '../services/openai.service';

export const askAI = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { content, conversationId } = req.body;
    
    // Use the improved AI service with tools
    const aiResponse = await getAIResponse(req.user!.id, req.user!.organizationId, [{ role: 'user', content }]);
    
    // Save to database logic could still live in aiService.askAI or here
    // For now, let's just return the response
    res.json(aiResponse);
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
