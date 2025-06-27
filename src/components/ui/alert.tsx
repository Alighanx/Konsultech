import * as React from "react";
import { cn } from "@/lib/utils";

export function Alert({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-blue-200 bg-blue-50 p-4 flex flex-col items-center text-center", className)}>
      <div className="font-bold text-blue-700 text-lg mb-1">{title}</div>
      {description && <div className="text-blue-600 text-sm">{description}</div>}
    </div>
  );
}
