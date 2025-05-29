import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const providerOptionsList = [
  { value: "OpenAI", label: "OpenAI" },
  { value: "Ollama (Local)", label: "Ollama (Local)" },
  { value: "HuggingFace", label: "HuggingFace" },
  { value: "Google Gemini", label: "Google Gemini" },
  { value: "Groq", label: "Groq" },
  // Potentially add user-specific providers or options here
];

const UserProviderSection = ({ config, setConfig, errors }) => {
  return (
    <>
      {/* Add any user-specific fields at the top if needed */}
      {/* For example:
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="userId" className="text-right text-foreground font-medium">User ID</Label>
        <div className="col-span-3">
          <Input 
            id="userId" 
            value={config.userId || ''} 
            onChange={e => setConfig(p => ({ ...p, userId: e.target.value }))} 
            placeholder="Enter User ID this config applies to" 
            className="w-full border-input focus:ring-primary" 
          />
          {errors && errors.userId && <p className="text-sm text-destructive mt-1">{errors.userId}</p>}
        </div>
      </div>
      */}

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="user-provider" className="text-right text-foreground font-medium">Provider</Label>
        <div className="col-span-3">
          <Select 
            value={config.provider} 
            onValueChange={v => { 
              setConfig(p => ({ ...p, provider: v, apiKey: v === 'Ollama (Local)' ? '' : p.apiKey })); 
            }}
          >
            <SelectTrigger id="user-provider"><SelectValue placeholder="Select LLM Provider" /></SelectTrigger>
            <SelectContent>
              {providerOptionsList.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors && errors.provider && <p className="text-sm text-destructive mt-1">{errors.provider}</p>}
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="user-modelName" className="text-right text-foreground font-medium">Model Name</Label>
        <div className="col-span-3">
          <Input 
            id="user-modelName" 
            value={config.modelName} 
            onChange={e => { 
              setConfig(p => ({ ...p, modelName: e.target.value })); 
            }} 
            placeholder="e.g., gpt-4-turbo, llama3" 
            className="w-full border-input focus:ring-primary" 
          />
          {errors && errors.modelName && <p className="text-sm text-destructive mt-1">{errors.modelName}</p>}
        </div>
      </div>

      {config.provider && config.provider !== 'Ollama (Local)' && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="user-apiKey" className="text-right text-foreground font-medium">API Key</Label>
          <div className="col-span-3">
            <Input 
              id="user-apiKey" 
              type="password" 
              value={config.apiKey} 
              onChange={e => { 
                setConfig(p => ({ ...p, apiKey: e.target.value })); 
              }} 
              placeholder="Enter API Key" 
              className="w-full border-input focus:ring-primary" 
            />
            {errors && errors.apiKey && <p className="text-sm text-destructive mt-1">{errors.apiKey}</p>}
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="user-prompt" className="text-right text-foreground font-medium">System Prompt</Label>
        <div className="col-span-3">
          <Input 
            id="user-prompt" 
            value={config.prompt} 
            onChange={e => setConfig(p => ({ ...p, prompt: e.target.value }))} 
            placeholder="Optional: e.g., You are a helpful AI assistant." 
            className="w-full border-input focus:ring-primary" 
          />
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="user-enabled" className="text-right text-foreground font-medium">Enabled</Label>
        <div className="col-span-3 flex items-center">
          <Switch 
            id="user-enabled" 
            checked={config.enabled} 
            onCheckedChange={v => setConfig(p => ({ ...p, enabled: v }))} 
            className="data-[state=checked]:bg-primary" 
          />
          <span className="ml-2 text-sm text-muted-foreground">{config.enabled ? "Active" : "Inactive"}</span>
        </div>
      </div>
    </>
  );
};

export default UserProviderSection;