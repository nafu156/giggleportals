
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Building } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = loginUser(email, password);
      login(user);
      // Redirect will happen in login function
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Login to CareerCompass</CardTitle>
              <CardDescription className="text-center">Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-studyportal-blue hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm">
                  <span className="text-gray-600">Don't have an account?</span>
                  <div className="flex gap-2 justify-center mt-2">
                    <Link to="/student/register" className="flex items-center">
                      <Button variant="outline" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Register as Student
                      </Button>
                    </Link>
                    <Link to="/institution/register" className="flex items-center">
                      <Button variant="outline" className="flex items-center">
                        <Building className="mr-2 h-4 w-4" />
                        Register as Institution
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
