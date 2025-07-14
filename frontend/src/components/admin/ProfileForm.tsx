import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { apiEndpoints, config } from '../../config/config';
import { ArrowLeft, Save, Download, Upload } from 'lucide-react';
import { profileService } from '../../services/profileService';
import ImageUpload from './ImageUpload';

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
  cvFileUrl?: string;
}

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [profile, setProfile] = useState<Profile>({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    currentAddress: '',
    about: '',
    profileImageUrl: '',
    yearsExperience: 0,
    linkedinUrl: '',
    githubUrl: '',
    websiteUrl: '',
    roles: '',
    projectsCount: 0,
    degreesCount: 0,
    certificatesCount: 0,
    topSkills: '',
    personalStory: '',
    values: '',
    expertiseAreas: '',
    technicalSkills: '',
    experiences: '',
    educations: '',
    certifications: '',
    cvFileUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingCV, setUploadingCV] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      fetchProfile(parseInt(id));
    }
  }, [id, isEditing]);

  const fetchProfile = async (profileId: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.profiles.base}/${profileId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (err) {
      setError('Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
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
      const url = isEditing && profile.id 
        ? `${apiEndpoints.profiles.base}/${profile.id}`
        : apiEndpoints.profiles.base;
      
      const method = isEditing && profile.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setSuccess(isEditing ? 'Profile updated successfully!' : 'Profile created successfully!');
        setTimeout(() => {
          navigate('/admin/dashboard?tab=profiles');
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save profile');
      }
    } catch (err) {
      setError('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = () => {
    if (!profile.cvFileUrl) {
      setError('No CV file available for download. Please upload a CV first.');
      return;
    }

    try {
      // Create a link to download the uploaded CV file
      const link = document.createElement('a');
      // Convert relative URL to absolute URL
      const absoluteUrl = profile.cvFileUrl.startsWith('http') 
        ? profile.cvFileUrl 
        : `${config.backendUrl}${profile.cvFileUrl}`;
      link.href = absoluteUrl;
      link.download = `CV_${profile.fullName.replace(/\s+/g, '_')}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSuccess('CV downloaded successfully!');
    } catch (err) {
      setError('Error downloading CV file.');
    }
   };

   const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (!file) return;

     // Validate file type
     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
     if (!allowedTypes.includes(file.type)) {
       setError('Please upload a PDF or Word document only.');
       return;
     }

     // Validate file size (max 5MB)
     if (file.size > 5 * 1024 * 1024) {
       setError('File size must be less than 5MB.');
       return;
     }

     setUploadingCV(true);
     setError('');

     try {
       const formData = new FormData();
       formData.append('file', file);

       const token = localStorage.getItem('adminToken');
       const response = await fetch(apiEndpoints.upload.cv, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${token}`
         },
         body: formData
       });

       if (response.ok) {
         const result = await response.json();
         setCvFile(file);
         handleInputChange('cvFileUrl', result.fileUrl);
         setSuccess('CV uploaded successfully!');
       } else {
         const errorData = await response.json();
         setError(errorData.message || 'Failed to upload CV');
       }
     } catch (err) {
       setError('Error uploading CV');
     } finally {
       setUploadingCV(false);
     }
   };

   const triggerCVUpload = () => {
     const input = document.createElement('input');
     input.type = 'file';
     input.accept = '.pdf,.doc,.docx';
     input.onchange = handleCVUpload;
     input.click();
   };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/dashboard?tab=profiles')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profiles
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Profile' : 'Create New Profile'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Update profile information' : 'Add a new profile to your portfolio'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Profile Details' : 'Profile Information'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Developer"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+62 xxx xxx xxxx"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profile.birthDate || ''}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthPlace">Birth Place</Label>
                  <Input
                    id="birthPlace"
                    value={profile.birthPlace || ''}
                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Full address"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentAddress">Current Address</Label>
                <Textarea
                  id="currentAddress"
                  value={profile.currentAddress || ''}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                  placeholder="Current living address"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  value={profile.about || ''}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  placeholder="Brief description about yourself"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <ImageUpload
                  currentImageUrl={profile.profileImageUrl}
                  onImageChange={(imageUrl) => handleInputChange('profileImageUrl', imageUrl)}
                  label="Profile Image"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  min="0"
                  value={profile.yearsExperience || 0}
                  onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL *</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={profile.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL *</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={profile.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL *</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={profile.websiteUrl}
                    onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roles">Roles</Label>
                <Input
                  id="roles"
                  value={profile.roles || ''}
                  onChange={(e) => handleInputChange('roles', e.target.value)}
                  placeholder="e.g., Developer, Designer, Consultant"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectsCount">Projects Count</Label>
                  <Input
                    id="projectsCount"
                    type="number"
                    min="0"
                    value={profile.projectsCount || 0}
                    onChange={(e) => handleInputChange('projectsCount', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degreesCount">Degrees Count</Label>
                  <Input
                    id="degreesCount"
                    type="number"
                    min="0"
                    value={profile.degreesCount || 0}
                    onChange={(e) => handleInputChange('degreesCount', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificatesCount">Certificates Count</Label>
                  <Input
                    id="certificatesCount"
                    type="number"
                    min="0"
                    value={profile.certificatesCount || 0}
                    onChange={(e) => handleInputChange('certificatesCount', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topSkills">Top Skills</Label>
                <Textarea
                  id="topSkills"
                  value={profile.topSkills || ''}
                  onChange={(e) => handleInputChange('topSkills', e.target.value)}
                  placeholder="List your top skills"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="personalStory">Personal Story</Label>
                <Textarea
                  id="personalStory"
                  value={profile.personalStory || ''}
                  onChange={(e) => handleInputChange('personalStory', e.target.value)}
                  placeholder="Tell your personal story"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="values">Values</Label>
                <Textarea
                  id="values"
                  value={profile.values || ''}
                  onChange={(e) => handleInputChange('values', e.target.value)}
                  placeholder="Your core values"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertiseAreas">Expertise Areas</Label>
                <Textarea
                  id="expertiseAreas"
                  value={profile.expertiseAreas || ''}
                  onChange={(e) => handleInputChange('expertiseAreas', e.target.value)}
                  placeholder="Areas of expertise"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technicalSkills">Technical Skills</Label>
                <Textarea
                  id="technicalSkills"
                  value={profile.technicalSkills || ''}
                  onChange={(e) => handleInputChange('technicalSkills', e.target.value)}
                  placeholder="Technical skills and technologies"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvFileUrl">CV File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="cvFileUrl"
                    value={profile.cvFileUrl || ''}
                    onChange={(e) => handleInputChange('cvFileUrl', e.target.value)}
                    placeholder="CV file URL (uploaded automatically)"
                    readOnly
                  />
                  {profile.cvFileUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadCV}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download CV
                    </Button>
                  )}
                </div>
                {cvFile && (
                  <p className="text-sm text-gray-600">
                    Uploaded: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
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
              
              <div className="flex justify-end gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/dashboard?tab=profiles')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                {isEditing && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={triggerCVUpload}
                    disabled={uploadingCV}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadingCV ? 'Uploading...' : 'Upload CV'}
                  </Button>
                )}
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : (isEditing ? 'Update Profile' : 'Create Profile')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileForm;