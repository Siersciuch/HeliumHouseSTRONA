import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import logoHH from "@/assets/logoHH.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { title: "Eventy", url: "/events", icon: Calendar },
  { title: "Ekipa", url: "/people", icon: Users },
  { title: "Flota", url: "/fleet", icon: Truck },
  { title: "Testery", url: "/testers", icon: FlaskConical },
  { title: "Stoiska", url: "/stands", icon: Store },
  { title: "Sklepy", url: "/shops", icon: Store },
  { title: "Kontenty", url: "/content", icon: FileText },
  { title: "Protokoły", url: "/protocols", icon: FileText },
  { title: "Baza Wiedzy", url: "/knowledge", icon: BookOpen },
  { title: "Grafik", url: "/schedule", icon: CalendarClock, adminOnly: true },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, logout, isImpersonating, realUser, stopImpersonating } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  // When impersonating, show admin nav but user sees crew view
  const effectiveRole = isImpersonating ? "crew" : user?.role;

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || effectiveRole === "admin" || isImpersonating
  );

  const closeSidebarOnMobile = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <TooltipProvider delayDuration={300}>
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
              initial={isMobile ? { x: expanded ? -220 : -72 } : { x: 0 }}
              animate={{ x: 0, width: expanded ? 220 : 72 }}
              exit={isMobile ? { x: expanded ? -220 : -72 } : { x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`
                ${isMobile ? "fixed z-50" : "sticky top-0 self-start"}
                flex flex-col h-screen
                bg-sidebar border-r border-sidebar-border
                ${expanded ? "items-stretch" : "items-center"}
              `}
            >
              {/* Logo */}
              <div className={`flex items-center ${expanded ? "gap-3 px-4" : "justify-center"} py-4 border-b border-sidebar-border w-full`}>
                <button onClick={() => { navigate("/"); window.dispatchEvent(new Event("scroll-to-today")); closeSidebarOnMobile(); }} className="focus:outline-none shrink-0">
                  <img src={logoHH} alt="Helium House" className="h-10 w-10 rounded-lg object-cover hover:opacity-80 transition-opacity" />
                </button>
                {expanded && (
                  <span className="text-sm font-bold text-sidebar-foreground truncate">Helium House</span>
                )}
                {isMobile && (
                  <button onClick={() => setSidebarOpen(false)} className="absolute right-2 top-4 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Nav items */}
              <nav className="flex-1 py-3 px-2 space-y-1 w-full">
                {visibleItems.map((item) => (
                  <Tooltip key={item.url}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`flex items-center ${expanded ? "gap-3 px-3" : "justify-center"} w-full h-10 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors`}
                        activeClassName="bg-sidebar-accent text-sidebar-primary shadow-sm"
                        onClick={closeSidebarOnMobile}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {expanded && <span className="text-sm truncate">{item.title}</span>}
                      </NavLink>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right" sideOffset={8}>
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </nav>

              {/* Bottom section */}
              <div className="border-t border-sidebar-border py-3 px-2 space-y-1 w-full">
                {/* Expand/collapse toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className={`flex items-center ${expanded ? "gap-3 px-3" : "justify-center"} w-full h-10 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors`}
                    >
                      {expanded ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                      {expanded && <span className="text-sm">{expanded ? "Zwiń pasek" : "Rozwiń pasek"}</span>}
                    </button>
                  </TooltipTrigger>
                  {!expanded && (
                    <TooltipContent side="right" sideOffset={8}>
                      Rozwiń pasek
                    </TooltipContent>
                  )}
                </Tooltip>

                {/* Theme toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleTheme}
                      className={`flex items-center ${expanded ? "gap-3 px-3" : "justify-center"} w-full h-10 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors`}
                    >
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      {expanded && <span className="text-sm">{theme === "dark" ? "Tryb jasny" : "Tryb ciemny"}</span>}
                    </button>
                  </TooltipTrigger>
                  {!expanded && (
                    <TooltipContent side="right" sideOffset={8}>
                      {theme === "dark" ? "Tryb jasny" : "Tryb ciemny"}
                    </TooltipContent>
                  )}
                </Tooltip>

                {/* User avatar + logout */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center ${expanded ? "gap-3 px-3" : "justify-center"} w-full h-10`}>
                      <div className="h-8 w-8 rounded-full gradient-petrol flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {user?.name?.charAt(0) || "?"}
                      </div>
                      {expanded && (
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  {!expanded && (
                    <TooltipContent side="right" sideOffset={8}>
                      {user?.name} ({user?.role})
                    </TooltipContent>
                  )}
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={logout}
                      className={`flex items-center ${expanded ? "gap-3 px-3" : "justify-center"} w-full h-10 rounded-lg text-sidebar-foreground/70 hover:text-destructive transition-colors`}
                    >
                      <LogOut className="h-5 w-5" />
                      {expanded && <span className="text-sm">Wyloguj</span>}
                    </button>
                  </TooltipTrigger>
                  {!expanded && (
                    <TooltipContent side="right" sideOffset={8}>
                      Wyloguj
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar - only show on mobile when sidebar is hidden */}
        {isMobile && !sidebarOpen && (
          <header className="h-14 flex items-center gap-3 px-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="shrink-0"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1" />
          </header>
        )}

          {/* Impersonation banner */}
          {isImpersonating && (
            <div className="bg-destructive text-destructive-foreground px-4 py-2 flex items-center justify-between text-sm font-medium">
              <span>Zalogowano jako: {user?.name} (widok tej osoby)</span>
              <button
                onClick={() => { stopImpersonating(); navigate("/"); }}
                className="underline font-bold hover:opacity-80"
              >
                Wróć do konta admina
              </button>
            </div>
          )}

          {/* Page content */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
