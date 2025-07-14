import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { apiEndpoints } from '../../config/config';

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

const EducationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [education, setEducation] = useState<Education>({
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
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      fetchEducation(parseInt(id));
    }
  }, [id, isEditing]);

  const fetchEducation = async (educationId: number) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.educations.base}/${educationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
      } else {
        setError('Failed to fetch education data');
      }
    } catch (error) {
      setError('Error fetching education data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = isEditing 
        ? `${apiEndpoints.educations.base}/${id}`
        : apiEndpoints.educations.base;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(education)
      });

      if (response.ok) {
        setSuccess(isEditing ? 'Education updated successfully!' : 'Education created successfully!');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
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

  const handleInputChange = (field: keyof Education, value: string | boolean | number) => {
    setEducation(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate('/admin/educations');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Education
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Education' : 'Add New Education'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Update education information' : 'Create a new education entry'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={education.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    placeholder="e.g., Bachelor of Science"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input
                    id="fieldOfStudy"
                    value={education.fieldOfStudy}
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
                    value={education.institutionName}
                    onChange={(e) => handleInputChange('institutionName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutionLocation">Institution Location</Label>
                  <Input
                    id="institutionLocation"
                    value={education.institutionLocation}
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
                    value={education.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={education.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    disabled={education.isCurrent}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCurrent"
                  checked={education.isCurrent}
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
                    max={education.maxGpa}
                    value={education.gpa || ''}
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
                    value={education.maxGpa}
                    onChange={(e) => handleInputChange('maxGpa', parseFloat(e.target.value) || 4.0)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={education.description}
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
                  value={education.displayOrder}
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
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducationForm;