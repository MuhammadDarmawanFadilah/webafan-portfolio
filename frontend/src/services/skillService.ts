import { apiEndpoints } from '../config/config';

interface Skill {
  id?: number;
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
  description?: string;
  iconUrl?: string;
  isActive: boolean;
  order?: number;
  certifications?: string[];
  projects?: string[];
}

class SkillService {
  private baseUrl = apiEndpoints.skills.base;

  async getAllSkills(): Promise<Skill[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  }

  async getSkillsByProfileId(profileId: number): Promise<Skill[]> {
    try {
      const response = await fetch(`${this.baseUrl}/profile/${profileId}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching skills by profile:', error);
      return [];
    }
  }

  async getFeaturedSkills(): Promise<Skill[]> {
    try {
      const response = await fetch(`${this.baseUrl}/featured`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching featured skills:', error);
      return [];
    }
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    try {
      const response = await fetch(`${this.baseUrl}/category/${category}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching skills by category:', error);
      return [];
    }
  }

  async getSkillCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching skill categories:', error);
      return [];
    }
  }

  async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill | null> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(skill)
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error creating skill:', error);
      return null;
    }
  }

  async updateSkill(id: number, skill: Partial<Skill>): Promise<Skill | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(skill)
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error updating skill:', error);
      return null;
    }
  }

  async deleteSkill(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting skill:', error);
      return false;
    }
  }

  async getSkillById(id: number): Promise<Skill | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error fetching skill:', error);
      return null;
    }
  }
}

export const skillService = new SkillService();
export type { Skill };