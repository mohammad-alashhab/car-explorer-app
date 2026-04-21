import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Spinner } from "../ui/Spinner";

interface LayoutProps {
  children: ReactNode;
  loading?: boolean;
}

export function Layout({ children, loading }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {loading && (
        <div className="fixed inset-0 z-[999] bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}

      <main className="flex-1">{children}</main>
      
      <Footer />
    </div>
  );
}
