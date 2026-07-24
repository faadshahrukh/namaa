import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Search, Menu, X, Bell, ChevronDown,
  TrendingUp, BookOpen, Calendar, Newspaper,
  Wrench, AlertTriangle, Home, Globe, LogIn, User,
  Sun, Moon
} from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Brokers", href: "/brokers", icon: TrendingUp },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Academy", href: "/academy", icon: BookOpen },
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Tutorials", href: "/tutorials", icon: BookOpen },
  { label: "Scam Alerts", href: "/scam-alerts", icon: AlertTriangle },
];

const timezones = ["UTC+0", "UTC+1", "UTC+2", "UTC+3", "UTC+4", "UTC+5", "UTC+8", "UTC-5", "UTC-8"];

export function Navigation() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tzOpen, setTzOpen] = useState(false);
  const [timezone, setTimezone] = useState("UTC+3");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setTzOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes("broker")) navigate("/brokers");
    else if (q.includes("calendar") || q.includes("event")) navigate("/calendar");
    else if (q.includes("news") || q.includes("analysis")) navigate("/news");
    else if (q.includes("academy") || q.includes("learn")) navigate("/academy");
    else if (q.includes("tool") || q.includes("calculator")) navigate("/tools");
    else if (q.includes("scam") || q.includes("fraud")) navigate("/scam-alerts");
    else navigate("/news");
    setSearchQuery("");
    setSearchOpen(false);
  };

  // Theme-aware colours for the nav shell
  const navBg = isDark
    ? `bg-[#070C17]/95 backdrop-blur-md ${scrolled ? "border-b border-[#1D2F4A] shadow-lg shadow-black/20" : "border-b border-transparent"}`
    : `bg-[#F2F6FF]/95 backdrop-blur-md ${scrolled ? "border-b border-[#C2D3EC] shadow-lg shadow-black/5" : "border-b border-transparent"}`;

  const linkBase = isDark
    ? "text-[#8AA4C8] hover:text-[#E3EBF8] hover:bg-[#172338]"
    : "text-[#4A6080] hover:text-[#0D1E38] hover:bg-[#D4E1F4]";

  const linkActive = isDark
    ? "text-[#C9A84C] bg-[#C9A84C]/8"
    : "text-[#B8922A] bg-[#B8922A]/10";

  const iconBtn = isDark
    ? "text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#172338]"
    : "text-[#5C7094] hover:text-[#0D1E38] hover:bg-[#D4E1F4]";

  const mobileMenuBg = isDark
    ? "bg-[#0B1322] border-t border-[#1D2F4A]"
    : "bg-[#FFFFFF] border-t border-[#C2D3EC]";

  const searchBg = isDark
    ? "bg-[#111D30] border border-[#1D2F4A] text-[#E3EBF8] placeholder:text-[#6A82A8] focus:border-[#C9A84C]/50"
    : "bg-[#E4EDF9] border border-[#C2D3EC] text-[#0D1E38] placeholder:text-[#5C7094] focus:border-[#B8922A]/50";

  const dropdownBg = isDark
    ? "bg-[#0B1322] border-[#1D2F4A]"
    : "bg-[#FFFFFF] border-[#C2D3EC]";

  const goldText = isDark ? "text-[#C9A84C]" : "text-[#B8922A]";
  const goldBg   = isDark ? "bg-[#C9A84C] text-[#070C17] hover:bg-[#D4B55A]" : "bg-[#B8922A] text-[#FFFFFF] hover:bg-[#C9A030]";
  const dimText     = isDark ? "text-[#8AA4C8]" : "text-[#4A6080]";
  const dimTextHover = isDark ? "text-[#8AA4C8] hover:text-[#E3EBF8]" : "text-[#4A6080] hover:text-[#0D1E38]";
  const tzInactive  = isDark ? `${dimText} hover:bg-[#111D30]` : `${dimText} hover:bg-[#E4EDF9]`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <Logo
              className="h-8 w-auto"
              textClassName={isDark ? "text-[#E3EBF8]" : "text-[#0D1E38]"}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3.5 py-2 rounded-md text-sm transition-colors duration-200 ${
                    active
                      ? linkActive
                      : item.label === "Scam Alerts"
                        ? isDark ? "text-red-400 hover:text-red-300 hover:bg-[#172338]"
                                 : "text-red-600 hover:text-red-700 hover:bg-[#D4E1F4]"
                        : linkBase
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-md transition-colors ${iconBtn}`}
            >
              <Search size={16} />
            </button>

            {/* Timezone picker */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setTzOpen(!tzOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors text-xs ${iconBtn}`}
              >
                <Globe size={13} />
                <span>{timezone}</span>
                <ChevronDown size={11} />
              </button>
              {tzOpen && (
                <div className={`absolute top-full right-0 mt-1 border rounded-xl shadow-xl z-50 overflow-hidden min-w-[100px] ${dropdownBg}`}>
                  {timezones.map((tz) => (
                    <button
                      key={tz}
                      onClick={() => { setTimezone(tz); setTzOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                        tz === timezone ? goldText : tzInactive
                      }`}
                    >
                      {tz}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className={`p-2 rounded-md transition-colors ${iconBtn}`}
              aria-label="Toggle theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Alerts bell */}
            <Link
              to="/alerts"
              className={`p-2 rounded-md transition-colors relative ${iconBtn}`}
            >
              <Bell size={16} />
              <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#C9A84C]" : "bg-[#B8922A]"}`} />
            </Link>

            {/* Auth buttons — desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className={`px-3.5 py-1.5 text-sm transition-colors flex items-center gap-1.5 ${dimTextHover}`}
              >
                <LogIn size={13} /> Sign In
              </Link>
              <Link to="/register" className={`px-3.5 py-1.5 text-sm rounded-md transition-colors ${goldBg}`}>
                Register
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${iconBtn}`}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className={`py-3 border-t ${isDark ? "border-[#1C1E2B]" : "border-[#C2D3EC]"}`}>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7489]" />
              <input
                autoFocus
                type="text"
                placeholder="Search brokers, news, events, lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-md text-sm focus:outline-none ${searchBg}`}
              />
            </div>
          </form>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`lg:hidden ${mobileMenuBg}`}>
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const active = item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                    active ? linkActive : linkBase
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}

            <div className={`pt-2 border-t ${isDark ? "border-[#1C1E2B]" : "border-[#C2D3EC]"} space-y-1`}>
              <Link
                to="/alerts"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${linkBase}`}
              >
                <Bell size={16} /> My Alerts
              </Link>
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${linkBase}`}
              >
                <User size={16} /> Dashboard
              </Link>

              {/* Theme toggle — mobile */}
              <button
                onClick={toggle}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors ${linkBase}`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            <div className="pt-2 flex gap-2">
              <Link
                to="/login"
                className={`flex-1 py-2 text-sm text-center rounded-md border transition-colors ${
                  isDark ? "text-[#9AA0B4] border-[#1C1E2B] hover:border-[#2A2D3E]"
                         : "text-[#4A6080] border-[#C2D3EC] hover:border-[#B5C8E2]"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className={`flex-1 py-2 text-sm text-center rounded-md transition-colors ${goldBg}`}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
