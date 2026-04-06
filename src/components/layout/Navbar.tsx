import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, LineChart, Shield, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useThemeStore } from '@/store/themeStore';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Navbar: React.FC = () => {
  const { currentRole, setRole } = useAuth();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <ReceiptText size={20} /> },
    { name: 'Insights', path: '/insights', icon: <LineChart size={20} /> },
    { name: 'Admin', path: '/admin', icon: <Shield size={20} /> },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setRole('viewer');
    window.location.href = '/';
  };

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {item.icon}
            {item.name}
          </NavLink>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-8 max-w-7xl mx-auto">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded border border-border bg-primary flex items-center justify-center text-primary-foreground font-bold">
                $
              </div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Finance App</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <NavLinks />
            </nav>
            <div className="mt-auto absolute bottom-4 w-[calc(100%-2rem)] space-y-4">
              <div className="flex items-center justify-between p-2 rounded-md bg-muted">
                <span className="text-sm font-medium text-muted-foreground">Mode</span>
                <span className="text-sm font-bold capitalize text-primary">{currentRole}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={toggleDarkMode} className="flex-1">
                  {isDarkMode ? '🌞' : '🌙'}
                </Button>
                {currentRole === 'admin' && (
                  <Button variant="destructive" onClick={handleLogout} className="flex-[2] gap-2">
                    <LogOut size={16} /> Logout
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Brand */}
        <div className="flex items-center gap-2 mr-6 hidden md:flex">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            $
          </div>
          <span className="font-bold tracking-tight">Finance App</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 flex-1">
          <NavLinks />
        </nav>

        {/* Desktop Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex items-center gap-2 mr-2 border-r border-border pr-4">
             <span className="text-xs font-medium text-muted-foreground uppercase">{currentRole}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} title="Toggle theme">
            {isDarkMode ? '🌞' : '🌙'}
          </Button>
          {currentRole === 'admin' && (
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10" title="Logout">
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
