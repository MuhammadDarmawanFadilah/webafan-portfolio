import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
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

interface EducationManagerProps {
  onUpdate: () => void;
}

const EducationManager: React.FC<EducationManagerProps> = ({ onUpdate }) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await fetch(apiEndpoints.educations.base);
      
      if (response.ok) {
        const data = await response.json();
        setEducations(data);
      }
    } catch (error) {
      console.error('Error fetching educations:', error);
    }
  };

  const handleCreateEducation = () => {
    navigate('/admin/educations/new');
  };

  const handleEditEducation = (id: number) => {
    navigate(`/admin/educations/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this education?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.educations.base}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Education deleted successfully!');
        fetchEducations();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting education');
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
          <h2 className="text-2xl font-bold">Education Management</h2>
          <p className="text-gray-600">Manage educational background and qualifications</p>
        </div>
        <Button onClick={handleCreateEducation} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {/* Educations List */}
      <div className="grid gap-4">
        {educations.map((education) => (
          <Card key={education.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{education.degree}</h3>
                    <p className="text-purple-600 font-medium">{education.fieldOfStudy}</p>
                    <p className="text-gray-700">{education.institutionName}</p>
                    <p className="text-sm text-gray-500">{education.institutionLocation}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(education.startDate)} - {education.isCurrent ? 'Present' : formatDate(education.endDate)}
                    </p>
                    {education.gpa > 0 && (
                      <p className="text-sm text-gray-600">
                        GPA: {education.gpa.toFixed(2)}/{education.maxGpa.toFixed(2)}
                      </p>
                    )}
                    {education.description && (
                      <p className="text-sm mt-2 text-gray-700">{education.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => education.id && handleEditEducation(education.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => education.id && handleDelete(education.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {educations.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No education records found. Add your first education!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EducationManager;