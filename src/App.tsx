
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GigsPage from "./pages/GigsPage";
import GigDetail from "./pages/GigDetail";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import StudentRegistration from "./pages/student/Registration";
import InstitutionRegistration from "./pages/institution/Registration";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/Dashboard";
import CourseDetail from "./pages/student/CourseDetail";
import MyApplications from "./pages/student/MyApplications";
import InstitutionDashboard from "./pages/institution/Dashboard";
import AddCourse from "./pages/institution/AddCourse";
import ManageApplications from "./pages/institution/ManageApplications";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gigs" element={<GigsPage />} />
            <Route path="/gig/:id" element={<GigDetail />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route path="/student/register" element={<StudentRegistration />} />
            <Route path="/student/dashboard" element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/applications" element={
              <ProtectedRoute requiredRole="student">
                <MyApplications />
              </ProtectedRoute>
            } />
            <Route path="/student/course/:degree/:id" element={
              <ProtectedRoute requiredRole="student">
                <CourseDetail />
              </ProtectedRoute>
            } />

            {/* Institution Routes */}
            <Route path="/institution/register" element={<InstitutionRegistration />} />
            <Route path="/institution/dashboard" element={
              <ProtectedRoute requiredRole="institution">
                <InstitutionDashboard />
              </ProtectedRoute>
            } />
            <Route path="/institution/add-course" element={
              <ProtectedRoute requiredRole="institution">
                <AddCourse />
              </ProtectedRoute>
            } />
            <Route path="/institution/applications" element={
              <ProtectedRoute requiredRole="institution">
                <ManageApplications />
              </ProtectedRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
