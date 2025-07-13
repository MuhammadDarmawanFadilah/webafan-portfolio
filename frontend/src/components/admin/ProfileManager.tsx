import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Profile {
  id?: number;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImageUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
}

interface ProfileManagerProps {
  onUpdate: () => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ onUpdate }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyProfile: Profile = {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    profileImageUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    websiteUrl: ''
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8080/api/profiles', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingProfile.id 
        ? `http://localhost:8080/api/profiles/${editingProfile.id}`
        : 'http://localhost:8080/api/profiles';
      
      const method = editingProfile.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingProfile)
      });

      if (response.ok) {
        setSuccess(editingProfile.id ? 'Profile updated successfully!' : 'Profile created successfully!');
        setIsDialogOpen(false);
        setEditingProfile(null);
        fetchProfiles();
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
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8080/api/profiles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Profile deleted successfully!');
        fetchProfiles();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting profile');
    }
  };

  const openDialog = (profile?: Profile) => {
    setEditingProfile(profile ? { ...profile } : { ...emptyProfile });
    setIsDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    if (editingProfile) {
      setEditingProfile({ ...editingProfile, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Profile Management</h2>
          <p className="text-gray-600">Manage profile information and photo</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProfile?.id ? 'Edit Profile' : 'Add New Profile'}</DialogTitle>
              <DialogDescription>
                {editingProfile?.id ? 'Update profile information' : 'Create a new profile'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={editingProfile?.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingProfile?.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingProfile?.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editingProfile?.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editingProfile?.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editingProfile?.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profileImageUrl">Profile Image URL</Label>
                <Input
                  id="profileImageUrl"
                  value={editingProfile?.profileImageUrl || ''}
                  onChange={(e) => handleInputChange('profileImageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    value={editingProfile?.linkedinUrl || ''}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={editingProfile?.githubUrl || ''}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    value={editingProfile?.websiteUrl || ''}
                    onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
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

      {/* Profiles List */}
      <div className="grid gap-4">
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {profile.profileImageUrl && (
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{profile.fullName}</h3>
                    <p className="text-gray-600">{profile.title}</p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                    <p className="text-sm text-gray-500">{profile.location}</p>
                    {profile.bio && (
                      <p className="text-sm mt-2 max-w-2xl">{profile.bio}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDialog(profile)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => profile.id && handleDelete(profile.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {profiles.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No profiles found. Create your first profile!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfileManager;