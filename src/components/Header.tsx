
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Globe, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-studyportal-blue">StudyPortals</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-studyportal-blue font-medium">Home</Link>
              <Link to="/gigs" className="text-gray-700 hover:text-studyportal-blue font-medium">Programs</Link>
              <Link to="/destinations" className="text-gray-700 hover:text-studyportal-blue font-medium">Destinations</Link>
              <Link to="/disciplines" className="text-gray-700 hover:text-studyportal-blue font-medium">Disciplines</Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="rounded-full">
              <Search size={18} className="mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Globe size={18} className="mr-2" />
              EN
            </Button>
            <Button className="bg-studyportal-blue hover:bg-blue-700 text-white rounded-full">Sign In</Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
