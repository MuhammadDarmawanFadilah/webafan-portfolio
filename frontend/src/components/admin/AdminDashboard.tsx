import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, Briefcase, GraduationCap, Award, FolderOpen, CheckCircle } from 'lucide-react';
import ProfileManager from './ProfileManager';
import ExperienceManager from './ExperienceManager';
import EducationManager from './EducationManager';
import SkillManager from './SkillManager';
import AchievementManager from './AchievementManager';
import ProjectManager from './ProjectManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [stats, setStats] = useState({
    profiles: 0,
    experiences: 0,
    educations: 0,
    skills: 0,
    achievements: 0,
    currentProjects: 0,
    finishedProjects: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [profilesRes, experiencesRes, educationsRes, skillsRes, achievementsRes, currentProjectsRes, finishedProjectsRes] = await Promise.all([
        fetch('http://localhost:8080/api/profiles', { headers }),
        fetch('http://localhost:8080/api/experiences', { headers }),
        fetch('http://localhost:8080/api/educations', { headers }),
        fetch('http://localhost:8080/api/skills', { headers }),
        fetch('http://localhost:8080/api/achievements', { headers }),
        fetch('http://localhost:8080/api/projects/current', { headers }),
        fetch('http://localhost:8080/api/projects/finished', { headers })
      ]);

      const [profiles, experiences, educations, skills, achievements, currentProjects, finishedProjects] = await Promise.all([
        profilesRes.json(),
        experiencesRes.json(),
        educationsRes.json(),
        skillsRes.json(),
        achievementsRes.json(),
        currentProjectsRes.json(),
        finishedProjectsRes.json()
      ]);

      setStats({
        profiles: profiles.length || 0,
        experiences: experiences.length || 0,
        educations: educations.length || 0,
        skills: skills.length || 0,
        achievements: achievements.length || 0,
        currentProjects: currentProjects.length || 0,
        finishedProjects: finishedProjects.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your portfolio content</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Profiles</p>
                  <p className="text-2xl font-bold">{stats.profiles}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Experience</p>
                  <p className="text-2xl font-bold">{stats.experiences}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Education</p>
                  <p className="text-2xl font-bold">{stats.educations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Skills</p>
                  <p className="text-2xl font-bold">{stats.skills}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Achievements</p>
                  <p className="text-2xl font-bold">{stats.achievements}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Current</p>
                  <p className="text-2xl font-bold">{stats.currentProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Finished</p>
                  <p className="text-2xl font-bold">{stats.finishedProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <ExperienceManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <EducationManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <SkillManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <AchievementManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectManager onUpdate={fetchStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;