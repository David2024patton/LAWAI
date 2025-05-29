import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Edit2, Trash2, UserCog, AlertTriangle, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import UserLlmConfigModal from '@/components/admin/UserLlmConfigModal'; // Will be created

function UserLlmConfigPage() {
  const [userLlmConfigs, setUserLlmConfigs] = useState([]);
  const [editingConfig, setEditingConfig] = useState(null); 

  useEffect(() => {
    const storedConfigs = localStorage.getItem('userLlmConfigs');
    if (storedConfigs) {
      try {
        const parsedConfigs = JSON.parse(storedConfigs);
        setUserLlmConfigs(parsedConfigs);
      } catch (error) {
        console.error("Failed to parse User LLM configs from localStorage", error);
        setUserLlmConfigs([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userLlmConfigs', JSON.stringify(userLlmConfigs));
  }, [userLlmConfigs]);

  const handleAddConfig = (newConfig) => {
    setUserLlmConfigs(prevConfigs => [...prevConfigs, newConfig]);
  };

  const handleUpdateConfig = (updatedConfig) => {
    setUserLlmConfigs(prevConfigs => 
      prevConfigs.map(config => 
        config.id === updatedConfig.id ? updatedConfig : config
      )
    );
    setEditingConfig(null);
  };
  
  const handleDeleteConfig = (configId) => {
    setUserLlmConfigs(userLlmConfigs.filter(config => config.id !== configId));
    toast({ title: "User LLM Config Deleted", description: "Configuration has been removed." });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-6 bg-gradient-to-br from-card via-card/90 to-background rounded-xl shadow-2xl"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <UserCog className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">User LLM Configuration</h1>
        </div>
        
        <UserLlmConfigModal 
          onConfigAdd={handleAddConfig}
          onConfigUpdate={handleUpdateConfig}
          existingConfig={editingConfig}
          isEditingMode={!!editingConfig}
          key={editingConfig ? `edit-user-${editingConfig.id}` : 'add-new-user-modal'} 
        >
           <Button onClick={() => setEditingConfig(null)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New User LLM
            </Button>
        </UserLlmConfigModal>

      </div>

      {userLlmConfigs.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 bg-card/50 rounded-lg shadow-inner border border-dashed border-border"
        >
          <AlertTriangle className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <p className="text-xl font-semibold text-muted-foreground mb-2">No User LLM Configurations Yet</p>
          <p className="text-sm text-muted-foreground">Click "Add New User LLM" to get started.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-hidden border border-border rounded-lg shadow-lg bg-card"
        >
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-semibold text-foreground">Provider</TableHead>
                <TableHead className="font-semibold text-foreground">Model Name</TableHead>
                <TableHead className="font-semibold text-foreground">Prompt</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {userLlmConfigs.map((config) => (
                  <motion.tr 
                    key={config.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <TableCell className="py-3">{config.provider}</TableCell>
                    <TableCell className="py-3">{config.modelName}</TableCell>
                    <TableCell className="py-3 truncate max-w-xs">{config.prompt || 'N/A'}</TableCell>
                    <TableCell className="py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.enabled ? 'bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-400'}`}>
                        {config.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <UserLlmConfigModal
                        onConfigAdd={handleAddConfig} 
                        onConfigUpdate={handleUpdateConfig}
                        existingConfig={config}
                        isEditingMode={true}
                        key={`edit-user-${config.id}`}
                      >
                        <Button variant="ghost" size="icon" onClick={() => setEditingConfig(config)} className="text-blue-500 hover:text-blue-600 mr-2 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </UserLlmConfigModal>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the User LLM configuration for "{config.modelName}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteConfig(config.id)} className="bg-destructive hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>
      )}
    </motion.div>
  );
}

export default UserLlmConfigPage;