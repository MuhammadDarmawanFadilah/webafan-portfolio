import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Save, X, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface Education {
  id?: number;
  degree: string;
  fieldOfStudy: string;
  institutionName: string;
  institutionLocation: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa: number;
  maxGpa: number;
  description: string;
  displayOrder: number;
}

interface EducationManagerProps {
  onUpdate: () => void;
}

const EducationManager: React.FC<EducationManagerProps> = ({ onUpdate }) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyEducation: Education = {
    degree: '',
    fieldOfStudy: '',
    institutionName: '',
    institutionLocation: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    gpa: 0,
    maxGpa: 4.0,
    description: '',
    displayOrder: 0
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8080/api/educations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEducations(data);
      }
    } catch (error) {
      console.error('Error fetching educations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingEducation.id 
        ? `http://localhost:8080/api/educations/${editingEducation.id}`
        : 'http://localhost:8080/api/educations';
      
      const method = editingEducation.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingEducation)
      });

      if (response.ok) {
        setSuccess(editingEducation.id ? 'Education updated successfully!' : 'Education created successfully!');
        setIsDialogOpen(false);
        setEditingEducation(null);
        fetchEducations();
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
    if (!confirm('Are you sure you want to delete this education?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8080/api/educations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Education deleted successfully!');
        fetchEducations();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting education');
    }
  };

  const openDialog = (education?: Education) => {
    setEditingEducation(education ? { ...education } : { ...emptyEducation });
    setIsDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: keyof Education, value: string | boolean | number) => {
    if (editingEducation) {
      setEditingEducation({ ...editingEducation, [field]: value });
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
          <h2 className="text-2xl font-bold">Education Management</h2>
          <p className="text-gray-600">Manage educational background and qualifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEducation?.id ? 'Edit Education' : 'Add New Education'}</DialogTitle>
              <DialogDescription>
                {editingEducation?.id ? 'Update education information' : 'Create a new education entry'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={editingEducation?.degree || ''}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    placeholder="e.g., Bachelor of Science"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input
                    id="fieldOfStudy"
                    value={editingEducation?.fieldOfStudy || ''}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input
                    id="institutionName"
                    value={editingEducation?.institutionName || ''}
                    onChange={(e) => handleInputChange('institutionName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutionLocation">Institution Location</Label>
                  <Input
                    id="institutionLocation"
                    value={editingEducation?.institutionLocation || ''}
                    onChange={(e) => handleInputChange('institutionLocation', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editingEducation?.startDate || ''}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editingEducation?.endDate || ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    disabled={editingEducation?.isCurrent}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCurrent"
                  checked={editingEducation?.isCurrent || false}
                  onCheckedChange={(checked) => {
                    handleInputChange('isCurrent', checked as boolean);
                    if (checked) {
                      handleInputChange('endDate', '');
                    }
                  }}
                />
                <Label htmlFor="isCurrent">Currently studying here</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max={editingEducation?.maxGpa || 4.0}
                    value={editingEducation?.gpa || ''}
                    onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGpa">Max GPA</Label>
                  <Input
                    id="maxGpa"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editingEducation?.maxGpa || 4.0}
                    onChange={(e) => handleInputChange('maxGpa', parseFloat(e.target.value) || 4.0)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingEducation?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  placeholder="Additional information, coursework, honors, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={editingEducation?.displayOrder || 0}
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

      {/* Educations List */}
      <div className="grid gap-4">
        {educations.map((education) => (
          <Card key={education.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{education.degree}</h3>
                    <p className="text-purple-600 font-medium">{education.fieldOfStudy}</p>
                    <p className="text-gray-700">{education.institutionName}</p>
                    <p className="text-sm text-gray-500">{education.institutionLocation}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(education.startDate)} - {education.isCurrent ? 'Present' : formatDate(education.endDate)}
                    </p>
                    {education.gpa > 0 && (
                      <p className="text-sm text-gray-600">
                        GPA: {education.gpa.toFixed(2)}/{education.maxGpa.toFixed(2)}
                      </p>
                    )}
                    {education.description && (
                      <p className="text-sm mt-2 text-gray-700">{education.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDialog(education)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => education.id && handleDelete(education.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {educations.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No education records found. Add your first education!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EducationManager;