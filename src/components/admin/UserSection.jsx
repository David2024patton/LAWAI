import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const UserSection = ({ config, setConfig, errors }) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="audience" className="text-right text-foreground font-medium">LLM Audience</Label>
        <div className="col-span-3">
          <Select 
            value={config.audience} 
            onValueChange={v => setConfig(p => ({ ...p, audience: v }))}
          >
            <SelectTrigger id="audience"><SelectValue placeholder="Select Audience" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="shared">Shared (search/chat for everyone)</SelectItem>
              <SelectItem value="personal">Personal (one-on-one user chat)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="scope" className="text-right text-foreground font-medium">Scope</Label>
        <div className="col-span-3">
          <Select 
            value={config.scope} 
            onValueChange={v => setConfig(p => ({ ...p, scope: v }))}
          >
            <SelectTrigger id="scope"><SelectValue placeholder="Select Scope" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">Everyone</SelectItem>
              <SelectItem value="user">Specific User(s)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {config.scope === 'user' && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="users" className="text-right text-foreground font-medium">User ID(s)</Label>
          <div className="col-span-3">
            <Input 
              id="users" 
              value={config.users} 
              onChange={e => { 
                setConfig(p => ({ ...p, users: e.target.value })); 
                // Clear error for users if user starts typing
                // setErrors(err => ({...err, users: ''})); 
              }} 
              placeholder="Comma-separated User IDs, e.g., user1,user2" 
              className="w-full border-input focus:ring-primary" 
            />
            {errors && errors.users && <p className="text-sm text-destructive mt-1">{errors.users}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default UserSection;