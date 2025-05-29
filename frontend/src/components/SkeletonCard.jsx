import { Skeleton } from "@/components/ui/skeleton";

export default function TaskCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 w-full max-w-md shadow-sm space-y-4">
      {/* Top Row: Title and status */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/2 rounded" />
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>

      {/* Created Date */}
      <Skeleton className="h-4 w-1/3 rounded" />

      {/* Divider */}
      <div className="border-t pt-4 space-y-3">
        {/* Category */}
        <Skeleton className="h-4 w-1/4 rounded" />

        {/* Description */}
        <Skeleton className="h-4 w-3/4 rounded" />

        {/* Priority & Due Date */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>

        {/* Location */}
        <Skeleton className="h-4 w-1/3 rounded" />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <Skeleton className="h-8 w-16 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  );
}
