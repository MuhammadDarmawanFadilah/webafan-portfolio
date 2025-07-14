import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Code, Star } from 'lucide-react';
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

interface SkillManagerProps {
  onUpdate: () => void;
}

const SkillManager: React.FC<SkillManagerProps> = ({ onUpdate }) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const proficiencyLevels = [
    { value: 1, label: 'Beginner' },
    { value: 2, label: 'Intermediate' },
    { value: 3, label: 'Advanced' },
    { value: 4, label: 'Expert' },
    { value: 5, label: 'Master' }
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(apiEndpoints.skills.base);
      
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleCreateSkill = () => {
    navigate('/admin/skills/new');
  };

  const handleEditSkill = (skill: Skill) => {
    navigate(`/admin/skills/edit/${skill.id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiEndpoints.skills.base}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Skill deleted successfully!');
        fetchSkills();
        onUpdate();
      }
    } catch (error) {
      setError('Error deleting skill');
    }
  };



  const getProficiencyLabel = (level: number) => {
    const proficiency = proficiencyLevels.find(p => p.value === level);
    return proficiency ? proficiency.label : 'Unknown';
  };

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.skillCategory]) {
      acc[skill.skillCategory] = [];
    }
    acc[skill.skillCategory].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Skills Management</h2>
          <p className="text-gray-600">Manage technical and soft skills</p>
        </div>
        <Button onClick={handleCreateSkill} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {/* Skills List by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">{category}</h3>
            <div className="grid gap-4">
              {categorySkills.map((skill) => (
                <Card key={skill.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Code className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{skill.skillName}</h4>
                            {skill.isFeatured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">{renderStars(skill.proficiencyLevel)}</div>
                            <span className="text-sm text-gray-600">
                              {getProficiencyLabel(skill.proficiencyLevel)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {skill.yearsExperience} years of experience
                          </p>
                          {skill.description && (
                            <p className="text-sm text-gray-700 mt-2">{skill.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSkill(skill)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => skill.id && handleDelete(skill.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
        
        {skills.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No skills found. Add your first skill!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillManager;