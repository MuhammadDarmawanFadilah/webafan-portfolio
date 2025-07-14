import { apiEndpoints } from '../config/config';

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

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class AchievementService {
  private baseUrl = apiEndpoints.achievements.base;

  private getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async getAllAchievements(): Promise<ApiResponse<Achievement[]>> {
    try {
      const response = await fetch(this.baseUrl);
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to fetch achievements' };
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return { success: false, message: 'Error fetching achievements' };
    }
  }

  async getFeaturedAchievements(): Promise<Achievement[]> {
    try {
      const response = await fetch(`${this.baseUrl}/featured`);
      if (!response.ok) {
        throw new Error('Failed to fetch featured achievements');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured achievements:', error);
      throw error;
    }
  }

  async getAchievement(id: number): Promise<ApiResponse<Achievement>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: this.getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to fetch achievement' };
    } catch (error) {
      console.error('Error fetching achievement:', error);
      return { success: false, message: 'Error fetching achievement' };
    }
  }

  async createAchievement(achievement: Omit<Achievement, 'id'>): Promise<ApiResponse<Achievement>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(achievement)
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to create achievement' };
    } catch (error) {
      console.error('Error creating achievement:', error);
      return { success: false, message: 'Error creating achievement' };
    }
  }

  async updateAchievement(id: number, achievement: Partial<Achievement>): Promise<ApiResponse<Achievement>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(achievement)
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to update achievement' };
    } catch (error) {
      console.error('Error updating achievement:', error);
      return { success: false, message: 'Error updating achievement' };
    }
  }

  async deleteAchievement(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: 'Failed to delete achievement' };
    } catch (error) {
      console.error('Error deleting achievement:', error);
      return { success: false, message: 'Error deleting achievement' };
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isExpired(expiryDate: string): boolean {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  }

  getAchievementTypeColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'certification':
        return 'bg-blue-100 text-blue-800';
      case 'award':
        return 'bg-yellow-100 text-yellow-800';
      case 'course':
        return 'bg-green-100 text-green-800';
      case 'license':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

export const achievementService = new AchievementService();
export type { Achievement, ApiResponse };