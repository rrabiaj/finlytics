import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export default function AILoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-8 w-[80px]" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex gap-3 ${i === 2 ? "flex-row-reverse" : ""}`}>
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-10 w-[300px] rounded-2xl" />
                  <Skeleton className="h-2 w-10" />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t p-4 flex-col gap-3">
             <div className="w-full flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-24" />
             </div>
             <div className="w-full flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
             </div>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-[120px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-[150px]" />
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
