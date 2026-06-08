import prisma from '../config/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (userId: string, content: string, conversationId?: string) => {
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

  // Call OpenAI (simplified)
  // const completion = await openai.chat.completions.create({ ... });
  const aiResponse = "This is a placeholder AI response for: " + content;

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
