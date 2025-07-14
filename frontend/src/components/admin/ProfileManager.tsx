import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { config, apiEndpoints } from '../../config/config';

interface Profile {
  id?: number;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  birthDate?: string;
  birthPlace?: string;
  address?: string;
  currentAddress?: string;
  about?: string;
  profileImageUrl: string;
  yearsExperience?: number;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  roles?: string;
  projectsCount?: number;
  degreesCount?: number;
  certificatesCount?: number;
  topSkills?: string;
  personalStory?: string;
  values?: string;
  expertiseAreas?: string;
  technicalSkills?: string;
  experiences?: string;
  educations?: string;
  certifications?: string;
}

interface ProfileManagerProps {
  onUpdate: () => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ onUpdate }) => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(apiEndpoints.profiles.base, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched profiles data:', data);
        // Backend returns array of profiles
        setProfiles(data);
      } else {
        setError('Failed to fetch profiles');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError('Error fetching profiles');
    }
  };

  const handleCreateProfile = () => {
    navigate('/admin/profiles/new');
  };

  const handleEditProfile = (profile: Profile) => {
    navigate(`/admin/profiles/edit/${profile.id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.profiles.base}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Profile deleted successfully!');
        fetchProfiles();
        onUpdate();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to delete profile');
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      setError('Error deleting profile');
      setTimeout(() => setError(''), 3000);
    }
  };



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Profile Management</h2>
          <p className="text-gray-600">Manage profile information and photo</p>
        </div>
        <Button onClick={handleCreateProfile} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Profile
        </Button>

      </div>

      {/* Error and Success Messages */}
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
                    <p className="text-sm text-gray-500">{profile.currentAddress || profile.address}</p>
                    {profile.about && (
                      <p className="text-sm mt-2 max-w-2xl">{profile.about}</p>
                    )}
                    {profile.yearsExperience && (
                      <p className="text-sm text-gray-500">Experience: {profile.yearsExperience} years</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProfile(profile)}
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