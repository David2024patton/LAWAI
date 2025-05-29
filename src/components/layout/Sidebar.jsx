
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, FileText, FolderOpen, Settings, Users, LogOut, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Cases', href: '/cases', icon: FolderOpen },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Admin', href: '/admin', icon: Settings, roles: ['Admin', 'Super-User'] },
];

const currentUserRole = 'Admin'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const sidebarVariants = {
    open: { width: '280px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, display: 'flex' },
    closed: { opacity: 0, x: -10, transitionEnd: { display: 'none' } },
  };
  
  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className={cn(
        "relative h-full flex flex-col bg-gradient-to-b from-primary/5 via-background to-background dark:from-primary/10 dark:via-neutral-900 dark:to-neutral-950 border-r border-border shadow-lg overflow-x-hidden",
        isOpen ? "p-6" : "p-4 items-center"
      )}
    >
      <div className={cn("flex items-center justify-between mb-8", isOpen ? "w-full" : "")}>
        <AnimatePresence>
        {isOpen && (
            <motion.div 
              key="logo-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <ShieldCheck className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-primary whitespace-nowrap">LegalAI</h1>
            </motion.div>
        )}
        </AnimatePresence>
         {!isOpen && (
             <ShieldCheck className="h-8 w-8 text-primary mx-auto" />
         )}
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          if (item.roles && !item.roles.includes(currentUserRole)) {
            return null;
          }
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link key={item.name} to={item.href}>
              <motion.div
                whileHover={{ 
                  backgroundColor: "hsl(var(--primary) / 0.1)", 
                  x: isOpen ? 5 : 0,
                  scale: isOpen ? 1.02 : 1.1
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={cn(
                  "flex items-center p-3 rounded-lg text-muted-foreground hover:text-primary transition-colors duration-200",
                  isActive && "bg-primary/10 text-primary font-semibold shadow-sm",
                  isOpen ? "justify-start" : "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", isOpen ? "mr-3" : "")} />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="text-sm"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className={cn("mt-auto", isOpen ? "w-full" : "flex justify-center")}>
         <Button variant="ghost" onClick={toggleSidebar} className={cn("w-full justify-center p-3", !isOpen && "aspect-square")}>
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            <AnimatePresence>
            {isOpen && (
                 <motion.span 
                    variants={itemVariants} 
                    initial="closed" 
                    animate="open" 
                    exit="closed" 
                    transition={{ duration: 0.2, delay: 0.1 }} 
                    className="ml-2 text-sm">
                    Collapse
                </motion.span>
            )}
            </AnimatePresence>
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
