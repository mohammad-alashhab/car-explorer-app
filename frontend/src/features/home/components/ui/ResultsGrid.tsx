import { motion } from "framer-motion";
import type { ResultItem } from "../../services/home.service";
import { ModelCard } from "./ModelCard";

export function ResultsGrid({ items }: { items: ResultItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.03, ease: "easeOut" }}
        >
          <ModelCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}