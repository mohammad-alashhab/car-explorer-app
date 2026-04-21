import { AlertCircle } from "lucide-react";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}