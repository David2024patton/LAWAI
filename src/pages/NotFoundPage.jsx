
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-background via-muted to-background dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <AlertTriangle className="h-24 w-24 text-destructive mx-auto mb-6" />
      </motion.div>
      
      <motion.h1 
        className="text-5xl md:text-7xl font-extrabold text-destructive mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        404
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl font-semibold text-foreground mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Oops! Page Not Found.
      </motion.p>
      
      <motion.p 
        className="text-md text-muted-foreground mb-8 max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        It seems the page you were looking for doesn't exist or has been moved. Don't worry, let's get you back on track.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
          <Link to="/dashboard">
            <Home className="mr-2 h-5 w-5" />
            Go to Dashboard
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
