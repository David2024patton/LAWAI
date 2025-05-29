
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, UploadCloud, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DocumentsPage = () => {
  const documents = [
    { id: 'D001', name: 'Contract_Agreement_v3.pdf', case: 'Alpha Corp vs. Beta LLC', type: 'Contract', uploaded: '2025-05-26', size: '2.3 MB' },
    { id: 'D002', name: 'Evidence_Photos.zip', case: 'Patent Infringement Case X', type: 'Evidence', uploaded: '2025-05-22', size: '15.7 MB' },
    { id: 'D003', name: 'Meeting_Minutes_2025-05-10.docx', case: 'Alpha Corp vs. Beta LLC', type: 'Minutes', uploaded: '2025-05-11', size: '120 KB' },
    { id: 'D004', name: 'Deposition_Transcript_JaneSmith.txt', case: 'Patent Infringement Case X', type: 'Transcript', uploaded: '2025-05-28', size: '450 KB' },
  ];

  const itemVariants = {
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
          Document Hub
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search documents..." className="pl-10 w-full sm:w-64 bg-muted/50 border-transparent focus:border-primary focus:bg-background" />
          </div>
          <Button variant="outline" className="hidden sm:inline-flex">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      </motion.div>
      
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <motion.custom
            key={doc.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            whileHover={{ y: -3, boxShadow: "0px 6px 12px hsla(var(--primary), 0.1)"}}
          >
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-transparent bg-card/80 backdrop-blur-sm hover:border-primary/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-md">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">Case: {doc.case} &bull; Type: {doc.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{doc.uploaded}</p>
                  <p className="text-xs text-muted-foreground">{doc.size}</p>
                </div>
              </CardContent>
            </Card>
          </motion.custom>
        ))}
      </div>

      {documents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Documents Found</h2>
          <p className="text-muted-foreground mb-4">Upload your first document to get started.</p>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DocumentsPage;
