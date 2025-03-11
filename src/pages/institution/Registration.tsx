
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { registerUser } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Building, Check } from 'lucide-react';

const InstitutionRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = registerUser(email, password, name, 'institution');
      login(user);
      // Redirect will happen in login function
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Failed to register",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-col items-center space-y-2 pb-2">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
              <Building className="h-10 w-10 text-gray-700" />
            </div>
            <h1 className="text-2xl font-bold text-center">Institution Registration</h1>
            <p className="text-gray-500 text-center">
              Register your institution to connect with potential students
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Institution Name</Label>
                <Input 
                  id="name" 
                  placeholder="University of Example" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="joy@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-blue-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="•••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-blue-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="•••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-gray-600 mt-0.5" />
                  <span>Showcase your educational programs to a global audience</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-gray-600 mt-0.5" />
                  <span>Manage applications and student inquiries</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-gray-600 mt-0.5" />
                  <span>Post BSc, MS, and PhD program details</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register Institution"}
              </Button>
              
              <div className="text-center text-sm pt-2">
                <span className="text-gray-600">Already have an account?</span>{' '}
                <Link to="/login" className="text-gray-900 font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InstitutionRegistration;
