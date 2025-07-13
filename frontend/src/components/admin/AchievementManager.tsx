import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Save, X, Award, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

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

interface AchievementManagerProps {
  onUpdate: () => void;
}

const AchievementManager: React.FC<AchievementManagerProps> = ({ onUpdate }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyAchievement: Achievement = {
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
  };

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
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8080/api/achievements', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingAchievement.id 
        ? `http://localhost:8080/api/achievements/${editingAchievement.id}`
        : 'http://localhost:8080/api/achievements';
      
      const method = editingAchievement.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingAchievement)
      });

      if (response.ok) {
        setSuccess(editingAchievement.id ? 'Achievement updated successfully!' : 'Achievement created successfully!');
        setIsDialogOpen(false);
        setEditingAchievement(null);
        fetchAchievements();
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
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8080/api/achievements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Achievement deleted successfully!');
        fetchAchievements();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting achievement');
    }
  };

  const openDialog = (achievement?: Achievement) => {
    setEditingAchievement(achievement ? { ...achievement } : { ...emptyAchievement });
    setIsDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: keyof Achievement, value: string | boolean | number) => {
    if (editingAchievement) {
      setEditingAchievement({ ...editingAchievement, [field]: value });
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

  const isExpired = (expiryDate: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Achievement Management</h2>
          <p className="text-gray-600">Manage certifications, awards, and achievements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAchievement?.id ? 'Edit Achievement' : 'Add New Achievement'}</DialogTitle>
              <DialogDescription>
                {editingAchievement?.id ? 'Update achievement information' : 'Create a new achievement entry'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingAchievement?.title || ''}
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
                    value={editingAchievement?.issuingOrganization || ''}
                    onChange={(e) => handleInputChange('issuingOrganization', e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievementType">Type</Label>
                  <Select
                    value={editingAchievement?.achievementType || ''}
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
                    value={editingAchievement?.issueDate || ''}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={editingAchievement?.expiryDate || ''}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input
                    id="credentialId"
                    value={editingAchievement?.credentialId || ''}
                    onChange={(e) => handleInputChange('credentialId', e.target.value)}
                    placeholder="Unique credential identifier"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialUrl">Credential URL</Label>
                  <Input
                    id="credentialUrl"
                    type="url"
                    value={editingAchievement?.credentialUrl || ''}
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
                  value={editingAchievement?.badgeImageUrl || ''}
                  onChange={(e) => handleInputChange('badgeImageUrl', e.target.value)}
                  placeholder="https://example.com/badge.png"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingAchievement?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  placeholder="Describe what this achievement represents"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={editingAchievement?.isFeatured || false}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked as boolean)}
                  />
                  <Label htmlFor="isFeatured">Featured achievement</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={editingAchievement?.displayOrder || 0}
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

      {/* Achievements List */}
      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {achievement.badgeImageUrl ? (
                      <img
                        src={achievement.badgeImageUrl}
                        alt={achievement.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-orange-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{achievement.title}</h3>
                      {achievement.isFeatured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      {achievement.expiryDate && isExpired(achievement.expiryDate) && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Expired
                        </span>
                      )}
                    </div>
                    <p className="text-orange-600 font-medium">{achievement.issuingOrganization}</p>
                    <p className="text-sm text-gray-500">
                      {achievement.achievementType} • Issued {formatDate(achievement.issueDate)}
                      {achievement.expiryDate && (
                        <span> • Expires {formatDate(achievement.expiryDate)}</span>
                      )}
                    </p>
                    {achievement.credentialId && (
                      <p className="text-sm text-gray-600">
                        Credential ID: {achievement.credentialId}
                      </p>
                    )}
                    {achievement.description && (
                      <p className="text-sm mt-2 text-gray-700">{achievement.description}</p>
                    )}
                    {achievement.credentialUrl && (
                      <a
                        href={achievement.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                      >
                        View Credential <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDialog(achievement)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => achievement.id && handleDelete(achievement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {achievements.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No achievements found. Add your first achievement!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AchievementManager;