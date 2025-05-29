import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, PlusCircle } from 'lucide-react';

const RoleMatrixPage = () => {
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
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Role Matrix</h1>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Role
        </Button>
      </div>

      <Card className="shadow-xl border-transparent bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Define & Customize Roles</CardTitle>
          <CardDescription>Build and manage role capabilities using a drag-and-drop interface.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The Role Matrix builder will be implemented here. This will be an interactive interface, potentially using drag-and-drop functionality, to create custom roles or modify existing ones (Client, Paralegal, Lawyer, Super-User, Admin). Administrators will be able to assign specific permissions (e.g., view cases, edit documents, manage users) to each role, providing granular control over application access.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoleMatrixPage;