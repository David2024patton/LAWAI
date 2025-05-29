import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PlusCircle } from 'lucide-react';

const UserManagementPage = () => {
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
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <Card className="shadow-xl border-transparent bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>Grant/revoke access, manage roles, and lock/unlock accounts.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">User management interface will be built here. This section will allow administrators to add new users, assign roles (Client, Paralegal, Lawyer, Super-User, Admin), modify existing user permissions, and manage account statuses (active, locked, etc.). Features like searching, filtering, and bulk actions will also be included.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserManagementPage;