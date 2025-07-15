package com.webafan.portfolio.config;

import com.webafan.portfolio.entity.*;
import com.webafan.portfolio.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    
    private final ProfileRepository profileRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final AchievementRepository achievementRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataSeeder(ProfileRepository profileRepository,
                     ExperienceRepository experienceRepository,
                     EducationRepository educationRepository,
                     SkillRepository skillRepository,
                     AchievementRepository achievementRepository,
                     ProjectRepository projectRepository,
                     UserRepository userRepository,
                     PasswordEncoder passwordEncoder) {
        this.profileRepository = profileRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.achievementRepository = achievementRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) throws Exception {
        if (profileRepository.count() == 0) {
            System.out.println("Initializing portfolio database with seed data...");
            seedData();
            System.out.println("Portfolio database initialization completed successfully");
        }
        
        if (userRepository.count() == 0) {
            System.out.println("Creating default admin user...");
            createAdminUser();
            System.out.println("Admin user created successfully");
        }
    }
    
    private void seedData() {
        // Create main profile
        Profile profile = createMainProfile();
        
        // Create experiences
        createExperiences(profile);
        
        // Create education
        createEducation(profile);
        
        // Create skills
        createSkills(profile);
        
        // Create achievements
        createAchievements(profile);
        
        // Create projects
        createProjects(profile);
        
        System.out.println("Portfolio data seeding completed successfully");
    }
    
    private Profile createMainProfile() {
        Profile profile = new Profile();
        profile.setFullName("M. Darmawan Fadilah S.Kom, M.Kom");
        profile.setTitle("Senior Developer");
        profile.setEmail("muhammaddarmawan@gmail.com");
        profile.setPhone("+62 856 0012 7 856");
        profile.setBirthDate(LocalDate.of(1997, 12, 8));
        profile.setBirthPlace("Palangka Raya, 08 Desember 1997");
        profile.setAddress("Bukit Nusa Indah, Jl. Cempaka kav. 248, Rt.05 Rw.13 kel. senja, Kec. ciputat, Tangerang Selatan");
        profile.setCurrentAddress("Griya Satria Indah 02 Blok M No. 19 Rt 03 Rw. 10 Sukamakmur, Purwokerto Utara, Banyumas, Jawa Tengah (53125)");
        profile.setAbout("Tracing, logs and debugging programs have become parts of my daily tasks. " +
                "Effective communication and the use of AI are crucial in the task completion. " +
                "Continuous learning, responsibility, and hard work are also essential to achieving " +
                "my vision and mission");
        profile.setYearsExperience(5);
        
        return profileRepository.save(profile);
    }
    
    private void createExperiences(Profile profile) {
        Experience exp1 = new Experience();
        exp1.setJobTitle("Junior Java Developer");
        exp1.setCompanyName("PT. Abhimata Persada");
        exp1.setCompanyLocation("Jakarta, Indonesia");
        exp1.setStartDate(LocalDate.of(2019, 3, 18));
        exp1.setEndDate(LocalDate.of(2020, 6, 30));
        exp1.setIsCurrent(false);
        exp1.setDescription("After completing a 3-month bootcamp and gaining initial experience as a Software Tester for one month, I advanced to a Junior Java Developer position. I further honed my skills over the next year as an IT Product Developer, focusing on the development of robust back-office applications");
        exp1.setTechnologiesUsed("Java, Spring Framework, MySQL, JUnit, Selenium");
        exp1.setKeyAchievements("• Completed intensive Java bootcamp program\n" +
                "• Transitioned from trainee to full-time developer\n" +
                "• Contributed to testing automation framework\n" +
                "• Gained experience in Agile development");
        exp1.setDisplayOrder(1);
        exp1.setProfileId(profile.getId());
        // Add missing fields to match the expected JSON structure
        exp1.setResponsibilities("I am responsible for developing comprehensive documentation, including Business Requirements Documents (BRD), Functional Specification Documents (FSD), Technical Specification Documents (TSD), System Guidelines, and detailed Test Cases. Concurrently, I am tasked with designing and developing the website interface for OPIC, our core back-office product, ensuring it meets all functional and technical specifications");
        exp1.setTechnologies("Java 11, Spring Boot");
        
        Experience exp2 = new Experience();
        exp2.setJobTitle("Senior Developer");
        exp2.setCompanyName("PT. Chubb Life Indonesia");
        exp2.setCompanyLocation("Jakarta, Indonesia");
        exp2.setStartDate(LocalDate.of(2020, 7, 1));
        exp2.setEndDate(LocalDate.of(2025, 7, 15));
        exp2.setIsCurrent(false);
        exp2.setDescription("For the past four years, I have served as a senior IT developer, actively " +
                "engaged in end-to-end handling many of applications within this company.");
        exp2.setTechnologiesUsed("Java, Spring Boot, Oracle, SQL Server, Angular, Git, Jenkins, SSIS");
        exp2.setKeyAchievements("• Successfully delivered multiple enterprise applications\n" +
                "• Improved system performance by 30%\n" +
                "• Led a team of 3 junior developers\n" +
                "• Implemented CI/CD pipelines\n" +
                "• Developed and maintained complex database integrations");
        exp2.setDisplayOrder(2);
        exp2.setProfileId(profile.getId());
        
        experienceRepository.saveAll(List.of(exp1, exp2));
    }
    
    private void createEducation(Profile profile) {
        Education edu1 = new Education();
        edu1.setDegree("Master of Computer Science");
        edu1.setFieldOfStudy("Computer Science");
        edu1.setInstitutionName("Sepuluh Nopember Institute of Technology");
        edu1.setInstitutionLocation("Surabaya, Indonesia");
        edu1.setStartDate(LocalDate.of(2022, 6, 1));
        edu1.setEndDate(LocalDate.of(2024, 3, 31));
        edu1.setIsCurrent(false);
        edu1.setGpa(new BigDecimal("3.81"));
        edu1.setMaxGpa(new BigDecimal("4.00"));
        edu1.setDescription("Advanced studies in computer science with focus on software engineering and system design.");
        edu1.setDisplayOrder(1);
        edu1.setProfileId(profile.getId());
        
        Education edu2 = new Education();
        edu2.setDegree("Bachelor of Computer Science");
        edu2.setFieldOfStudy("Computer Science");
        edu2.setInstitutionName("Jenderal Soedirman University");
        edu2.setInstitutionLocation("Purwokerto, Indonesia");
        edu2.setStartDate(LocalDate.of(2015, 1, 1));
        edu2.setEndDate(LocalDate.of(2019, 12, 31));
        edu2.setIsCurrent(false);
        edu2.setGpa(new BigDecimal("3.65"));
        edu2.setMaxGpa(new BigDecimal("4.00"));
        edu2.setDescription("Comprehensive undergraduate program covering programming, algorithms, database systems, and software development.");
        edu2.setDisplayOrder(2);
        edu2.setProfileId(profile.getId());
        
        educationRepository.saveAll(List.of(edu1, edu2));
    }
    
    private void createSkills(Profile profile) {
        // Programming Languages
        Skill java = new Skill();
        java.setSkillName("Java");
        java.setSkillCategory("Programming Languages");
        java.setProficiencyLevel(92);
        java.setYearsExperience(5);
        java.setDescription("Core programming language for enterprise applications");
        java.setDisplayOrder(1);
        java.setIsFeatured(true);
        java.setProfileId(profile.getId());
        
        Skill javascript = new Skill();
        javascript.setSkillName("JavaScript");
        javascript.setSkillCategory("Programming Languages");
        javascript.setProficiencyLevel(85);
        javascript.setYearsExperience(4);
        javascript.setDescription("Frontend and backend development");
        javascript.setDisplayOrder(2);
        javascript.setIsFeatured(true);
        javascript.setProfileId(profile.getId());
        
        Skill php = new Skill();
        php.setSkillName("PHP");
        php.setSkillCategory("Programming Languages");
        php.setProficiencyLevel(80);
        php.setYearsExperience(3);
        php.setDescription("Web development and scripting");
        php.setDisplayOrder(3);
        php.setIsFeatured(true);
        php.setProfileId(profile.getId());
        
        // Web Technologies
        Skill html = new Skill();
        html.setSkillName("HTML");
        html.setSkillCategory("Web Technologies");
        html.setProficiencyLevel(80);
        html.setYearsExperience(5);
        html.setDescription("Markup language for web development");
        html.setDisplayOrder(4);
        html.setIsFeatured(true);
        html.setProfileId(profile.getId());
        
        Skill css = new Skill();
        css.setSkillName("CSS");
        css.setSkillCategory("Web Technologies");
        css.setProficiencyLevel(80);
        css.setYearsExperience(5);
        css.setDescription("Styling and layout for web applications");
        css.setDisplayOrder(5);
        css.setIsFeatured(true);
        css.setProfileId(profile.getId());
        
        // Frameworks
        Skill springBoot = new Skill();
        springBoot.setSkillName("Spring Boot");
        springBoot.setSkillCategory("Frameworks");
        springBoot.setProficiencyLevel(90);
        springBoot.setYearsExperience(4);
        springBoot.setDescription("Java framework for building enterprise applications");
        springBoot.setDisplayOrder(6);
        springBoot.setIsFeatured(true);
        springBoot.setProfileId(profile.getId());
        
        Skill angular = new Skill();
        angular.setSkillName("Angular");
        angular.setSkillCategory("Frameworks");
        angular.setProficiencyLevel(80);
        angular.setYearsExperience(3);
        angular.setDescription("Frontend framework for building SPAs");
        angular.setDisplayOrder(7);
        angular.setIsFeatured(true);
        angular.setProfileId(profile.getId());
        
        // Databases
        Skill oracle = new Skill();
        oracle.setSkillName("Oracle");
        oracle.setSkillCategory("Databases");
        oracle.setProficiencyLevel(90);
        oracle.setYearsExperience(4);
        oracle.setDescription("Enterprise database management");
        oracle.setDisplayOrder(8);
        oracle.setIsFeatured(true);
        oracle.setProfileId(profile.getId());
        
        Skill sqlServer = new Skill();
        sqlServer.setSkillName("SQL Server");
        sqlServer.setSkillCategory("Databases");
        sqlServer.setProficiencyLevel(90);
        sqlServer.setYearsExperience(4);
        sqlServer.setDescription("Microsoft database platform");
        sqlServer.setDisplayOrder(9);
        sqlServer.setIsFeatured(true);
        sqlServer.setProfileId(profile.getId());
        
        // Version Control & DevOps
        Skill git = new Skill();
        git.setSkillName("Git");
        git.setSkillCategory("Version Control & DevOps");
        git.setProficiencyLevel(90);
        git.setYearsExperience(5);
        git.setDescription("Distributed version control system");
        git.setDisplayOrder(10);
        git.setIsFeatured(true);
        git.setProfileId(profile.getId());
        
        Skill bitbucket = new Skill();
        bitbucket.setSkillName("BitBucket");
        bitbucket.setSkillCategory("Version Control & DevOps");
        bitbucket.setProficiencyLevel(90);
        bitbucket.setYearsExperience(4);
        bitbucket.setDescription("Git repository management and CI/CD");
        bitbucket.setDisplayOrder(11);
        bitbucket.setIsFeatured(true);
        bitbucket.setProfileId(profile.getId());
        
        Skill jenkins = new Skill();
        jenkins.setSkillName("Jenkins");
        jenkins.setSkillCategory("Version Control & DevOps");
        jenkins.setProficiencyLevel(80);
        jenkins.setYearsExperience(3);
        jenkins.setDescription("Continuous integration and deployment");
        jenkins.setDisplayOrder(12);
        jenkins.setIsFeatured(true);
        jenkins.setProfileId(profile.getId());
        
        // Operating Systems
        Skill windows = new Skill();
        windows.setSkillName("Windows");
        windows.setSkillCategory("Operating Systems");
        windows.setProficiencyLevel(90);
        windows.setYearsExperience(10);
        windows.setDescription("Windows server and desktop administration");
        windows.setDisplayOrder(13);
        windows.setIsFeatured(true);
        windows.setProfileId(profile.getId());
        
        Skill linux = new Skill();
        linux.setSkillName("Linux");
        linux.setSkillCategory("Operating Systems");
        linux.setProficiencyLevel(85);
        linux.setYearsExperience(4);
        linux.setDescription("Linux system administration and deployment");
        linux.setDisplayOrder(14);
        linux.setIsFeatured(true);
        linux.setProfileId(profile.getId());
        
        // Data Integration & Analytics
        Skill ssis = new Skill();
        ssis.setSkillName("SSIS");
        ssis.setSkillCategory("Data Integration & Analytics");
        ssis.setProficiencyLevel(90);
        ssis.setYearsExperience(3);
        ssis.setDescription("SQL Server Integration Services for ETL processes");
        ssis.setDisplayOrder(15);
        ssis.setIsFeatured(true);
        ssis.setProfileId(profile.getId());
        
        Skill dataAnalytics = new Skill();
        dataAnalytics.setSkillName("Database & Analytics");
        dataAnalytics.setSkillCategory("Data Integration & Analytics");
        dataAnalytics.setProficiencyLevel(80);
        dataAnalytics.setYearsExperience(4);
        dataAnalytics.setDescription("Database design and data analytics");
        dataAnalytics.setDisplayOrder(16);
        dataAnalytics.setIsFeatured(true);
        dataAnalytics.setProfileId(profile.getId());
        
        // Productivity Tools
        Skill msOffice = new Skill();
        msOffice.setSkillName("Microsoft Office");
        msOffice.setSkillCategory("Productivity Tools");
        msOffice.setProficiencyLevel(85);
        msOffice.setYearsExperience(10);
        msOffice.setDescription("Advanced proficiency in Office suite");
        msOffice.setDisplayOrder(17);
        msOffice.setIsFeatured(true);
        msOffice.setProfileId(profile.getId());
        
        skillRepository.saveAll(List.of(java, javascript, php, html, css, springBoot, angular, 
                oracle, sqlServer, git, bitbucket, jenkins, windows, linux, ssis, dataAnalytics, msOffice));
    }
    
    private void createAchievements(Profile profile) {
        Achievement ach1 = new Achievement();
        ach1.setTitle("English Proficiency B2 CEFR Level (480)");
        ach1.setIssuingOrganization("Language Testing Organization");
        ach1.setIssueDate(LocalDate.of(2023, 19, 9));
        ach1.setCredentialId("CEFR-B2-480");
        ach1.setDescription("Achieved B2 level English proficiency with score of 480");
        ach1.setAchievementType(Achievement.AchievementType.LANGUAGE_PROFICIENCY);
        ach1.setDisplayOrder(1);
        ach1.setIsFeatured(true);
        ach1.setProfileId(profile.getId());
        
        Achievement ach2 = new Achievement();
        ach2.setTitle("Presenter Certification for ICICyTa 2023");
        ach2.setIssuingOrganization("ICICyTa Conference");
        ach2.setIssueDate(LocalDate.of(2023, 13, 12));
        ach2.setCredentialId("ICICyTa-2023-PRESENTER");
        ach2.setDescription("Certified presenter at ICTGov 2023 conference");
        ach2.setAchievementType(Achievement.AchievementType.PRESENTATION);
        ach2.setDisplayOrder(2);
        ach2.setIsFeatured(true);
        ach2.setProfileId(profile.getId());
        
        Achievement ach3 = new Achievement();
        ach3.setTitle("Presenter Certification for ICTISEE 2023");
        ach3.setIssuingOrganization("ICTISEE Conference");
        ach3.setIssueDate(LocalDate.of(2023, 30, 11));
        ach3.setCredentialId("ICTISEE-2023-PRESENTER");
        ach3.setDescription("Security Characteristic Evaluation of Insurance Agency Portal Based on
ISO/IEC 25023 Quality Model");
        ach3.setAchievementType(Achievement.AchievementType.PRESENTATION);
        ach3.setDisplayOrder(3);
        ach3.setIsFeatured(true);
        ach3.setProfileId(profile.getId());
        
        Achievement ach4 = new Achievement();
        ach4.setTitle("Author Certification for ICAMIMIA 2023");
        ach4.setIssuingOrganization("ICAMIMIA Conference");
        ach4.setIssueDate(LocalDate.of(2023, 15, 11));
        ach4.setCredentialId("ICAMIMIA-2023-AUDITOR");
        ach4.setDescription("Ransomware Transaction Detection on the Blockchain with the TabNet
Model");
        ach4.setAchievementType(Achievement.AchievementType.CERTIFICATION);
        ach4.setDisplayOrder(4);
        ach4.setIsFeatured(true);
        ach4.setProfileId(profile.getId());
        
        Achievement ach5 = new Achievement();
        ach5.setTitle("English Toefl Course at LIA");
        ach5.setIssuingOrganization("LIA (Lembaga Indonesia Amerika)");
        ach5.setIssueDate(LocalDate.of(2016, 1, 1));
        ach5.setCredentialId("LIA-TOEFL-2016");
        ach5.setDescription("Completed TOEFL preparation course at LIA");
        ach5.setAchievementType(Achievement.AchievementType.COURSE_COMPLETION);
        ach5.setDisplayOrder(5);
        ach5.setIsFeatured(true);
        ach5.setProfileId(profile.getId());
        
        Achievement ach6 = new Achievement();
        ach6.setTitle("English Language Course at LIA");
        ach6.setIssuingOrganization("LIA (Lembaga Indonesia Amerika)");
        ach6.setIssueDate(LocalDate.of(2017, 1, 1));
        ach6.setCredentialId("LIA-ENGLISH-2017");
        ach6.setDescription("Completed English language course at LIA");
        ach6.setAchievementType(Achievement.AchievementType.COURSE_COMPLETION);
        ach6.setDisplayOrder(6);
        ach6.setIsFeatured(true);
        ach6.setProfileId(profile.getId());
        
        Achievement ach7 = new Achievement();
        ach7.setTitle("Bootcamp Java Developer");
        ach7.setIssuingOrganization("Ahlimata Persada");
        ach7.setIssueDate(LocalDate.of(2019, 4, 1));
        ach7.setCredentialId("AHLIMATA-JAVA-2019");
        ach7.setDescription("Completed intensive Java development bootcamp");
        ach7.setAchievementType(Achievement.AchievementType.COURSE_COMPLETION);
        ach7.setDisplayOrder(7);
        ach7.setIsFeatured(true);
        ach7.setProfileId(profile.getId());
        
        achievementRepository.saveAll(List.of(ach1, ach2, ach3, ach4, ach5, ach6, ach7));
    }
    
    private void createProjects(Profile profile) {
        // Project 1: Bebus - Bus Booking System (Backend)
        Project bebus = new Project();
        bebus.setTitle("PesanBus - Bus Booking System (Backend)");
        bebus.setDescription("Backend API untuk sistem pemesanan tiket bus online dengan fitur manajemen rute, jadwal, pembayaran, dan notifikasi real-time. Dibangun dengan arsitektur microservices yang scalable.");
        bebus.setShortDescription("Backend API untuk sistem pemesanan tiket bus online");
        bebus.setStartDate(LocalDate.of(2025, 1, 3));
        bebus.setEndDate(LocalDate.of(2025, 1, 3));
        bebus.setStatus(Project.ProjectStatus.FINISHED);
        bebus.setProjectUrl("https://pesanbus.my.id");
        bebus.setGithubUrl("https://github.com/MuhammadDarmawanFadilah/bebus");
        bebus.setClientName("Madio Prasetyo");
        bebus.setTeamSize(2);
        bebus.setMyRole("Backend Developer");
        bebus.setCompletionPercentage(100);
        bebus.setIsFeatured(true);
        bebus.setDisplayOrder(1);
        bebus.setTechnologies(List.of("PHP", "Laravel", "MySQL", "REST API", "JWT", "Composer"));
        bebus.setFeatures(List.of("REST API", "Route management", "Payment integration", "Real-time notifications", "Scalable architecture", "Database optimization"));
        bebus.setProfile(profile);
        
        // Project 2: Febus - Frontend for Bus System
        Project febus = new Project();
        febus.setTitle("PesanBus - Bus Booking System (Frontend)");
        febus.setDescription("Frontend aplikasi pemesanan tiket bus dengan interface yang user-friendly. Fitur pencarian rute, pemilihan kursi, pembayaran online, dan tracking perjalanan real-time.");
        febus.setShortDescription("Frontend aplikasi pemesanan tiket bus dengan UI modern");
        febus.setStartDate(LocalDate.of(2025, 1, 3));
        febus.setEndDate(LocalDate.of(2025, 3, 1));
        febus.setStatus(Project.ProjectStatus.FINISHED);
        febus.setProjectUrl("https://pesanbus.my.id");
        febus.setGithubUrl("https://github.com/MuhammadDarmawanFadilah/febus");
        febus.setClientName("Madio Prasetyo");
        febus.setTeamSize(2);
        febus.setMyRole("Frontend Developer");
        febus.setCompletionPercentage(100);
        febus.setIsFeatured(true);
        febus.setDisplayOrder(2);
        febus.setTechnologies(List.of("Next.js", "TypeScript", "Tailwind CSS", "React", "PWA", "Axios"));
        febus.setFeatures(List.of("Responsive design", "Real-time updates", "Interactive seat map", "Payment integration", "User dashboard", "Mobile optimization"));
        febus.setProfile(profile);
        
        // Project 3: Alumni System
        Project alumni = new Project();
        alumni.setTitle("IKAFK Alumni Management System");
        alumni.setDescription("Sistem manajemen alumni yang komprehensif untuk mengelola data alumni, event, networking, dan komunikasi. Dilengkapi dengan fitur pencarian alumni, direktori, dan sistem notifikasi.");
        alumni.setShortDescription("Sistem manajemen alumni dengan fitur networking");
        alumni.setStartDate(LocalDate.of(2025, 6, 1));
        alumni.setEndDate(LocalDate.of(2025, 7, 1));
        alumni.setStatus(Project.ProjectStatus.FINISHED);
        alumni.setProjectUrl("https://ikafk.my.id");
        alumni.setGithubUrl("https://github.com/MuhammadDarmawanFadilah/alumni");
        alumni.setClientName("Dr. Tika");
        alumni.setTeamSize(3);
        alumni.setMyRole("Full Stack Developer");
        alumni.setCompletionPercentage(100);
        alumni.setIsFeatured(true);
        alumni.setDisplayOrder(3);
        alumni.setTechnologies(List.of("Laravel", "MySQL", "Bootstrap", "jQuery", "PHP", "Apache"));
        alumni.setFeatures(List.of("Alumni directory", "Event management", "News system", "User authentication", "Admin dashboard", "Email notifications"));
        alumni.setProfile(profile);
        
        // Project 4: TB MDR Android App
        Project tbMdr = new Project();
        tbMdr.setTitle("Android TB MDR");
        tbMdr.setDescription("REST API untuk aplikasi mobile monitoring dan pelaporan Tuberkulosis Multi-Drug Resistant. Sistem tracking pasien, jadwal pengobatan, dan laporan medis digital.");
        tbMdr.setShortDescription("REST API untuk aplikasi mobile TB MDR monitoring");
        tbMdr.setStartDate(LocalDate.of(2025, 2, 1));
        tbMdr.setEndDate(LocalDate.of(2025, 10, 28));
        tbMdr.setStatus(Project.ProjectStatus.FINISHED);
        tbMdr.setProjectUrl(null);
        tbMdr.setGithubUrl(null);
        tbMdr.setClientName("Peppy Octaviani");
        tbMdr.setTeamSize(4);
        tbMdr.setMyRole("Backend API Developer");
        tbMdr.setCompletionPercentage(100);
        tbMdr.setIsFeatured(false);
        tbMdr.setDisplayOrder(4);
        tbMdr.setTechnologies(List.of("Node.js", "Express", "MongoDB", "JWT", "Multer", "Firebase"));
        tbMdr.setFeatures(List.of("Patient management", "Medication tracking", "Health monitoring", "Appointment scheduling", "Data synchronization", "Offline support"));
        tbMdr.setProfile(profile);
        
        // Project 5: Personal Portfolio Website
        Project portfolio = new Project();
        portfolio.setTitle("Personal Portfolio Website");
        portfolio.setDescription("Website portfolio personal yang modern dan responsif untuk showcase projects, skills, dan pengalaman profesional. Dibangun dengan teknologi terkini dan optimized untuk performance.");
        portfolio.setShortDescription("Website portfolio personal dengan teknologi modern");
        portfolio.setStartDate(LocalDate.of(2024, 7, 13));
        portfolio.setEndDate(LocalDate.of(2024, 7, 13));
        portfolio.setStatus(Project.ProjectStatus.FINISHED);
        portfolio.setProjectUrl("http://mdarmawanf.my.id");
        portfolio.setGithubUrl("https://github.com/MuhammadDarmawanFadilah/webafan-portfolio");
        portfolio.setClientName("Personal Project");
        portfolio.setTeamSize(1);
        portfolio.setMyRole("Full Stack Developer");
        portfolio.setCompletionPercentage(95);
        portfolio.setIsFeatured(true);
        portfolio.setDisplayOrder(5);
        portfolio.setTechnologies(List.of("React", "TypeScript", "Tailwind CSS", "Spring Boot", "MySQL", "JWT"));
        portfolio.setFeatures(List.of("Responsive design", "Admin panel", "Contact form", "Project showcase", "Skills management", "Experience timeline"));
        portfolio.setProfile(profile);
        
        // Project 6: Attendance Management System
        Project absensi = new Project();
        absensi.setTitle("Bawaslu Attendance System");
        absensi.setDescription("Sistem absensi digital untuk Bawaslu Lampung dengan fitur face recognition, GPS tracking, dan laporan kehadiran real-time. Meningkatkan efisiensi dan akurasi pencatatan kehadiran pegawai.");
        absensi.setShortDescription("Sistem absensi digital dengan face recognition");
        absensi.setStartDate(LocalDate.of(2025, 7, 1));
        absensi.setEndDate(LocalDate.of(2025, 9, 30));
        absensi.setStatus(Project.ProjectStatus.FINISHED);
        absensi.setProjectUrl("http://absenkantor.my.id");
        absensi.setGithubUrl("https://github.com/MuhammadDarmawanFadilah/absensi");
        absensi.setClientName("Bawaslu Lampung");
        absensi.setTeamSize(2);
        absensi.setMyRole("Full Stack Developer");
        absensi.setCompletionPercentage(100);
        absensi.setIsFeatured(true);
        absensi.setDisplayOrder(6);
        absensi.setTechnologies(List.of("Laravel", "MySQL", "JavaScript", "Face-API.js", "GPS API", "Bootstrap"));
        absensi.setFeatures(List.of("Face recognition", "GPS tracking", "Real-time reports", "Employee management", "Attendance analytics", "Mobile responsive"));
        absensi.setProfile(profile);
        
        // Project 7: Election System
        Project pemilihan = new Project();
        pemilihan.setTitle("Election Management System");
        pemilihan.setDescription("Sistem manajemen pemilihan untuk Bawaslu Yogyakarta dengan fitur registrasi kandidat, voting online, real-time counting, dan reporting. Sistem aman dengan enkripsi end-to-end.");
        pemilihan.setShortDescription("Sistem manajemen pemilihan dengan voting online yang aman");
        pemilihan.setStartDate(LocalDate.of(2025, 7, 1));
        pemilihan.setEndDate(LocalDate.of(2025, 7, 15));
        pemilihan.setStatus(Project.ProjectStatus.FINISHED);
        pemilihan.setProjectUrl("#");
        pemilihan.setGithubUrl("https://github.com/MuhammadDarmawanFadilah/pemilihan");
        pemilihan.setClientName("Bawaslu Yogyakarta");
        pemilihan.setTeamSize(3);
        pemilihan.setMyRole("Full Stack Developer & Security Specialist");
        pemilihan.setCompletionPercentage(100);
        pemilihan.setIsFeatured(false);
        pemilihan.setDisplayOrder(7);
        pemilihan.setTechnologies(List.of("PHP", "MySQL", "JavaScript", "Bootstrap", "Encryption", "Chart.js"));
        pemilihan.setFeatures(List.of("Secure voting", "Candidate management", "Real-time results", "Voter verification", "Election monitoring", "Audit trail"));
        pemilihan.setProfile(profile);
        
        projectRepository.saveAll(List.of(bebus, febus, alumni, tbMdr, portfolio, absensi, pemilihan));
    }
    
    private void createAdminUser() {
        User adminUser = new User();
        adminUser.setUsername("afan");
        adminUser.setPassword(passwordEncoder.encode("P@ssw0rd"));
        adminUser.setRole(User.Role.ADMIN);
        adminUser.setIsActive(true);
        
        User savedUser = userRepository.save(adminUser);
        System.out.println("Default admin user initialized successfully - Username: " + savedUser.getUsername());
    }
}