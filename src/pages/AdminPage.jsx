import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShieldCheck, Database, Settings2, Share2, UserCog } from 'lucide-react'; // Added UserCog
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const adminSections = [
  { title: "User Management", description: "Manage users, roles, and permissions.", icon: Users, path: "/admin/users" },
  { title: "Role Matrix", description: "Define and customize role capabilities.", icon: ShieldCheck, path: "/admin/roles" },
  { title: "LLM Configuration", description: "Setup and manage Large Language Models.", icon: Settings2, path: "/admin/llm" },
  { title: "User LLM Config", description: "Manage LLM configurations for specific users.", icon: UserCog, path: "/admin/user-llm" }, // New Section
  { title: "Data Sources", description: "Connect and configure legal data APIs.", icon: Database, path: "/admin/datasources" },
  { title: "System Settings", description: "General application settings and logs.", icon: Share2, path: "/admin/system" },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-8"
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Panel Overview
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section, index) => (
          <motion.custom
            key={section.title}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.1)"}}
            className="h-full"
          >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border-transparent bg-card/80 backdrop-blur-sm hover:border-primary/50">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-primary hover:text-accent" onClick={() => navigate(section.path)}>
                  Manage {section.title.split(" ")[0]} {section.title.includes("LLM Config") && !section.title.includes("User") ? "LLM" : section.title.includes("User LLM") ? "User LLM" : ""}
                </Button>
              </CardFooter>
            </Card>
          </motion.custom>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminPage;