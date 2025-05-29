import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'lucide-react';
import ProviderSection from './ProviderSection';

const initialConfigState = {
  id: '',
  provider: '',
  modelName: '',
  apiKey: '',
  enabled: true,
  prompt: '',
};

const LlmConfigModal = ({ onConfigAdd, onConfigUpdate, existingConfig, isEditingMode, children }) => {
  const [config, setConfig] = useState(initialConfigState);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isEditingMode && existingConfig) {
      setConfig(existingConfig);
    } else {
      setConfig(initialConfigState);
    }
    setErrors({}); 
  }, [isEditingMode, existingConfig, isOpen]);

  const validate = () => {
    const e = {};
    if (!config.provider) e.provider = 'Provider is required.';
    if (!config.modelName.trim()) e.modelName = 'Model name is required.';
    if (config.provider && config.provider !== 'Ollama (Local)' && !config.apiKey.trim()) {
      e.apiKey = 'API Key is required for this provider.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast({ variant: 'destructive', title: 'Validation Error', description: 'Please fix the errors in the form.' });
      return;
    }
    const configToSave = { ...config };
    // Ensure no undefined fields from previous structures are saved
    delete configToSave.scope;
    delete configToSave.users;
    delete configToSave.audience;

    if (isEditingMode) {
      onConfigUpdate(configToSave);
      toast({ title: 'LLM Config Updated', description: `${configToSave.modelName} has been updated.` });
    } else {
      onConfigAdd({ ...configToSave, id: uuidv4() });
      toast({ title: 'LLM Config Added', description: `${configToSave.modelName} has been added successfully.` });
    }
    setIsOpen(false);
  };

  const handleOpenChange = (openStatus) => {
    setIsOpen(openStatus);
    if (!openStatus) {
      setConfig(initialConfigState);
      setErrors({});
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ? React.cloneElement(children, { onClick: () => setIsOpen(true) }) : (
          <Button onClick={() => setIsOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New LLM
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-card border-border shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">
            {isEditingMode ? 'Edit LLM Configuration' : 'Add New LLM Configuration'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEditingMode ? 'Update the details for this LLM configuration.' : 'Configure a new Large Language Model provider and model details.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-6">
          <ProviderSection config={config} setConfig={setConfig} errors={errors} />
        </div>
        
        <DialogFooter className="mt-2">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="hover:bg-muted/50">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            {isEditingMode ? 'Save Changes' : 'Add LLM Config'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LlmConfigModal;