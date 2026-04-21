import { Car } from "lucide-react";

export function EmptyResults() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
        <Car className="w-6 h-6 text-gray-300" />
      </div>
      <p className="font-semibold text-gray-700 mb-1">No models found</p>
      <p className="text-sm text-gray-400 max-w-xs">
        There are no models for this make and year. Try a different combination.
      </p>
    </div>
  );
}
