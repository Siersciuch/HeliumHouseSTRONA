import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Truck,
  FlaskConical,
  Store,
  BookOpen,
  CalendarClock,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import logoHH from "@/assets/logoHH.jpg";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Eventy", url: "/events", icon: Calendar },
  { title: "Ludzie", url: "/people", icon: Users },
  { title: "Flota", url: "/fleet", icon: Truck },
  { title: "Testery", url: "/testers", icon: FlaskConical },
  { title: "Stoiska", url: "/stands", icon: Store },
  { title: "Kontenty", url: "/content", icon: FileText },
  { title: "Baza Wiedzy", url: "/knowledge", icon: BookOpen },
  { title: "Grafik", url: "/schedule", icon: CalendarClock, adminOnly: true },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || user?.role === "admin"
  );

  const closeSidebarOnMobile = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={isMobile ? { x: -280 } : { x: 0 }}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -280 } : { x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`
              ${isMobile ? "fixed z-50" : "relative"}
              flex flex-col w-[260px] min-h-screen
              bg-sidebar border-r border-sidebar-border
            `}
          >
            {/* Logo area */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
              <img src={logoHH} alt="HH" className="h-9 w-9 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-sidebar-foreground truncate">
                  Helium House
                </h2>
                <p className="text-xs text-muted-foreground">OPS</p>
              </div>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Nav items */}
            <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
              {visibleItems.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end={item.url === "/"}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                  activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold shadow-sm"
                  onClick={closeSidebarOnMobile}
                >
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </nav>

            {/* Bottom section */}
            <div className="border-t border-sidebar-border p-3 space-y-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>{theme === "dark" ? "Tryb jasny" : "Tryb ciemny"}</span>
              </button>

              {/* User info + logout */}
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-8 w-8 rounded-full gradient-petrol flex items-center justify-center text-xs font-bold text-white">
                  {user?.name?.charAt(0) || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  title="Wyloguj"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center gap-3 px-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
