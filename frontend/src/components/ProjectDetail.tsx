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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold text-red-600">{error || 'Project not found'}</h2>
        </div>
      </div>
    );
  }

  const status = project.status || 'planning'; // Default to planning if not set

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()} 
          className="mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        <Card className="bg-white border-gray-200 mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900">{project.title}</CardTitle>
                <Badge className={`${getStatusColor(status)} mt-2`}>
                  {getStatusIcon(status)}
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </Badge>
              </div>
              {project.isFeatured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Star className="h-4 w-4 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {project.imageUrl && (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-64 object-cover rounded-lg mb-6" 
              />
            )}
            <p className="text-gray-600 mb-6">{project.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Project Timeline</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Ongoing'}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Team & Role</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  Team Size: {project.teamSize} | My Role: {project.myRole}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {parseTechnologies(project.technologies).map((tech, index) => (
                  <Badge key={index} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>

            {project.features && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {project.features.split('\n').map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              {project.projectUrl && (
                <Button variant="outline" asChild>
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Project Site
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="outline" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4 mr-2" />
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