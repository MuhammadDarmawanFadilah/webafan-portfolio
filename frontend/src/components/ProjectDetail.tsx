import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Code2, ExternalLink, Github, Play, Star, Clock, Target, CheckCircle, ChevronLeft } from 'lucide-react';
import { projectService, type Project } from '../services/projectService';

import { Skeleton } from '@/components/ui/skeleton';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const response = await projectService.getProject(parseInt(id));
        if (response.success && response.data) {
          setProject(response.data);
        } else {
          setError(response.message || 'Failed to fetch project details');
        }
      } catch (err) {
        setError('Error fetching project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'planning': return <Target className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const parseTechnologies = (tech: string): string[] => {
    return tech.split(',').map(t => t.trim()).filter(t => t.length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 sm:h-12 w-3/4 mb-4 sm:mb-6" />
          <Skeleton className="h-48 sm:h-64 w-full mb-3 sm:mb-4" />
          <Skeleton className="h-24 sm:h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto text-center py-12 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600">{error || 'Project not found'}</h2>
        </div>
      </div>
    );
  }

  const status = project.status || 'planning'; // Default to planning if not set

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()} 
          className="mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden xs:inline">Back to Projects</span>
          <span className="xs:hidden">Back</span>
        </Button>

        <Card className="bg-white border-gray-200 mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
              <div className="flex-1">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{project.title}</CardTitle>
                <Badge className={`${getStatusColor(status)} mt-2 text-xs sm:text-sm`}>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1">
                    {getStatusIcon(status)}
                  </div>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </Badge>
              </div>
              {project.isFeatured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm self-start">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {project.imageUrl && (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6" 
              />
            )}
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{project.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Project Timeline</h3>
                <div className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    {new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Ongoing'}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Team & Role</h3>
                <div className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    <span className="block sm:inline">Team Size: {project.teamSize}</span>
                    <span className="hidden sm:inline"> | </span>
                    <span className="block sm:inline">My Role: {project.myRole}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Technologies</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {parseTechnologies(project.technologies).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs sm:text-sm px-2 py-1">{tech}</Badge>
                ))}
              </div>
            </div>

            {project.features && (
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Key Features</h3>
                <ul className="list-disc pl-4 sm:pl-5 text-gray-600 text-xs sm:text-sm space-y-1">
                  {project.features.split('\n').map((feature, index) => (
                    <li key={index} className="leading-relaxed">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {project.projectUrl && (
                <Button variant="outline" asChild className="text-xs sm:text-sm">
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Project Site
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild className="text-xs sm:text-sm">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="outline" asChild className="text-xs sm:text-sm">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;