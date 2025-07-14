import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { apiEndpoints } from '../../config/config';

interface Achievement {
  id?: number;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  description: string;
  achievementType: string;
  badgeImageUrl: string;
  displayOrder: number;
  isFeatured: boolean;
}

const AchievementForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [achievement, setAchievement] = useState<Achievement>({
    title: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
    achievementType: '',
    badgeImageUrl: '',
    displayOrder: 0,
    isFeatured: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const achievementTypes = [
    'Certification',
    'Award',
    'License',
    'Course Completion',
    'Competition',
    'Recognition',
    'Publication',
    'Patent',
    'Other'
  ];

  useEffect(() => {
    if (isEditing && id) {
      fetchAchievement(parseInt(id));
    }
  }, [id, isEditing]);

  const fetchAchievement = async (achievementId: number) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.achievements.base}/${achievementId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAchievement(data);
      } else {
        setError('Failed to fetch achievement data');
      }
    } catch (error) {
      setError('Error fetching achievement data');
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
        ? `${apiEndpoints.achievements.base}/${id}`
        : apiEndpoints.achievements.base;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(achievement)
      });

      if (response.ok) {
        setSuccess(isEditing ? 'Achievement updated successfully!' : 'Achievement created successfully!');
        setTimeout(() => {
          navigate('/admin/achievements');
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

  const handleInputChange = (field: keyof Achievement, value: string | boolean | number) => {
    setAchievement(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate('/admin/achievements');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Achievements
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Achievement' : 'Add New Achievement'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Update achievement information' : 'Create a new achievement entry'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={achievement.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issuingOrganization">Issuing Organization</Label>
                  <Input
                    id="issuingOrganization"
                    value={achievement.issuingOrganization}
                    onChange={(e) => handleInputChange('issuingOrganization', e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievementType">Type</Label>
                  <Select
                    value={achievement.achievementType}
                    onValueChange={(value) => handleInputChange('achievementType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {achievementTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={achievement.issueDate}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={achievement.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input
                    id="credentialId"
                    value={achievement.credentialId}
                    onChange={(e) => handleInputChange('credentialId', e.target.value)}
                    placeholder="Unique credential identifier"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialUrl">Credential URL</Label>
                  <Input
                    id="credentialUrl"
                    type="url"
                    value={achievement.credentialUrl}
                    onChange={(e) => handleInputChange('credentialUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="badgeImageUrl">Badge Image URL</Label>
                <Input
                  id="badgeImageUrl"
                  type="url"
                  value={achievement.badgeImageUrl}
                  onChange={(e) => handleInputChange('badgeImageUrl', e.target.value)}
                  placeholder="https://example.com/badge.png"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={achievement.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  placeholder="Describe what this achievement represents"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={achievement.isFeatured}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked as boolean)}
                  />
                  <Label htmlFor="isFeatured">Featured achievement</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={achievement.displayOrder}
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

export default AchievementForm;