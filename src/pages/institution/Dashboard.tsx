
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllPrograms, getApplicationsByInstitution } from '@/services/programsService';
import { GraduationCap, BookOpen, PlusCircle, Users, Clock } from 'lucide-react';

const InstitutionDashboard = () => {
  const { user } = useAuth();
  
  // Get institution programs
  const allPrograms = getAllPrograms();
  const institutionPrograms = allPrograms.filter(p => p.university === user?.name);
  
  // Get all applications for this institution's programs
  const applications = user ? getApplicationsByInstitution(user.id) : [];
  const pendingApplications = applications.filter(app => app.status === 'pending');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-studyportal-blue">Institution Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/institution/add-course">
              <Button className="bg-studyportal-blue hover:bg-blue-700">
                <PlusCircle size={16} className="mr-2" />
                Add New Program
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-studyportal-blue" />
                Programs
              </CardTitle>
              <CardDescription>Your listed education programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{institutionPrograms.length}</div>
              <p className="text-sm text-gray-500 mt-1">Total programs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-studyportal-orange" />
                Applications
              </CardTitle>
              <CardDescription>Student applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applications.length}</div>
              <p className="text-sm text-gray-500 mt-1">Total applications received</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Pending
              </CardTitle>
              <CardDescription>Awaiting your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingApplications.length}</div>
              <p className="text-sm text-gray-500 mt-1">Pending applications</p>
              {pendingApplications.length > 0 && (
                <Link to="/institution/applications">
                  <Button variant="outline" className="mt-4 w-full">
                    Review Applications
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Programs List */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Programs</h2>
            <Link to="/institution/add-course">
              <Button variant="outline" size="sm">
                <PlusCircle size={16} className="mr-2" />
                Add New
              </Button>
            </Link>
          </div>
          
          {institutionPrograms.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg text-gray-600">You haven't added any programs yet.</p>
                <p className="text-gray-500 mt-2 mb-6">Add your first educational program to start receiving applications.</p>
                <Link to="/institution/add-course">
                  <Button className="bg-studyportal-blue hover:bg-blue-700">
                    <PlusCircle size={16} className="mr-2" />
                    Add Your First Program
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutionPrograms.map(program => (
                <Card key={program.id} className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <img 
                    src={program.imageUrl} 
                    alt={program.title} 
                    className="h-48 w-full object-cover"
                  />
                  <CardContent className="p-5">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="mr-2">{program.degree}</span>
                      <span className="mx-2">•</span>
                      <span>{program.discipline}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-studyportal-blue">
                      {program.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mt-2 mb-4">
                      <GraduationCap size={16} className="mr-1" />
                      <span>{program.university}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Applications: </span>
                        <span className="font-medium">
                          {applications.filter(a => a.program.id === program.id).length}
                        </span>
                      </div>
                      <Link to={`/gig/${program.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionDashboard;
