import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Save, X, Code, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Skill {
  id?: number;
  name: string;
  category: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
  description: string;
  isFeatured: boolean;
  displayOrder: number;
}

interface SkillManagerProps {
  onUpdate: () => void;
}

const SkillManager: React.FC<SkillManagerProps> = ({ onUpdate }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptySkill: Skill = {
    name: '',
    category: '',
    proficiencyLevel: 1,
    yearsOfExperience: 0,
    description: '',
    isFeatured: false,
    displayOrder: 0
  };

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
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8080/api/skills', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingSkill.id 
        ? `http://localhost:8080/api/skills/${editingSkill.id}`
        : 'http://localhost:8080/api/skills';
      
      const method = editingSkill.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingSkill)
      });

      if (response.ok) {
        setSuccess(editingSkill.id ? 'Skill updated successfully!' : 'Skill created successfully!');
        setIsDialogOpen(false);
        setEditingSkill(null);
        fetchSkills();
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
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8080/api/skills/${id}`, {
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

  const openDialog = (skill?: Skill) => {
    setEditingSkill(skill ? { ...skill } : { ...emptySkill });
    setIsDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: keyof Skill, value: string | boolean | number) => {
    if (editingSkill) {
      setEditingSkill({ ...editingSkill, [field]: value });
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
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Skills Management</h2>
          <p className="text-gray-600">Manage technical and soft skills</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSkill?.id ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
              <DialogDescription>
                {editingSkill?.id ? 'Update skill information' : 'Create a new skill entry'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Skill Name</Label>
                  <Input
                    id="name"
                    value={editingSkill?.name || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., React, Python, Leadership"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingSkill?.category || ''}
                    onValueChange={(value) => handleInputChange('category', value)}
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
                    value={editingSkill?.proficiencyLevel?.toString() || '1'}
                    onValueChange={(value) => handleInputChange('proficiencyLevel', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value.toString()}>
                          {level.label}
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
                    step="0.5"
                    value={editingSkill?.yearsOfExperience || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('yearsOfExperience', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingSkill?.description || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                  rows={3}
                  placeholder="Describe your experience with this skill"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={editingSkill?.isFeatured || false}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked as boolean)}
                  />
                  <Label htmlFor="isFeatured">Featured skill</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={editingSkill?.displayOrder || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
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
                            <h4 className="font-semibold">{skill.name}</h4>
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
                            {skill.yearsOfExperience} years of experience
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
                          onClick={() => openDialog(skill)}
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