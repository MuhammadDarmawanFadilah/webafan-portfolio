# WebAfan Portfolio

Full stack web portfolio application dengan Spring Boot backend dan React frontend.

## 🚀 Teknologi yang Digunakan

### Backend
- **Spring Boot 3.2.1** - Framework Java untuk REST API
- **Spring Security** - Autentikasi dan autorisasi
- **Spring Data JPA** - ORM untuk database
- **MySQL** - Database relational
- **JWT** - Token-based authentication
- **Maven** - Build tool dan dependency management

### Frontend
- **React 18** - Library JavaScript untuk UI
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool dan dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Komponen UI yang accessible
- **React Router DOM** - Client-side routing

## 📁 Struktur Proyek

```
webafan/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/webafan/portfolio/
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Entity models
│   │       ├── repository/  # Data repositories
│   │       ├── service/     # Business logic
│   │       └── util/        # Utility classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── admin/       # Admin panel components
│   │   │   └── ui/          # Reusable UI components
│   │   ├── lib/             # Utility functions
│   │   └── main.tsx         # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🛠️ Setup dan Instalasi

### Prerequisites
- Java 17 atau lebih tinggi
- Node.js 18 atau lebih tinggi
- MySQL 8.0 atau lebih tinggi
- Maven 3.6 atau lebih tinggi

### Backend Setup

1. Clone repository:
```bash
git clone https://github.com/MuhammadDarmawanFadilah/webafan-portfolio.git
cd webafan-portfolio
```

2. Setup database MySQL:
```sql
CREATE DATABASE webafan_portfolio;
```

3. Konfigurasi database di `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/webafan_portfolio
spring.datasource.username=your_username
spring.datasource.password=your_password
```

4. Jalankan backend:
```bash
cd backend
mvn spring-boot:run
```

Backend akan berjalan di `http://localhost:8080`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## 🔧 Environment Variables

Buat file `.env` di direktori `backend/src/main/resources/` dengan konfigurasi berikut:

```properties
# Database
DB_URL=jdbc:mysql://localhost:3306/webafan_portfolio
DB_USERNAME=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174
```

## 📊 Fitur Utama

### Public Features
- ✅ Landing page dengan hero section
- ✅ About section dengan informasi personal
- ✅ Skills showcase dengan kategori
- ✅ Experience timeline
- ✅ Education history
- ✅ Projects portfolio
- ✅ Contact information
- ✅ Responsive design

### Admin Features
- ✅ Secure login dengan JWT
- ✅ Dashboard admin
- ✅ Profile management
- ✅ Skills management
- ✅ Experience management
- ✅ Education management
- ✅ Projects management
- ✅ Achievements management

## 🔐 Autentikasi

Aplikasi menggunakan JWT (JSON Web Token) untuk autentikasi:
- Token disimpan di localStorage
- Automatic token refresh
- Protected routes untuk admin panel
- CORS configuration untuk multiple origins

## 🎨 Design System

- **Color Scheme**: Modern dark/light theme
- **Typography**: Clean dan readable fonts
- **Components**: Reusable UI components dengan Radix UI
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG compliant components

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Token validation
- `POST /api/auth/logout` - User logout

### Profile
- `GET /api/profile` - Get profile data
- `PUT /api/profile` - Update profile

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill

### Experience
- `GET /api/experience` - Get all experiences
- `POST /api/experience` - Create experience
- `PUT /api/experience/{id}` - Update experience
- `DELETE /api/experience/{id}` - Delete experience

### Education
- `GET /api/education` - Get all education
- `POST /api/education` - Create education
- `PUT /api/education/{id}` - Update education
- `DELETE /api/education/{id}` - Delete education

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Achievements
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements` - Create achievement
- `PUT /api/achievements/{id}` - Update achievement
- `DELETE /api/achievements/{id}` - Delete achievement

## 🚀 Deployment

### Backend Deployment
1. Build aplikasi:
```bash
mvn clean package
```

2. Deploy JAR file ke server

### Frontend Deployment
1. Build untuk production:
```bash
npm run build
```

2. Deploy folder `dist` ke web server

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

**Muhammad Darmawan Fadilah**
- GitHub: [@MuhammadDarmawanFadilah](https://github.com/MuhammadDarmawanFadilah)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/)

---

⭐ Jangan lupa untuk memberikan star jika project ini membantu Anda!