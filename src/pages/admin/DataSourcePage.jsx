import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, PlusCircle } from 'lucide-react';

const DataSourcePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Database className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Data Sources</h1>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Data Source
        </Button>
      </div>

      <Card className="shadow-xl border-transparent bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Connect Legal Data APIs</CardTitle>
          <CardDescription>Manage connections to external legal data providers (PACER, Westlaw, LexisNexis, etc.).</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The Data Source configuration panel will be developed here. Administrators will be able to add, edit, and remove connections to various legal APIs (e.g., PACER, RECAP, UniCourt, Westlaw, LexisNexis). This will involve inputting API keys, endpoints, and toggling the enabled status for each data source. Secure storage of credentials will be a priority.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataSourcePage;