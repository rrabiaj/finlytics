import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => api.get<any>("/analytics/kpi"),
  });
}

export function useCashFlowForecast() {
  return useQuery({
    queryKey: ["cashflow-forecast"],
    queryFn: () => api.get<any>("/cashflow/forecast"),
  });
}

export function useHealthScore() {
  return useQuery({
    queryKey: ["health-score"],
    queryFn: () => api.get<any>("/cashflow/health"),
  });
}
