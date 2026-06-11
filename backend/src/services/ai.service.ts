import prisma from '../config/prisma';
import { getAIResponse } from './openai.service';

export const askAI = async (userId: string, organizationId: string, content: string, conversationId?: string) => {
  let conversation;
  
  if (conversationId) {
    conversation = await prisma.aIConversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });
  }

  if (!conversation) {
    conversation = await prisma.aIConversation.create({
      data: {
        userId,
        title: content.substring(0, 30),
      },
      include: { messages: true },
    });
  }

  // Save user message
  await prisma.aIMessage.create({
    data: {
      role: 'user',
      content,
      conversationId: conversation.id,
    },
  });

  // Get conversation history for context
  const messages = conversation.messages.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  })) as any[];

  messages.push({ role: 'user', content });

  // Call OpenAI via the dedicated service with function calling
  let aiResponse: string;
  try {
    const response = await getAIResponse(userId, organizationId, messages);
    aiResponse = response.content || "I've analyzed your data. Please try asking a more specific question about your finances, customers, or projects.";
  } catch (error) {
    console.error('AI service error:', error);
    aiResponse = "I'm having trouble connecting to my analysis engine right now. Please try again in a moment.";
  }

  // Save assistant message
  const savedAiMessage = await prisma.aIMessage.create({
    data: {
      role: 'assistant',
      content: aiResponse,
      conversationId: conversation.id,
    },
  });

  return {
    conversationId: conversation.id,
    message: savedAiMessage,
  };
};

export const getConversations = async (userId: string) => {
  return prisma.aIConversation.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
};

export const getMessages = async (conversationId: string) => {
  return prisma.aIMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  });
};