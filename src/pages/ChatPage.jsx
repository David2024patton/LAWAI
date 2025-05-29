import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Paperclip, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatPage = () => {
  const cases = [
    { id: 'case-001', name: 'Case Alpha vs. Beta Corp', lastMessage: 'Waiting for your documents...', unread: 2 },
    { id: 'case-002', name: 'Property Dispute - Johnson Estate', lastMessage: 'The hearing is scheduled for next month.', unread: 0 },
    { id: 'case-003', name: 'Intellectual Property Claim', lastMessage: 'Please review the attached draft.', unread: 1 },
    { id: 'case-004', name: 'Merger & Acquisition - Tech Solutions', lastMessage: 'Finalizing due diligence reports.', unread: 0 },
    { id: 'case-005', name: 'Employment Agreement Review', lastMessage: 'Any updates on the non-compete clause?', unread: 5 },
  ];
  const selectedCaseId = 'case-001'; 
  const messages = [
    { id: 1, sender: 'AI Assistant', text: 'Hello! How can I assist you with Case Alpha vs. Beta Corp today?', time: '10:00 AM', type: 'received' },
    { id: 2, sender: 'You', text: 'I need to upload some new evidence files.', time: '10:01 AM', type: 'sent' },
    { id: 3, sender: 'AI Assistant', text: 'Certainly. You can use the attachment icon below. What type of files are they?', time: '10:02 AM', type: 'received' },
    { id: 4, sender: 'You', text: 'They are PDF documents and a few images.', time: '10:03 AM', type: 'sent' },
    { id: 5, sender: 'AI Assistant', text: 'Understood. Please proceed with the upload. I will notify you once they are processed.', time: '10:04 AM', type: 'received' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-[calc(100vh-theme(space.20)-theme(space.12))] overflow-hidden" // Adjust height based on header and padding
    >
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-1/3 lg:w-1/4 border-r border-border bg-background/50 p-4 flex flex-col"
      >
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search cases..." className="pl-10 w-full bg-muted/50 border-transparent focus:border-primary focus:bg-background" />
        </div>
        <h2 className="text-lg font-semibold mb-4 text-primary">Your Cases</h2>
        <ScrollArea className="flex-grow pr-2">
          <div className="space-y-2">
            {cases.map((c) => (
              <Card 
                key={c.id} 
                className={`p-3 cursor-pointer hover:shadow-md transition-shadow ${selectedCaseId === c.id ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-muted/50'}`}
              >
                <h3 className="font-medium text-sm truncate">{c.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                {c.unread > 0 && (
                  <div className="mt-1 text-xs text-primary-foreground bg-primary rounded-full px-2 py-0.5 inline-block">
                    {c.unread} new
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </motion.div>

      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="flex-1 flex flex-col p-4 md:p-6 bg-gradient-to-br from-background to-background/90 dark:from-neutral-900 dark:to-neutral-950/90"
      >
        <CardHeader className="pb-4 border-b border-border mb-4">
          <CardTitle className="text-xl">
            {cases.find(c => c.id === selectedCaseId)?.name || "Select a Case"}
          </CardTitle>
        </CardHeader>
        
        <ScrollArea className="flex-grow mb-4 pr-2">
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: msg.type === 'sent' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md p-3 rounded-xl shadow ${
                    msg.type === 'sent' 
                      ? 'bg-primary text-primary-foreground rounded-br-none' 
                      : 'bg-card text-card-foreground rounded-bl-none border border-border'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'sent' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-auto flex items-center space-x-2 pt-4 border-t border-border">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 bg-muted/50 border-transparent focus:border-primary focus:bg-background" 
          />
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <Send className="h-5 w-5 mr-0 md:mr-2" />
            <span className="hidden md:inline">Send</span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatPage;