import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Code2,
  ExternalLink,
  Github,
  Play,
  Star,
  Clock,
  CheckCircle,
  Target,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { apiEndpoints } from '../config/config';

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[] | string;
  features?: string[];
  status: string;
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  projectUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  teamSize?: number;
  myRole?: string;
  clientName?: string;
  completionPercentage?: number;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (autoPlay && projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % projects.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, projects.length]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoints.projects.public.all);
      if (response.ok) {
        const data = await response.json();
        setProjects(data.filter((project: Project) => project.isFeatured));
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTechnologies = (technologies: string[] | string) => {
    if (!technologies) return [];
    if (Array.isArray(technologies)) {
      return technologies;
    }
    return technologies.split(',').map(tech => tech.trim());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'planning':
        return <Target className="h-4 w-4" />;
      default:
        return <Code2 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white';
      case 'in_progress':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white';
      case 'planning':
        return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-600 text-white';
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-100">
              <Sparkles className="h-4 w-4" />
              Professional Portfolio
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4 w-64 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-96 bg-gradient-to-r from-gray-100 to-gray-200"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-100">
            <Code2 className="h-4 w-4" />
            Professional Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projects Coming Soon
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exciting projects are currently in development. Check back soon to see the latest work.
          </p>
        </div>
      </section>
    );
  }

  const currentProject = projects[currentSlide];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-blue-100">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            Professional Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Showcasing innovative solutions and technical excellence in modern software development
          </p>
        </div>

        {/* Project Slideshow */}
        <div className="relative">
          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Project Content */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start lg:items-center">
                {/* Project Info - Left Side */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* Status and Featured Badge */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 border-0 shadow-sm font-semibold text-xs sm:text-sm">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured Project
                    </Badge>
                    <Badge className={`border-0 shadow-sm font-semibold text-xs sm:text-sm ${getStatusColor(currentProject.status)}`}>
                      {getStatusIcon(currentProject.status)}
                      <span className="ml-1">{currentProject.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>

                  {/* Project Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                      {currentProject.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {currentProject.shortDescription || currentProject.description}
                    </p>
                  </div>

                  {/* Project Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 py-3 sm:py-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                      <span className="font-medium">Started:</span>
                      <span className="truncate">{formatDate(currentProject.startDate)}</span>
                    </div>
                    {currentProject.teamSize && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        <span className="font-medium">Team:</span>
                        <span className="truncate">{currentProject.teamSize} members</span>
                      </div>
                    )}
                    {currentProject.completionPercentage && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" />
                        <span className="font-medium">Progress:</span>
                        <span className="truncate">{currentProject.completionPercentage}%</span>
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Code2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">Technologies Used</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {getTechnologies(currentProject.technologies).map((tech, index) => (
                        <Badge 
                          key={index}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200 hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300 font-medium text-xs sm:text-sm px-2 sm:px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4">
                    {currentProject.projectUrl && (
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg font-semibold text-sm sm:text-base py-2 sm:py-2.5"
                        onClick={() => window.open(currentProject.projectUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        View Project
                      </Button>
                    )}
                    {currentProject.githubUrl && (
                      <Button 
                        variant="outline"
                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm sm:text-base py-2 sm:py-2.5"
                        onClick={() => window.open(currentProject.githubUrl, '_blank')}
                      >
                        <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Source Code
                      </Button>
                    )}
                    {currentProject.demoUrl && (
                      <Button 
                        variant="outline"
                        className="border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold text-sm sm:text-base py-2 sm:py-2.5"
                        onClick={() => window.open(currentProject.demoUrl, '_blank')}
                      >
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Project Stats - Right Side */}
                <div className="lg:col-span-1 order-first lg:order-last">
                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100">
                    <div className="text-center mb-4 sm:mb-6">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                        <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                        Project Highlights
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-1">
                          {currentSlide + 1} / {projects.length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Featured Projects</div>
                      </div>
                      
                      {currentProject.myRole && (
                        <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 truncate">
                            {currentProject.myRole}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">My Role</div>
                        </div>
                      )}
                      
                      {currentProject.clientName && (
                        <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 truncate">
                            {currentProject.clientName}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">Client</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mt-6 sm:mt-8">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="default"
              onClick={prevSlide}
              className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm font-semibold text-sm sm:text-base py-2 sm:py-2.5"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Previous
            </Button>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2 sm:gap-3 order-first sm:order-none">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 scale-125 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="default"
              onClick={nextSlide}
              className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm font-semibold text-sm sm:text-base py-2 sm:py-2.5"
            >
              Next
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            </Button>
          </div>

          {/* Auto-play Indicator */}
          <div className="text-center mt-4 sm:mt-6">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                autoPlay
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                autoPlay ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              {autoPlay ? 'Auto-play Active' : 'Auto-play Paused'}
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg sm:rounded-xl p-6 sm:p-8 border border-blue-100 shadow-sm">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                <Layers className="h-3 w-3 sm:h-4 sm:w-4" />
                Professional Portfolio
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                Interested in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Collaboration?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
                Let's discuss how we can work together to bring your next project to life with innovative solutions.
              </p>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg font-semibold text-sm sm:text-base"
                onClick={() => window.location.href = '#contact'}
              >
                Get In Touch
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;