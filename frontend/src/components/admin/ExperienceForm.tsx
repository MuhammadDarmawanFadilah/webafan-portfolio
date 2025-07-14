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

const ExperienceForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [experience, setExperience] = useState<Experience>({
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
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      fetchExperience(parseInt(id));
    }
  }, [id, isEditing]);

  const fetchExperience = async (experienceId: number) => {
    try {
      // GET requests to experiences endpoint are public, no auth header needed
      const response = await fetch(`${apiEndpoints.experiences.base}/${experienceId}`);
      
      if (response.ok) {
        const data = await response.json();
        setExperience(data);
      } else {
        setError('Failed to fetch experience data');
      }
    } catch (error) {
      setError('Error fetching experience data');
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
        ? `${apiEndpoints.experiences.base}/${id}`
        : apiEndpoints.experiences.base;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(experience)
      });

      if (response.ok) {
        setSuccess(isEditing ? 'Experience updated successfully!' : 'Experience created successfully!');
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

  const handleInputChange = (field: keyof Experience, value: string | boolean | number) => {
    setExperience(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate('/admin/experiences');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experience
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Experience' : 'Add New Experience'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Update experience information' : 'Create a new work experience entry'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={experience.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={experience.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyLocation">Company Location</Label>
                <Input
                  id="companyLocation"
                  value={experience.companyLocation}
                  onChange={(e) => handleInputChange('companyLocation', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    disabled={experience.isCurrent}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCurrent"
                  checked={experience.isCurrent}
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
                  value={experience.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={experience.responsibilities}
                  onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                  rows={3}
                  placeholder="List key responsibilities (one per line)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements</Label>
                <Textarea
                  id="achievements"
                  value={experience.achievements}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                  rows={3}
                  placeholder="List key achievements (one per line)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used</Label>
                <Input
                  id="technologies"
                  value={experience.technologies}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, Python, AWS"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={experience.displayOrder}
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

export default ExperienceForm;