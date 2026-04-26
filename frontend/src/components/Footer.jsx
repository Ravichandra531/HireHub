import { Link } from "react-router-dom";

export default function Footer() {
  const handleProps = (e) => {
    e.preventDefault();
  }
  
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500 font-medium">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <span className="font-bold flex items-center h-full pt-1">H</span>
          </div>
          <span className="text-slate-900 font-bold tracking-tight">HireHub</span>
          <span className="ml-2 font-light hidden sm:inline">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <span className="font-light sm:hidden">© {new Date().getFullYear()} All rights reserved.</span>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#" onClick={handleProps} className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
          <a href="#" onClick={handleProps} className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          <a href="#" onClick={handleProps} className="hover:text-indigo-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
