import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/favicon.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Vehicle<span className="text-primary">Finder</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
