# WebProfile Afan

## Deskripsi Proyek
Website profile profesional modern untuk M. Darmawan Fadilah S.Kom, M.Kom (Senior Developer) yang dibangun menggunakan teknologi terkini dengan desain yang mengikuti tren 2024-2025.

## Technology Stack

### Frontend
- **React 18+** dengan TypeScript
- **shadcn/ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons

### Backend
- **Java 21** dengan Spring Boot 3.x
- **Spring Data JPA** - Database abstraction
- **H2 Database** - In-memory database untuk development
- **Spring Security** - Authentication & authorization
- **Maven** - Dependency management

### Tools & Libraries
- **Lombok** - Reduce boilerplate code
- **Jackson** - JSON processing
- **JWT** - Token-based authentication
- **CORS** - Cross-origin resource sharing

## Struktur Proyek

```
webprofile-afan/
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   └── com/webafan/portfolio/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── repository/  # Data access layer
│   │       ├── entity/      # JPA entities
│   │       ├── dto/         # Data transfer objects
│   │       └── config/      # Configuration classes
│   └── pom.xml             # Maven dependencies
└── frontend/               # React application
    ├── src/
    │   ├── components/     # React components
    │   │   ├── ui/         # shadcn/ui components
    │   │   └── admin/      # Admin panel components
    │   ├── lib/           # Utility functions
    │   └── assets/        # Static assets
    └── package.json       # npm dependencies
```

## Setup & Installation

### Prerequisites
- Node.js 18+ dan npm
- Java 21+
- Maven 3.6+

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend akan berjalan di: http://localhost:8080

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend akan berjalan di: http://localhost:5173

## Authentication

### Default Admin User
- **Username**: afan
- **Password**: P@ssw0rd
- **Role**: ADMIN

### API Endpoints
- `POST /api/auth/login` - User login
- `GET /api/auth/debug` - Debug user information
- `POST /api/auth/test-password` - Test password encoding

## Features

### Frontend Features
- ✅ Modern Hero section dengan professional layout
- ✅ Responsive design dengan mobile-first approach
- ✅ Professional color scheme dengan emerald theme
- ✅ Fixed navigation header dengan backdrop blur
- ✅ Contact information dan action buttons
- ✅ Skills showcase dengan badge components
- ✅ Statistics cards dengan colorful backgrounds
- ✅ Admin login system
- ⏳ About Me section (in progress)
- ⏳ Experience timeline
- ⏳ Education section
- ⏳ Achievements/Certifications
- ⏳ Contact form

### Backend Features
- ✅ RESTful API dengan Spring Boot
- ✅ JWT-based authentication
- ✅ User management system
- ✅ Database seeding dengan sample data
- ✅ CORS configuration
- ✅ Error handling dan validation
- ✅ Profile, Experience, Education, Skills, Achievements entities

## Design Principles

1. **Minimalist Design** - Clean layout dengan optimal whitespace
2. **Personal Touch** - Menampilkan kepribadian melalui konten personal
3. **Modern Typography** - Bold, expressive typefaces
4. **Responsive Design** - Mobile-first approach
5. **Subtle Animations** - Microinteractions untuk enhanced UX
6. **Professional Color Scheme** - Emerald sebagai primary color
7. **Interactive Elements** - Hover effects dan engaging interactions

## API Documentation

### Profile Endpoints
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/{id}` - Get profile by ID
- `POST /api/profiles` - Create new profile
- `PUT /api/profiles/{id}` - Update profile
- `DELETE /api/profiles/{id}` - Delete profile

### Experience Endpoints
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/{id}` - Get experience by ID
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/{id}` - Update experience
- `DELETE /api/experiences/{id}` - Delete experience

### Education Endpoints
- `GET /api/educations` - Get all educations
- `GET /api/educations/{id}` - Get education by ID
- `POST /api/educations` - Create new education
- `PUT /api/educations/{id}` - Update education
- `DELETE /api/educations/{id}` - Delete education

### Skills Endpoints
- `GET /api/skills` - Get all skills
- `GET /api/skills/{id}` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill

### Achievements Endpoints
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/{id}` - Get achievement by ID
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/{id}` - Update achievement
- `DELETE /api/achievements/{id}` - Delete achievement

## Development Guidelines

### Code Style
- Gunakan TypeScript untuk type safety
- Follow React best practices
- Gunakan functional components dengan hooks
- Implement proper error handling
- Write clean, readable code dengan comments

### Component Structure
- Gunakan shadcn/ui components untuk consistency
- Implement responsive design dengan Tailwind CSS
- Separate concerns (UI, logic, data)
- Use proper prop types dan interfaces

### Backend Guidelines
- Follow Spring Boot conventions
- Implement proper exception handling
- Use DTOs untuk API responses
- Validate input data
- Follow RESTful API principles

## Environment Variables

### Backend (.env atau application.properties)
```properties
# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=

# JWT Configuration
jwt.secret=mySecretKey
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Sample Profile Data

### Personal Information
- **Name**: M. Darmawan Fadilah S.Kom, M.Kom
- **Title**: Senior Developer
- **Email**: muhammaddarmawan@gmail.com
- **Phone**: +62 856 0012 7 856
- **Location**: Palangka Raya, 08 Desember 1997

### Professional Experience
1. **Senior Developer** (2020-2024) - PT. Graha Sarana Duta
2. **Junior Java Developer** (2019-2020) - PT. Askrindo Syariah

### Education
1. **Master of Computer Science** (2022-2024) - ITS, GPA: 3.81/4.00
2. **Bachelor of Computer Science** (2015-2019) - Unsoed, GPA: 3.65/4.00

### Technical Skills
- Java (92%), Spring Boot (90%), JavaScript (85%)
- Oracle (90%), SQL Server (90%), Git (90%)
- Angular (80%), CSS (80%), Jenkins (80%)
- Windows (90%), Linux (85%), SSIS (90%)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**M. Darmawan Fadilah S.Kom, M.Kom**
- Email: muhammaddarmawan@gmail.com
- Phone: +62 856 0012 7 856
- LinkedIn: [Profile Link]
- GitHub: [Profile Link]

---

**Project Status**: ✅ Backend Complete | ⏳ Frontend In Progress (60% completed)

**Last Updated**: December 2024

**Version**: 1.0.0