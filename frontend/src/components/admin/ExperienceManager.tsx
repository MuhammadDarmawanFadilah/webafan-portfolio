import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Save, X, Briefcase } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface Experience {
  id?: number;
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string;
  achievements: string;
  technologies: string;
  displayOrder: number;
}

interface ExperienceManagerProps {
  onUpdate: () => void;
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({ onUpdate }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyExperience: Experience = {
    jobTitle: '',
    companyName: '',
    companyLocation: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    responsibilities: '',
    achievements: '',
    technologies: '',
    displayOrder: 0
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8080/api/experiences', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingExperience.id 
        ? `http://localhost:8080/api/experiences/${editingExperience.id}`
        : 'http://localhost:8080/api/experiences';
      
      const method = editingExperience.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingExperience)
      });

      if (response.ok) {
        setSuccess(editingExperience.id ? 'Experience updated successfully!' : 'Experience created successfully!');
        setIsDialogOpen(false);
        setEditingExperience(null);
        fetchExperiences();
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
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8080/api/experiences/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Experience deleted successfully!');
        fetchExperiences();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting experience');
    }
  };

  const openDialog = (experience?: Experience) => {
    setEditingExperience(experience ? { ...experience } : { ...emptyExperience });
    setIsDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: keyof Experience, value: string | boolean | number) => {
    if (editingExperience) {
      setEditingExperience({ ...editingExperience, [field]: value });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Experience Management</h2>
          <p className="text-gray-600">Manage work experience and career history</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience?.id ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
              <DialogDescription>
                {editingExperience?.id ? 'Update experience information' : 'Create a new work experience entry'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={editingExperience?.jobTitle || ''}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={editingExperience?.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyLocation">Company Location</Label>
                <Input
                  id="companyLocation"
                  value={editingExperience?.companyLocation || ''}
                  onChange={(e) => handleInputChange('companyLocation', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editingExperience?.startDate || ''}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editingExperience?.endDate || ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    disabled={editingExperience?.isCurrent}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCurrent"
                  checked={editingExperience?.isCurrent || false}
                  onCheckedChange={(checked) => {
                    handleInputChange('isCurrent', checked as boolean);
                    if (checked) {
                      handleInputChange('endDate', '');
                    }
                  }}
                />
                <Label htmlFor="isCurrent">Currently working here</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingExperience?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={editingExperience?.responsibilities || ''}
                  onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                  rows={3}
                  placeholder="List key responsibilities (one per line)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements</Label>
                <Textarea
                  id="achievements"
                  value={editingExperience?.achievements || ''}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                  rows={3}
                  placeholder="List key achievements (one per line)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used</Label>
                <Input
                  id="technologies"
                  value={editingExperience?.technologies || ''}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, Python, AWS"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={editingExperience?.displayOrder || 0}
                  onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
                />
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

      {/* Experiences List */}
      <div className="grid gap-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{experience.jobTitle}</h3>
                    <p className="text-blue-600 font-medium">{experience.companyName}</p>
                    <p className="text-sm text-gray-500">{experience.companyLocation}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(experience.startDate)} - {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}
                    </p>
                    {experience.description && (
                      <p className="text-sm mt-2 text-gray-700">{experience.description}</p>
                    )}
                    {experience.technologies && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-gray-500">Technologies: </span>
                        <span className="text-xs text-gray-600">{experience.technologies}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDialog(experience)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => experience.id && handleDelete(experience.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {experiences.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No experiences found. Add your first work experience!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;