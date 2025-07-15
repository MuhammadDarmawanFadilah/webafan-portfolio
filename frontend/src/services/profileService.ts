import { apiEndpoints } from '../config/config';

interface Experience {
  id?: number;
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologiesUsed: string;
  keyAchievements: string;
  displayOrder: number;
  responsibilities?: string;
  technologies?: string;
  profileId: number;
}

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
  profileImageUrl?: string;
  yearsExperience?: number;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  roles?: string; // JSON string
  projectsCount?: number;
  degreesCount?: number;
  certificatesCount?: number;
  topSkills?: string; // JSON string
  personalStory?: string;
  values?: string; // JSON string
  expertiseAreas?: string; // JSON string
  technicalSkills?: string; // JSON string
  cvFileUrl?: string;
  experiences?: Experience[]; // Add experiences array
}

class ProfileService {
  private baseUrl = apiEndpoints.profiles.base;

  async getPublicProfile(): Promise<Profile | null> {
    try {
      // Fetch profile data
      const profileResponse = await fetch(`${this.baseUrl}/public`);
      if (!profileResponse.ok) {
        return null;
      }
      const profile = await profileResponse.json();
      
      // Fetch experiences data
      try {
        const experiencesResponse = await fetch(`${apiEndpoints.experiences.base}`);
        if (experiencesResponse.ok) {
          const experiences = await experiencesResponse.json();
          profile.experiences = experiences;
        } else {
          profile.experiences = [];
        }
      } catch (experienceError) {
        console.error('Error fetching experiences:', experienceError);
        profile.experiences = [];
      }
      
      return profile;
    } catch (error) {
      console.error('Error fetching public profile:', error);
      return null;
    }
  }

  // Helper methods to parse JSON strings
  parseRoles(rolesJson?: string): string[] {
    if (!rolesJson) return [];
    try {
      return JSON.parse(rolesJson);
    } catch {
      return [];
    }
  }

  parseTopSkills(skillsJson?: string): string[] {
    if (!skillsJson) return [];
    try {
      return JSON.parse(skillsJson);
    } catch {
      return [];
    }
  }

  parseValues(valuesJson?: string): string[] {
    if (!valuesJson) return [];
    try {
      return JSON.parse(valuesJson);
    } catch {
      return [];
    }
  }

  parseExpertiseAreas(expertiseJson?: string): string[] {
    if (!expertiseJson) return [];
    try {
      return JSON.parse(expertiseJson);
    } catch {
      return [];
    }
  }

  parseTechnicalSkills(skillsJson?: string): Array<{name: string, level: number}> {
    if (!skillsJson) return [];
    try {
      return JSON.parse(skillsJson);
    } catch {
      return [];
    }
  }
}

export const profileService = new ProfileService();
export type { Profile, Experience };