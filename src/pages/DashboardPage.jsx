
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageSquare, FileText, FolderOpen, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const DashboardPage = () => {
  const navigate = useNavigate();

  const actions = [
    { title: "Start New Chat", description: "Communicate securely about your cases.", icon: MessageSquare, color: "text-sky-500", bgColor: "bg-sky-500/10", path: "/chat" },
    { title: "View My Cases", description: "Access and manage all your active cases.", icon: FolderOpen, color: "text-fuchsia-500", bgColor: "bg-fuchsia-500/10", path: "/cases" },
    { title: "Upload Documents", description: "Securely upload and manage case documents.", icon: FileText, color: "text-amber-500", bgColor: "bg-amber-500/10", path: "/documents" },
    { title: "Track Progress", description: "View milestones and progress of your cases.", icon: BarChart3, color: "text-emerald-500", bgColor: "bg-emerald-500/10", path: "/cases" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Client Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <motion.custom
            key={action.title}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.15)"}}
            className="h-full"
          >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border-transparent bg-card/80 backdrop-blur-sm hover:border-primary/50">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className={`p-3 rounded-full ${action.bgColor}`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{action.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 text-primary hover:text-accent" onClick={() => navigate(action.path)}>
                  Go to {action.title.split(" ")[0]} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.custom>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <Card className="shadow-lg border-transparent bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Overview of your latest case updates and communications.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to display yet. Start a chat or view your cases to see updates here.</p>
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
};

export default DashboardPage;
