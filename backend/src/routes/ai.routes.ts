import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as aiController from '../controllers/ai.controller';
import { validate } from '../middleware/validate.middleware';
import { askAISchema } from '../validators/ai.validator';

const router = Router();

router.use(authenticate);

router.post('/ask', validate(askAISchema), aiController.askAI);
router.get('/conversations', aiController.getConversations);
router.get('/conversations/:conversationId/messages', aiController.getMessages);

export default router;
