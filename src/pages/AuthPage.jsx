import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, LogIn, UserPlus, Mail, Lock, ChevronsRight, Home, CalendarDays, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const AuthPage = ({ login }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupAddress, setSignupAddress] = useState('');
  const [signupDob, setSignupDob] = useState('');
  const [signupSsnLast4, setSignupSsnLast4] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      login(() => {
        toast({
          title: "Login Successful!",
          description: "Welcome back to LegalAI Portal.",
          variant: "default",
        });
        navigate('/dashboard');
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupName && signupEmail && signupPassword && signupAddress && signupDob && signupSsnLast4) {
      login(() => {
        toast({
          title: "Signup Successful!",
          description: "Your account has been created. Welcome!",
        });
        navigate('/dashboard'); 
      });
    } else {
      toast({
        title: "Signup Failed",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "circOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "circIn" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.div 
        className="flex items-center mb-8 text-white"
        variants={itemVariants}
      >
        <ShieldCheck className="h-12 w-12 text-primary mr-4" />
        <h1 className="text-4xl font-bold tracking-tight">LegalAI Portal</h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="login" className="w-[400px] sm:w-[450px]">
          <TabsList className="grid w-full grid-cols-2 bg-primary/10">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LogIn className="mr-2 h-4 w-4"/> Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UserPlus className="mr-2 h-4 w-4"/> Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="bg-background/80 backdrop-blur-md border-primary/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-primary">Welcome Back!</CardTitle>
                <CardDescription className="text-center">
                  Sign in to access your secure legal portal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={loginEmail} 
                        onChange={(e) => setLoginEmail(e.target.value)} 
                        required 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                     <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="login-password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={loginPassword} 
                        onChange={(e) => setLoginPassword(e.target.value)} 
                        required 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity duration-300">
                    Login <ChevronsRight className="ml-2 h-4 w-4"/>
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" className="text-sm text-primary">Forgot password?</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="bg-background/80 backdrop-blur-md border-primary/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-primary">Create Account</CardTitle>
                <CardDescription className="text-center">
                  Join our secure platform to manage your legal needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <form onSubmit={handleSignup} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" placeholder="John Doe" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-address">Address</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="signup-address" placeholder="123 Main St, Anytown, USA" value={signupAddress} onChange={(e) => setSignupAddress(e.target.value)} required className="pl-10"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="signup-dob">Date of Birth</Label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="signup-dob" type="date" value={signupDob} onChange={(e) => setSignupDob(e.target.value)} required className="pl-10"/>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="signup-ssn">Last 4 SSN</Label>
                      <div className="relative">
                        <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="signup-ssn" type="text" placeholder="1234" maxLength="4" pattern="\d{4}" value={signupSsnLast4} onChange={(e) => setSignupSsnLast4(e.target.value)} required className="pl-10"/>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-email">Email Address</Label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="signup-email" type="email" placeholder="name@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="pl-10"/>
                      </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="signup-password" type="password" placeholder="••••••••" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required className="pl-10"/>
                      </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity duration-300 pt-2">
                    Sign Up <UserPlus className="ml-2 h-4 w-4"/>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      <motion.p 
        className="mt-8 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} LegalAI Portal. All rights reserved. <br />
        Your security is our priority.
      </motion.p>
    </motion.div>
  );
};

export default AuthPage;