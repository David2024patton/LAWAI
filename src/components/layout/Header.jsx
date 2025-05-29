import React from 'react';
import { Bell, Settings, LogOut, Menu, Sun, Moon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ toggleSidebar, isSidebarOpen, toggleTheme, currentTheme, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(() => navigate('/auth'));
  };
  
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/chat": "Secure Chat",
    "/cases": "Case Management",
    "/documents": "Document Hub",
    "/admin": "Admin Panel",
  };

  const getPageTitle = (pathname) => {
    const exactMatch = pageTitles[pathname];
    if (exactMatch) return exactMatch;
    if (pathname.startsWith("/chat/")) return "Secure Chat"; 
    return "Legal AI Portal"; 
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between h-20 px-6 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50"
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4 lg:hidden">
          <Menu className="h-6 w-6 text-muted-foreground" />
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">{pageTitle}</h1>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search cases, documents..." className="pl-10 w-64 bg-muted/50 border-transparent focus:border-primary focus:bg-background" />
        </div>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {currentTheme === 'light' ? <Moon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" /> : <Sun className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />}
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar>
                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  U
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Avatar className="mr-2 h-4 w-4 scale-75"> 
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground">U</AvatarFallback>
              </Avatar>
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Header;