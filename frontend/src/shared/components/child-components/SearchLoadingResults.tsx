import { Spinner } from "../ui/Spinner";

export function SearchLoadingResults() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Spinner size="lg" />
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  );
}