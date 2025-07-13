import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Save, X, FolderOpen, CheckCircle, ExternalLink, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Project {
  id?: number;
  title: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  projectUrl: string;
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  technologies: string;
  features: string;
  clientName: string;
  teamSize: number;
  myRole: string;
  completionPercentage: number;
  isFeatured: boolean;
  displayOrder: number;
}

interface ProjectManagerProps {
  onUpdate: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ onUpdate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  const emptyProject: Project = {
    title: '',
    description: '',
    shortDescription: '',
    startDate: '',
    endDate: '',
    status: 'PLANNING',
    projectUrl: '',
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    technologies: '',
    features: '',
    clientName: '',
    teamSize: 1,
    myRole: '',
    completionPercentage: 0,
    isFeatured: false,
    displayOrder: 0
  };

  const projectStatuses = [
    { value: 'PLANNING', label: 'Planning' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'ON_HOLD', label: 'On Hold' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8080/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingProject.id 
        ? `http://localhost:8080/api/projects/${editingProject.id}`
        : 'http://localhost:8080/api/projects';
      
      const method = editingProject.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingProject)
      });

      if (response.ok) {
        setSuccess(editingProject.id ? 'Project updated successfully!' : 'Project created successfully!');
        setIsDialogOpen(false);
        setEditingProject(null);
        fetchProjects();
        onUpdate();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Operation failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Project deleted successfully!');
        fetchProjects();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting project');
    }
  };

  const openDialog = (project?: Project) => {
    setEditingProject(project ? { ...project } : { ...emptyProject });
    setIsDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: keyof Project, value: string | boolean | number) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, [field]: value });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PLANNING': return 'bg-yellow-100 text-yellow-800';
      case 'ON_HOLD': return 'bg-orange-100 text-orange-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentProjects = projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'PLANNING');
  const finishedProjects = projects.filter(p => p.status === 'COMPLETED');

  const renderProjectCard = (project: Project) => (
    <Card key={project.id}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="h-8 w-8 text-blue-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                {project.isFeatured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                  {projectStatuses.find(s => s.value === project.status)?.label}
                </span>
              </div>
              
              {project.shortDescription && (
                <p className="text-gray-600 mb-2">{project.shortDescription}</p>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                <div>
                  <span className="font-medium">Start:</span> {formatDate(project.startDate)}
                </div>
                {project.endDate && (
                  <div>
                    <span className="font-medium">End:</span> {formatDate(project.endDate)}
                  </div>
                )}
                {project.clientName && (
                  <div>
                    <span className="font-medium">Client:</span> {project.clientName}
                  </div>
                )}
                {project.myRole && (
                  <div>
                    <span className="font-medium">Role:</span> {project.myRole}
                  </div>
                )}
              </div>
              
              {project.completionPercentage > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${project.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {project.technologies && (
                <div className="mb-3">
                  <span className="text-xs font-medium text-gray-500">Technologies: </span>
                  <span className="text-xs text-gray-600">{project.technologies}</span>
                </div>
              )}
              
              <div className="flex gap-2">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-3 w-3" /> Website
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
                  >
                    <Github className="h-3 w-3" /> GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800"
                  >
                    <ExternalLink className="h-3 w-3" /> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openDialog(project)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => project.id && handleDelete(project.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-gray-600">Manage current and finished projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              <DialogDescription>
                {editingProject?.id ? 'Update project information' : 'Create a new project entry'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={editingProject?.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingProject?.status || 'PLANNING'}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  value={editingProject?.shortDescription || ''}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  placeholder="Brief project summary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  value={editingProject?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  placeholder="Detailed project description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editingProject?.startDate || ''}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editingProject?.endDate || ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectUrl">Project URL</Label>
                  <Input
                    id="projectUrl"
                    type="url"
                    value={editingProject?.projectUrl || ''}
                    onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={editingProject?.githubUrl || ''}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input
                    id="demoUrl"
                    type="url"
                    value={editingProject?.demoUrl || ''}
                    onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Project Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={editingProject?.imageUrl || ''}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used</Label>
                <Input
                  id="technologies"
                  value={editingProject?.technologies || ''}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB, AWS"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="features">Key Features</Label>
                <Textarea
                  id="features"
                  value={editingProject?.features || ''}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  rows={3}
                  placeholder="List key features (one per line)"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={editingProject?.clientName || ''}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    placeholder="Client or company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    min="1"
                    value={editingProject?.teamSize || 1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('teamSize', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="myRole">My Role</Label>
                  <Input
                    id="myRole"
                    value={editingProject?.myRole || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('myRole', e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="completionPercentage">Completion %</Label>
                  <Input
                    id="completionPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={editingProject?.completionPercentage || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('completionPercentage', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    id="isFeatured"
                    checked={editingProject?.isFeatured || false}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked as boolean)}
                  />
                  <Label htmlFor="isFeatured">Featured project</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={editingProject?.displayOrder || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Current Projects ({currentProjects.length})
          </TabsTrigger>
          <TabsTrigger value="finished" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Finished Projects ({finishedProjects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-6">
          <div className="grid gap-4">
            {currentProjects.map(renderProjectCard)}
            {currentProjects.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No current projects found. Add your first project!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="finished" className="mt-6">
          <div className="grid gap-4">
            {finishedProjects.map(renderProjectCard)}
            {finishedProjects.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No finished projects found. Complete your first project!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManager;