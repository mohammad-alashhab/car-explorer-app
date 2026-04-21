import { Car } from "lucide-react";
import { Card } from "../../../../shared/components/ui/Card";
import type { ResultItem } from "../../services/home.service";

export function ModelCard({ item }: { item: ResultItem }) {
  return (
    <Card>
      <div className="flex flex-col h-full min-h-[140px]">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4 flex-shrink-0">
          <Car className="w-5 h-5 text-primary" />
        </div>
        <p className="font-semibold text-gray-900 text-base leading-snug mb-1 truncate">
          {item.modelName}
        </p>
        <p className="text-sm text-gray-500 mb-3">{item.makeName}</p>
        <div className="mt-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
            {item.year}
          </span>
        </div>
      </div>
    </Card>
  );
}