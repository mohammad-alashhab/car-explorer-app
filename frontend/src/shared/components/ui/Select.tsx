import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "./Spinner";

export interface SelectOption {
  value: number | string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: number | string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  id?: string;
  className?: string;
  hideDefaultOption?: boolean;
  hideSearchInput?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  loading = false,
  disabled = false,
  label,
  id,
  className = "",
  hideDefaultOption = false,
  hideSearchInput = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => String(o.value) === String(value));

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleCount(50);
      setSearch("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  function handleSelect(optValue: string) {
    onChange(optValue);
    setOpen(false);
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const target = e.currentTarget;
    const isBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (isBottom) {
      setVisibleCount((prev) => prev + 50);
    }
  }

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const isDisabled = disabled || loading;

  return (
    <div className={["flex flex-col gap-1.5", className].join(" ")}>
      {label && (
        <label
          htmlFor={id}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          {label}
          {loading && <Spinner size="sm" />}
        </label>
      )}

      <div ref={containerRef} className="relative">
        {/* Trigger */}
        <button
          id={id}
          type="button"
          disabled={isDisabled}
          onClick={() => setOpen((o) => !o)}
          className={[
            "w-full h-11 pl-3.5 pr-9 rounded-xl border bg-white text-sm text-left",
            "transition-all duration-200 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            open
              ? "border-primary ring-2 ring-primary/20"
              : "border-gray-200 hover:border-gray-300",
            selected ? "text-gray-900" : "text-gray-400",
          ].join(" ")}
        >
          <span className="block truncate">
            {selected ? selected.label : placeholder}
          </span>
        </button>

        {/* Chevron */}
        <ChevronDown
          className={[
            "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
            "transition-all duration-200",
            open ? "text-primary rotate-180" : "text-gray-400",
          ].join(" ")}
        />

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 w-full mt-1.5 bg-white rounded-xl border border-gray-100 shadow-elevated overflow-hidden"
            >
              {/* Search */}
              {!hideSearchInput && (
                <div className="px-2 pt-2">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            
              <div
                onScroll={handleScroll}
                className="max-h-56 overflow-y-auto py-1.5 px-1.5 space-y-0.5 scrollbar-thin"
              >
                {/* Placeholder */}
                {!hideDefaultOption && (
                  <li
                    role="option"
                    aria-selected={!value}
                    onClick={() => handleSelect("")}
                    className="flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-400 italic hover:bg-gray-50 hover:text-gray-500 cursor-pointer transition-colors duration-150 select-none"
                  >
                    {placeholder}
                  </li>
                )}

                {filteredOptions.length > 0 && (
                  <div className="h-px bg-gray-100 mx-1 my-1" />
                )}

                {filteredOptions.length === 0 && (
                  <li className="px-3 py-3 text-sm text-gray-400 text-center">
                    No results
                  </li>
                )}

                {/* lazy + filtered */}
                {filteredOptions.slice(0, visibleCount).map((opt) => {
                  const isSelected = String(opt.value) === String(value);
                  return (
                    <li
                      key={opt.value}
                      onClick={() => handleSelect(String(opt.value))}
                      className={[
                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer",
                        isSelected
                          ? "bg-primary-light text-primary font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                      ].join(" ")}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 ml-2 text-primary" />
                      )}
                    </li>
                  );
                })}

                {visibleCount < filteredOptions.length && (
                  <div className="text-center text-xs text-gray-400 py-2">
                    Loading more...
                  </div>
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}