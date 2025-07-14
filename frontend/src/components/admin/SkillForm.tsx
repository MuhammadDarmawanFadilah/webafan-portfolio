import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, Save, Star } from 'lucide-react';
import { apiEndpoints } from '../../config/config';

interface Skill {
  id?: number;
  skillName: string;
  skillCategory: string;
  proficiencyLevel: number;
  yearsExperience: number;
  description: string;
  isFeatured: boolean;
  displayOrder: number;
}

const SkillForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<Skill>({
    skillName: '',
    skillCategory: '',
    proficiencyLevel: 0,
    yearsExperience: 0,
    description: '',
    isFeatured: false,
    displayOrder: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const skillCategories = [
    'Programming Languages',
    'Frontend Development',
    'Backend Development',
    'Database',
    'DevOps',
    'Cloud Services',
    'Mobile Development',
    'Design',
    'Tools & Software',
    'Soft Skills',
    'Other'
  ];

  const proficiencyLevels = [
    { value: 1, label: 'Beginner' },
    { value: 2, label: 'Intermediate' },
    { value: 3, label: 'Advanced' },
    { value: 4, label: 'Expert' },
    { value: 5, label: 'Master' }
  ];

  useEffect(() => {
    if (isEditing && id) {
      fetchSkill(parseInt(id));
    }
  }, [isEditing, id]);

  const fetchSkill = async (skillId: number) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.skills.base}/${skillId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        setError('Failed to fetch skill data');
      }
    } catch (error) {
      setError('Error loading skill data');
    }
  };

  const handleInputChange = (field: keyof Skill, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = isEditing && formData.id 
        ? `${apiEndpoints.skills.base}/${formData.id}`
        : apiEndpoints.skills.base;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(isEditing ? 'Skill updated successfully!' : 'Skill created successfully!');
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

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Skill' : 'Add New Skill'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Update skill information' : 'Create a new skill entry'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Skill' : 'New Skill'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Skill Name</Label>
                  <Input
                    id="name"
                    value={formData.skillName}
                    onChange={(e) => handleInputChange('skillName', e.target.value)}
                    placeholder="e.g., Java, React, Python"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.skillCategory}
                    onValueChange={(value) => handleInputChange('skillCategory', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proficiencyLevel">Proficiency Level</Label>
                  <Select
                    value={formData.proficiencyLevel.toString()}
                    onValueChange={(value) => handleInputChange('proficiencyLevel', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value.toString()}>
                          <div className="flex items-center gap-2">
                            <span>{level.label}</span>
                            <div className="flex">
                              {renderStars(level.value)}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    min="0"
                    max="50"
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your experience with this skill..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                  />
                  <Label htmlFor="isFeatured">Featured Skill</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    min="0"
                    value={formData.displayOrder}
                    onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
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

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : (isEditing ? 'Update Skill' : 'Create Skill')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillForm;