import { Link } from "react-router-dom";

export default function Footer() {
    const handleDeadLink = (e) => {
        e.preventDefault();
    };

    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">H</span>
                            </div>
                            <span className="text-2xl font-bold text-slate-900">HireHub</span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Connecting talent with opportunities. Find your dream job or the perfect candidate today with HireHub.
                        </p>

                        <div className="mt-6 flex space-x-4">
                            {/* Social Icons */}
                            <a href="#" onClick={handleDeadLink} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                            </a>
                            <a href="#" onClick={handleDeadLink} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Connect with us */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Connect with us</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Contact Support</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Facebook</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Slack Community</a>
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">About</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Careers</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Employer Info</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Sitemap</a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Fraud Alert</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleDeadLink} className="text-base text-slate-500 hover:text-indigo-600 transition-colors">Trust & Safety</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 mt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        <p className="text-base text-slate-400">
                            &copy; {new Date().getFullYear()} HireHub. All rights reserved.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>Made with ❤️ for job seekers</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
