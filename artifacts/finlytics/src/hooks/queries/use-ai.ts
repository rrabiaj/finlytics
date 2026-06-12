import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useAIResponse() {
  return useMutation({
    mutationFn: (message: string) => api.post<any>("/ai/chat", { message }),
  });
}
