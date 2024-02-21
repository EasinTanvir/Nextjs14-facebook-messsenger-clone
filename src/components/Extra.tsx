import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 sm:w-[550px] w-[350px]" />
        <Skeleton className="h-4 sm:w-[500px] w-[300px]" />
      </div>
    </div>
  );
}
