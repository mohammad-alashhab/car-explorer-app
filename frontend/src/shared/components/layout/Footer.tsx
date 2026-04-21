export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} VehicleFinder &middot; Developed by {" "}
          <span className="text-gray-500">Muhammad Al-ashhab</span>
        </p>
      </div>
    </footer>
  );
}
