import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { Save } from 'lucide-react';
import { projectService, type Project } from '../../services/projectService';

interface ProjectFormProps {
  project?: Project | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project: initialProject, onSuccess, onCancel }) => {
  const isEditing = Boolean(initialProject?.id);
  
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
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
    displayOrder: 0,
    status: 'planning'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (initialProject) {
      setProject(initialProject);
    }
  }, [initialProject]);



  const handleInputChange = (field: keyof Project, value: any) => {
    setProject(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let result;
      if (isEditing && project.id) {
        result = await projectService.updateProject(project.id, project);
      } else {
        const { id, ...projectData } = project;
        result = await projectService.createProject(projectData);
      }

      if (result.success) {
        setSuccess(isEditing ? 'Project updated successfully!' : 'Project created successfully!');
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 1500);
      } else {
        setError(result.message || 'Failed to save project');
        if (result.message?.includes('Access denied')) {
          alert('Session expired. Please login again.');
        }
      }
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Error saving project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={project.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter project title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={project.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  placeholder="Detailed project description"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={project.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={project.endDate || ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectUrl">Project URL</Label>
                  <Input
                    id="projectUrl"
                    type="url"
                    value={project.projectUrl || ''}
                    onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={project.githubUrl || ''}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input
                    id="demoUrl"
                    type="url"
                    value={project.demoUrl || ''}
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
                  value={project.imageUrl || ''}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used *</Label>
                <Input
                  id="technologies"
                  value={project.technologies}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB, AWS"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="features">Key Features</Label>
                <Textarea
                  id="features"
                  value={project.features || ''}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  rows={3}
                  placeholder="List key features (one per line)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={project.clientName || ''}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    placeholder="Client or company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size *</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    min="1"
                    value={project.teamSize}
                    onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="myRole">My Role *</Label>
                  <Input
                    id="myRole"
                    value={project.myRole}
                    onChange={(e) => handleInputChange('myRole', e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="completionPercentage">Completion % *</Label>
                  <Input
                    id="completionPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={project.completionPercentage}
                    onChange={(e) => handleInputChange('completionPercentage', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    id="isFeatured"
                    checked={project.isFeatured}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked as boolean)}
                  />
                  <Label htmlFor="isFeatured">Featured project</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={project.displayOrder}
                    onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
                </Button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default ProjectForm;