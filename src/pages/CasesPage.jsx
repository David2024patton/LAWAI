
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, PlusCircle, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CasesPage = () => {
  const cases = [
    { id: 'C001', title: 'Alpha Corp vs. Beta LLC', status: 'Active', lastUpdate: '2025-05-27', client: 'John Doe' },
    { id: 'C002', title: 'Patent Infringement Case X', status: 'Pending Review', lastUpdate: '2025-05-20', client: 'Jane Smith' },
    { id: 'C003', title: 'Real Estate Dispute Y', status: 'Closed', lastUpdate: '2025-04-15', client: 'Robert Brown' },
    { id: 'C004', title: 'Employment Contract Z', status: 'Active', lastUpdate: '2025-05-25', client: 'Emily White' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-8"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Case Management
        </h1>
        <div className="flex items-center space-x-2">
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search cases..." className="pl-10 w-full sm:w-64 bg-muted/50 border-transparent focus:border-primary focus:bg-background" />
          </div>
          <Button variant="outline" className="hidden sm:inline-flex">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <PlusCircle className="mr-2 h-4 w-4" /> New Case
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem, index) => (
          <motion.custom
            key={caseItem.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 8px 15px hsla(var(--primary), 0.1)"}}
          >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-transparent bg-card/80 backdrop-blur-sm hover:border-primary/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <FolderOpen className="h-8 w-8 text-primary mb-2" />
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    caseItem.status === 'Active' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                    caseItem.status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                    'bg-gray-500/20 text-gray-600 dark:text-gray-400'
                  }`}>
                    {caseItem.status}
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold">{caseItem.title}</CardTitle>
                <CardDescription>Client: {caseItem.client}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Case ID: {caseItem.id}</p>
                <p className="text-sm text-muted-foreground">Last Updated: {caseItem.lastUpdate}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="link" className="text-primary hover:text-accent">View Details</Button>
              </CardFooter>
            </Card>
          </motion.custom>
        ))}
      </div>
       {cases.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Cases Found</h2>
          <p className="text-muted-foreground mb-4">Get started by creating a new case.</p>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Case
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CasesPage;
