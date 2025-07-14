import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';
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

interface ExperienceManagerProps {
  onUpdate: () => void;
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({ onUpdate }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(apiEndpoints.experiences.base);
      
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleCreateExperience = () => {
    navigate('/admin/experiences/new');
  };

  const handleEditExperience = (id: number) => {
    navigate(`/admin/experiences/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.experiences.base}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Experience deleted successfully!');
        fetchExperiences();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting experience');
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
          <h2 className="text-2xl font-bold">Experience Management</h2>
          <p className="text-gray-600">Manage work experience and career history</p>
        </div>
        <Button onClick={handleCreateExperience} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {/* Experiences List */}
      <div className="grid gap-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{experience.jobTitle}</h3>
                    <p className="text-blue-600 font-medium">{experience.companyName}</p>
                    <p className="text-sm text-gray-500">{experience.companyLocation}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(experience.startDate)} - {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}
                    </p>
                    {experience.description && (
                      <p className="text-sm mt-2 text-gray-700">{experience.description}</p>
                    )}
                    {experience.technologies && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-gray-500">Technologies: </span>
                        <span className="text-xs text-gray-600">{experience.technologies}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => experience.id && handleEditExperience(experience.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => experience.id && handleDelete(experience.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {experiences.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No experiences found. Add your first work experience!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;