// Environment configuration
export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  
  // Frontend Configuration
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  appName: import.meta.env.VITE_APP_NAME || 'Portfolio Website',
  
  // Contact Information
  email: import.meta.env.VITE_EMAIL || 'muhammaddarmawanfadillah@gmail.com',
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '6285600121760',
    url: import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/6285600121760',
  },
  
  // Social Media Links
  social: {
    github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/darmawanfadilah',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/darmawanfadilah',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/darmawanfadilah',
    twitter: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/darmawanfadilah',
  },
  
  // Maps
  maps: {
    url: import.meta.env.VITE_MAPS_URL || 'https://maps.google.com/?q=Banjarnegara,Central+Java,Indonesia',
  },
  
  // Development Configuration
  isDevelopment: import.meta.env.VITE_NODE_ENV === 'development',
  isDebug: import.meta.env.VITE_DEBUG === 'true',
};

// API endpoints
export const apiEndpoints = {
  auth: {
    login: `${config.apiBaseUrl}/auth/login`,
    validate: `${config.apiBaseUrl}/auth/validate`,
  },
  profiles: {
    base: `${config.apiBaseUrl}/profiles`,
    public: `${config.apiBaseUrl}/profiles/public`,
  },
  projects: {
    base: `${config.apiBaseUrl}/projects`,
    all: `${config.apiBaseUrl}/projects`,
    public: {
      all: `${config.apiBaseUrl}/projects/public/all`,
      current: `${config.apiBaseUrl}/projects/public/current`,
      finished: `${config.apiBaseUrl}/projects/public/finished`,
    },
  },
  experiences: {
    base: `${config.apiBaseUrl}/experiences`,
  },
  educations: {
    base: `${config.apiBaseUrl}/educations`,
  },
  skills: {
    base: `${config.apiBaseUrl}/skills`,
  },
  achievements: {
    base: `${config.apiBaseUrl}/achievements`,
  },
  upload: {
    image: `${config.apiBaseUrl}/upload/image`,
    cv: `${config.apiBaseUrl}/upload/cv`,
    files: `${config.apiBaseUrl}/upload/files`,
  },
};

export default config;