import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Award, ExternalLink } from 'lucide-react';
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

interface AchievementManagerProps {
  onUpdate: () => void;
}

const AchievementManager: React.FC<AchievementManagerProps> = ({ onUpdate }) => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(apiEndpoints.achievements.base);
      
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };



  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.achievements.base}/${id}`, {
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

  const handleCreateAchievement = () => {
    navigate('/admin/achievements/new');
  };

  const handleEditAchievement = (achievement: Achievement) => {
    navigate(`/admin/achievements/edit/${achievement.id}`);
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
        <Button onClick={handleCreateAchievement} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Achievement
        </Button>
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
                    onClick={() => handleEditAchievement(achievement)}
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