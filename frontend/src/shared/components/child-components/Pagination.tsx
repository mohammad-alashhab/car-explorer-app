import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";

export function Pagination({
  page,
  numPages,
  onPageChange,
}: {
  page: number;
  numPages: number;
  onPageChange: (p: number) => void;
}) {
  type PageItem = number | "ellipsis";

  const getPages = (): PageItem[] => {
    if (numPages <= 2) return Array.from({ length: numPages }, (_, i) => i + 1);
    const items: PageItem[] = [1];
    const start = Math.max(2, page - 1);
    const end = Math.min(numPages - 1, page + 1);
    if (start > 2) items.push("ellipsis");
    for (let i = start; i <= end; i++) items.push(i);
    if (end < numPages - 1) items.push("ellipsis");
    items.push(numPages);
    return items;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
      <Button
        variant="secondary"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </Button>

      {getPages().map((item, i) => {
        if (item === "ellipsis") {
          return (
            <span key={`e-${i}`} className="px-2 text-gray-400 text-sm select-none">
              …
            </span>
          );
        }
        return (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={[
              "w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
              page === item
                ? "bg-primary text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100",
            ].join(" ")}
          >
            {item}
          </button>
        );
      })}

      <Button
        variant="secondary"
        size="sm"
        disabled={page >= numPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}