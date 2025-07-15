import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, Briefcase, GraduationCap, Award, FolderOpen, CheckCircle } from 'lucide-react';
import { apiEndpoints } from '../../config/config';
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
        fetch(apiEndpoints.profiles.base),
        fetch(apiEndpoints.experiences.base),
        fetch(apiEndpoints.educations.base),
        fetch(apiEndpoints.skills.base),
        fetch(apiEndpoints.achievements.base),
        fetch(apiEndpoints.projects.public.current),
        fetch(apiEndpoints.projects.public.finished)
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage your portfolio content</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2">
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium">Profiles</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.profiles}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium">Experience</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.experiences}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium">Education</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.educations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium">Skills</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.skills}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium">Achievements</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.achievements}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <FolderOpen className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium">Current</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.currentProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium">Finished</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.finishedProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-0">
            <TabsTrigger value="profile" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Profile</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Experience</TabsTrigger>
            <TabsTrigger value="education" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Education</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Skills</TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Achievements</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4 sm:mt-6">
            <ProfileManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="experience" className="mt-4 sm:mt-6">
            <ExperienceManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="education" className="mt-4 sm:mt-6">
            <EducationManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="skills" className="mt-4 sm:mt-6">
            <SkillManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-4 sm:mt-6">
            <AchievementManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="projects" className="mt-4 sm:mt-6">
            <ProjectManager onUpdate={fetchStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;