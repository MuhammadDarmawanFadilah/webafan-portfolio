# Environment Variables Setup Guide

Proyek ini telah dikonfigurasi untuk menggunakan environment variables untuk menggantikan hardcoded values. Berikut adalah panduan untuk setup environment variables.

## Backend Configuration

### 1. Setup Environment Variables

Copy file `.env.example` menjadi `.env` di folder backend:

```bash
cd backend
cp .env.example .env
```

### 2. Edit file `.env` dengan konfigurasi yang sesuai:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=portfolio_db
DB_USERNAME=root
DB_PASSWORD=your_password

# Server Configuration
SERVER_PORT=8080

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRATION=86400000

# WhatsApp API Configuration
WHATSAPP_API_URL=https://your-whatsapp-api-url.com
WHATSAPP_API_TOKEN=your_whatsapp_api_token
WHATSAPP_API_SENDER=your_whatsapp_sender_number

# Application URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8080
API_BASE_URL=http://localhost:8080/api
```

### 3. Properties yang telah dikonfigurasi:

- `spring.web.cors.allowed-origins` menggunakan `${CORS_ALLOWED_ORIGINS}`
- `whatsapp.api.url` menggunakan `${WHATSAPP_API_URL}`
- `whatsapp.api.token` menggunakan `${WHATSAPP_API_TOKEN}`
- `whatsapp.api.sender` menggunakan `${WHATSAPP_API_SENDER}`
- `app.frontend.url` menggunakan `${FRONTEND_URL}`
- `app.backend.url` menggunakan `${BACKEND_URL}`
- `app.api.base.url` menggunakan `${API_BASE_URL}`

## Frontend Configuration

### 1. Setup Environment Variables

Copy file `.env.example` menjadi `.env` di folder frontend:

```bash
cd frontend
cp .env.example .env
```

### 2. Edit file `.env` dengan konfigurasi yang sesuai:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BACKEND_URL=http://localhost:8080

# Frontend Configuration
VITE_FRONTEND_URL=http://localhost:5173
VITE_APP_NAME=Portfolio Website

# Contact Information
VITE_EMAIL=your_email@example.com
VITE_WHATSAPP_NUMBER=your_whatsapp_number
VITE_WHATSAPP_URL=https://wa.me/your_whatsapp_number

# Social Media Links
VITE_GITHUB_URL=https://github.com/your_username
VITE_LINKEDIN_URL=https://linkedin.com/in/your_username
VITE_INSTAGRAM_URL=https://instagram.com/your_username
VITE_TWITTER_URL=https://twitter.com/your_username

# Google Maps
VITE_MAPS_URL=https://maps.google.com/?q=Your+Location
```

### 3. Konfigurasi yang telah dibuat:

- File `src/config/config.ts` untuk mengelola semua environment variables
- Semua komponen telah diupdate untuk menggunakan konfigurasi dari `config.ts`
- API endpoints telah dikonfigurasi secara terpusat

## Files yang telah diupdate:

### Backend:
- `PortfolioApplication.java` - Menghapus hardcoded CORS dan menggunakan properties
- `application.properties` - Menggunakan environment variables dengan default values

### Frontend:
- `src/config/config.ts` - File konfigurasi utama
- Semua service files (`projectService.ts`, `skillService.ts`, dll.)
- Semua komponen admin (managers dan forms)
- `Contact.tsx`, `Footer.tsx`, `Projects.tsx`

## Keamanan:

1. **Jangan commit file `.env`** ke repository
2. File `.env` sudah ditambahkan ke `.gitignore`
3. Gunakan `.env.example` sebagai template
4. Ganti semua default values dengan values yang aman untuk production

## Production Deployment:

Untuk production, pastikan untuk:
1. Set environment variables di server/hosting platform
2. Gunakan values yang aman dan berbeda dari development
3. Aktifkan HTTPS untuk semua URLs
4. Gunakan database credentials yang aman

## Troubleshooting:

1. Jika aplikasi tidak bisa connect ke API, periksa `VITE_API_BASE_URL`
2. Jika CORS error, periksa `CORS_ALLOWED_ORIGINS` di backend
3. Jika WhatsApp integration tidak bekerja, periksa WhatsApp API credentials