import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Users,
  Star,
  ArrowUpRight,
  Sparkles,
  Code2,
  Layers,
  Eye,
  Award,
  TrendingUp,
  Briefcase,
  Filter,
  Search,
  MoreVertical,
  ExternalLink,
  Github,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  X
} from 'lucide-react';
import { projectService, type Project } from '../../services/projectService';
import ProjectForm from './ProjectForm';

interface ProjectManagerProps {
  onUpdate?: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ onUpdate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'planning'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId: number) => {
    try {
      const result = await projectService.deleteProject(projectId);
      
      if (result.success) {
        // Remove project from local state
        setProjects(projects.filter(p => p.id !== projectId));
        // Call onUpdate if provided
        if (onUpdate) {
          onUpdate();
        }
        alert('Project deleted successfully.');
      } else {
        console.error(result.message || 'Failed to delete project');
        alert(result.message || 'Failed to delete project. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project. Please try again.');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects(); // Refresh the projects list
    if (onUpdate) {
      onUpdate();
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleViewProject = (projectId: number) => {
    // For now, we'll show an alert. Later this can be a proper project detail view
    const project = projects.find(p => p.id === projectId);
    if (project) {
      alert(`Project: ${project.title}\n\nDescription: ${project.description}\n\nTechnologies: ${project.technologies}\n\nStatus: ${getProjectStatus(project)}\n\nCompletion: ${project.completionPercentage}%`);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const result = await projectService.getAllProjects();
      if (result.success && result.data) {
        setProjects(result.data);
      } else {
        console.error(result.message || 'Failed to fetch projects');
        if (result.message?.includes('Access denied')) {
          // Optionally redirect to login or show error message
          alert('Session expired. Please login again.');
        }
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

  const getProjectStatus = (project: Project): string => {
    if (project.completionPercentage === 100) {
      return 'completed';
    } else if (project.completionPercentage > 0) {
      return 'in_progress';
    } else {
      return 'planning';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
        return <AlertCircle className="h-4 w-4" />;
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const projectStatus = getProjectStatus(project);
    const matchesStatus = statusFilter === 'all' || projectStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const projectStats = {
    total: projects.length,
    completed: projects.filter(p => getProjectStatus(p) === 'completed').length,
    inProgress: projects.filter(p => getProjectStatus(p) === 'in_progress').length,
    featured: projects.filter(p => p.isFeatured).length
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 mb-4"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-100">
              <Settings className="h-4 w-4" />
              Project Management
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Project <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-lg text-gray-600">Manage and organize your professional projects</p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium mb-4 border border-blue-200">
            <Settings className="h-4 w-4" />
            Project Management
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Project Dashboard
              </h1>
              <p className="text-gray-600">Manage and organize your professional projects</p>
            </div>
            
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{projectStats.total}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{projectStats.completed}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{projectStats.inProgress}</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Featured</p>
                    <p className="text-2xl font-bold text-gray-900">{projectStats.featured}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              />
            </div>
            
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All', icon: Layers },
                { key: 'completed', label: 'Completed', icon: CheckCircle },
                { key: 'in_progress', label: 'In Progress', icon: Clock },
                { key: 'planning', label: 'Planning', icon: Target }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key as any)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    statusFilter === key
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl p-12 max-w-md mx-auto border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Code2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Projects Found</h3>
              <p className="text-gray-500 mb-6">No projects match your current search and filter criteria.</p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden h-full">
                  {/* Simple Project Header */}
                  <div className="relative">
                    {/* Status Indicator */}
                    <div className={`h-1 ${getStatusColor(getProjectStatus(project))}`}></div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            {project.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            )}
                            <Badge className={`text-xs ${getStatusColor(getProjectStatus(project))}`}>
                              {getStatusIcon(getProjectStatus(project))}
                              <span className="ml-1 capitalize">{getProjectStatus(project).replace('_', ' ')}</span>
                            </Badge>
                          </div>
                          
                          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1 mb-2">
                            {project.title}
                          </CardTitle>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </div>
                  
                  <CardContent className="pt-0 flex-1 flex flex-col">
                    {/* Project Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {project.teamSize && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{project.teamSize}</span>
                          </div>
                        )}
                        {project.completionPercentage && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{project.completionPercentage}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                      {getTechnologies(project.technologies).slice(0, 3).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 border-0 text-xs px-2 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {getTechnologies(project.technologies).length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{getTechnologies(project.technologies).length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Simple Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProject(project.id!);
                        }}
                        className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this project?')) {
                            handleDeleteProject(project.id);
                          }
                        }}
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
        
        {/* Ready to Add More Projects? */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Add More Projects?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Showcase your work and build an impressive portfolio that stands out.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Project
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('/projects', '_blank')}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Public Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFormCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <ProjectForm
                project={editingProject}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;