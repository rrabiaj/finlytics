import OpenAI from 'openai';
import { config } from '../config';
import prisma from '../config/prisma';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export const getAIResponse = async (userId: string, organizationId: string, messages: any[]) => {
  const tools: OpenAI.Chat.ChatCompletionTool[] = [
    {
      type: 'function',
      function: {
        name: 'getFinancialStats',
        description: 'Get key financial statistics for the organization',
        parameters: {
          type: 'object',
          properties: {},
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'getCustomers',
        description: 'Get list of customers',
        parameters: {
          type: 'object',
          properties: {},
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'getRecentInvoices',
        description: 'Get the most recent invoices',
        parameters: {
          type: 'object',
          properties: {
            limit: { type: 'number', default: 5 },
          },
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are Finlytics AI, a professional financial analyst for SMEs. 
        Your goal is to provide strategic intelligence based on the organization's data. 
        Always be professional, concise, and helpful. 
        Only answer based on the data provided through tools or conversation history.
        Format your responses with clear markdown sections and provide actionable business recommendations where appropriate.
        Current Organization ID: ${organizationId}`
      },
      ...messages,
    ],
    tools,
  });

  const responseMessage = response.choices[0].message;

  if (responseMessage.tool_calls) {
    const toolCalls = responseMessage.tool_calls;
    const availableFunctions: any = {
      getFinancialStats: () => getFinancialStats(organizationId),
      getCustomers: () => getCustomers(organizationId),
      getRecentInvoices: (args: any) => getRecentInvoices(organizationId, args.limit),
    };

    const toolMessages: any[] = [];
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const functionResponse = await functionToCall(functionArgs);

      toolMessages.push({
        tool_call_id: toolCall.id,
        role: 'tool',
        name: functionName,
        content: JSON.stringify(functionResponse),
      });
    }

    const secondResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        ...messages,
        responseMessage,
        ...toolMessages,
      ],
    });

    return secondResponse.choices[0].message;
  }

  return responseMessage;
};

// Helper functions for AI tools
async function getFinancialStats(organizationId: string) {
  const [revenue, expenses] = await Promise.all([
    prisma.invoice.aggregate({
      where: { organizationId, status: 'PAID' },
      _sum: { totalAmount: true },
    }),
    prisma.expense.aggregate({
      where: { organizationId },
      _sum: { amount: true },
    }),
  ]);

  return {
    totalRevenue: revenue._sum.totalAmount || 0,
    totalExpenses: expenses._sum.amount || 0,
    netProfit: (revenue._sum.totalAmount || 0) - (expenses._sum.amount || 0),
  };
}

async function getCustomers(organizationId: string) {
  return prisma.customer.findMany({
    where: { organizationId },
    select: { name: true, email: true, type: true },
    take: 10,
  });
}

async function getRecentInvoices(organizationId: string, limit = 5) {
  return prisma.invoice.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: { invoiceNumber: true, totalAmount: true, status: true, dueDate: true },
  });
}

export const generateFinancialSummary = async (organizationId: string) => {
  const stats = await getFinancialStats(organizationId);
  const prompt = `Provide a high-level executive summary of the following financial performance: ${JSON.stringify(stats)}.
  Include sections for:
  1. Key Metrics Overview
  2. Performance Analysis
  3. Risk Assessment
  4. Strategic Recommendations
  
  Format with clear markdown headings.`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'You are a professional financial analyst AI. Only answer based on provided data.' },
      { role: 'user', content: prompt }
    ],
  });

  return response.choices[0].message.content;
};

export const predictCashFlow = async (organizationId: string) => {
  const expenses = await prisma.expense.findMany({
    where: { organizationId },
    orderBy: { date: 'desc' },
    take: 50,
  });

  const prompt = `Analyze these recent expenses and predict cash flow risks and trends for the next 3 months: ${JSON.stringify(expenses)}.
  Look for patterns in the historical data.
  Provide:
  1. Projected Cash Outflow
  2. Pattern Recognition (Recurring vs One-off)
  3. Potential Shortfall Risks
  4. Mitigation Strategies
  
  Format with clear markdown headings and bullet points.`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'You are an AI specialized in business cash flow forecasting. Analyze data patterns to make predictions.' },
      { role: 'user', content: prompt }
    ],
  });

  return response.choices[0].message.content;
};

export default openai;
