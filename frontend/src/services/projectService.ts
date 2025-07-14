import { apiEndpoints } from '../config/config';

interface Project {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  projectUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  technologies: string;
  features?: string;
  clientName?: string;
  teamSize: number;
  myRole: string;
  completionPercentage: number;
  isFeatured: boolean;
  displayOrder: number;
  status?: string; // Optional field for frontend use
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class ProjectService {
  private baseUrl = apiEndpoints.projects.base;

  private getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async getAllProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: this.getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      if (response.status === 403) {
        return { success: false, message: 'Access denied. Please login again.' };
      }
      return { success: false, message: 'Failed to fetch projects' };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, message: 'Error fetching projects' };
    }
  }

  async getCurrentProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/current`);
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to fetch current projects' };
    } catch (error) {
      console.error('Error fetching current projects:', error);
      return { success: false, message: 'Error fetching current projects' };
    }
  }

  async getFinishedProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/finished`);
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to fetch finished projects' };
    } catch (error) {
      console.error('Error fetching finished projects:', error);
      return { success: false, message: 'Error fetching finished projects' };
    }
  }

  async getProject(id: number): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: this.getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to fetch project' };
    } catch (error) {
      console.error('Error fetching project:', error);
      return { success: false, message: 'Error fetching project' };
    }
  }

  async createProject(project: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(project)
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to create project' };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, message: 'Error creating project' };
    }
  }

  async updateProject(id: number, project: Partial<Project>): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(project)
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      return { success: false, message: 'Failed to update project' };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, message: 'Error updating project' };
    }
  }

  async deleteProject(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: 'Failed to delete project' };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, message: 'Error deleting project' };
    }
  }

  // Helper method to parse technologies string
  parseTechnologies(technologiesString: string): string[] {
    if (!technologiesString) return [];
    return technologiesString.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
  }

  // Helper method to format technologies array to string
  formatTechnologies(technologies: string[]): string {
    return technologies.join(', ');
  }
}

export const projectService = new ProjectService();
export type { Project, ApiResponse };