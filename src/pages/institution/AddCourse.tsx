
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { addProgram } from '@/services/programsService';
import { useToast } from '@/hooks/use-toast';

const AddCourse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    discipline: '',
    degree: 'Bachelor',
    duration: '',
    tuition: '',
    description: '',
    location: '',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f',
    deadline: '',
    language: 'English',
    requirements: '',
    applicationFee: '',
    scholarships: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to add programs",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const requirementsArray = formData.requirements
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      const newProgram = {
        ...formData,
        university: user.name,
        requirements: requirementsArray,
      };
      
      addProgram(newProgram);
      
      toast({
        title: "Program added successfully",
        description: "Your new program has been added to the platform.",
      });
      
      navigate('/institution/dashboard');
    } catch (error) {
      toast({
        title: "Error adding program",
        description: "There was a problem adding your program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-studyportal-blue mb-8">Add New Educational Program</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Program Title*</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        placeholder="e.g. Computer Science" 
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="discipline">Discipline*</Label>
                      <Input 
                        id="discipline" 
                        name="discipline" 
                        placeholder="e.g. Engineering" 
                        value={formData.discipline}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree Type*</Label>
                      <Select 
                        name="degree" 
                        value={formData.degree} 
                        onValueChange={(value) => handleSelectChange('degree', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="Master">Master's Degree</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location*</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        placeholder="e.g. New York, USA" 
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration*</Label>
                      <Input 
                        id="duration" 
                        name="duration" 
                        placeholder="e.g. 4 years" 
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tuition">Tuition Fee*</Label>
                      <Input 
                        id="tuition" 
                        name="tuition" 
                        placeholder="e.g. $10,000 per year" 
                        value={formData.tuition}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Program Description*</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Describe the program, its objectives, and benefits..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                
                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input 
                        id="deadline" 
                        name="deadline" 
                        placeholder="e.g. May 1, 2024" 
                        value={formData.deadline}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language of Instruction</Label>
                      <Input 
                        id="language" 
                        name="language" 
                        placeholder="e.g. English" 
                        value={formData.language}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicationFee">Application Fee</Label>
                      <Input 
                        id="applicationFee" 
                        name="applicationFee" 
                        placeholder="e.g. $50" 
                        value={formData.applicationFee}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="scholarships" className="block mb-2">Scholarships Available</Label>
                      <div className="flex items-center">
                        <Switch 
                          id="scholarships"
                          checked={formData.scholarships}
                          onCheckedChange={(checked) => handleSwitchChange('scholarships', checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {formData.scholarships ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Entry Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    name="requirements" 
                    placeholder="List each requirement on a new line..."
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                  />
                  <p className="text-sm text-gray-500">Enter each requirement on a new line.</p>
                </div>
                
                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Program Image URL</Label>
                  <Input 
                    id="imageUrl" 
                    name="imageUrl" 
                    placeholder="https://..."
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-gray-500">A default image will be used if none is provided.</p>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/institution/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-studyportal-blue hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding Program..." : "Add Program"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddCourse;
