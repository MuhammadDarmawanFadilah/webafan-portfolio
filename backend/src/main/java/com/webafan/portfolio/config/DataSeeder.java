package com.webafan.portfolio.config;

import com.webafan.portfolio.entity.*;
import com.webafan.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
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
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataSeeder(ProfileRepository profileRepository, 
                     ExperienceRepository experienceRepository,
                     EducationRepository educationRepository,
                     SkillRepository skillRepository,
                     AchievementRepository achievementRepository,
                     UserRepository userRepository,
                     PasswordEncoder passwordEncoder) {
        this.profileRepository = profileRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) throws Exception {
        if (profileRepository.count() == 0) {
            seedData();
        }
        
        // Create admin user if not exists
        if (userRepository.count() == 0) {
            createAdminUser();
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
        
        System.out.println("✅ Database seeded with M. Darmawan Fadilah's portfolio data");
    }
    
    private Profile createMainProfile() {
        Profile profile = new Profile();
        profile.setFullName("M. Darmawan Fadilah S.Kom, M.Kom");
        profile.setTitle("Senior Developer");
        profile.setEmail("muhammaddarmawan@gmail.com");
        profile.setPhone("+62 856 0012 7 856");
        profile.setBirthDate(LocalDate.of(1997, 12, 8));
        profile.setBirthPlace("Palangka Raya");
        profile.setAddress("Bukit Nusa Indah, Jl. Cempaka kav. 248, Rt.05 Rw.13 kel. senja, Kec. ciputat, Tangerang Selatan");
        profile.setCurrentAddress("Griya Satria Indah 02 Blok M No. 19 Rt 03 Rw. 10 Sukamakmur, Purwokerto Utara, Banyumas, Jawa Tengah (53125)");
        profile.setAbout("Experienced Senior Developer with 5+ years in Java programming, Spring Boot, and full-stack development. " +
                "Proven track record in designing, debugging, and maintaining complex applications. " +
                "Strong communication skills and AI utilization for efficient task completion. " +
                "Committed to continuous learning, responsibility, and delivering high-quality solutions.");
        profile.setYearsExperience(5);
        
        return profileRepository.save(profile);
    }
    
    private void createExperiences(Profile profile) {
        Experience exp1 = new Experience();
        exp1.setJobTitle("Senior Developer");
        exp1.setCompanyName("PT. Graha Sarana Duta");
        exp1.setCompanyLocation("Jakarta, Indonesia");
        exp1.setStartDate(LocalDate.of(2020, 1, 1));
        exp1.setEndDate(LocalDate.of(2024, 12, 31));
        exp1.setIsCurrent(false);
        exp1.setDescription("Leading application development and maintenance projects. " +
                "Responsible for system design, code review, and team collaboration. " +
                "Handling complex technical challenges and ensuring high-quality deliverables.");
        exp1.setTechnologiesUsed("Java, Spring Boot, Oracle, SQL Server, Angular, Git, Jenkins");
        exp1.setKeyAchievements("• Successfully delivered multiple enterprise applications\n" +
                "• Improved system performance by 30%\n" +
                "• Led a team of 3 junior developers\n" +
                "• Implemented CI/CD pipelines");
        exp1.setDisplayOrder(1);
        exp1.setProfile(profile);
        
        Experience exp2 = new Experience();
        exp2.setJobTitle("Junior Java Developer");
        exp2.setCompanyName("PT. Askrindo Syariah");
        exp2.setCompanyLocation("Jakarta, Indonesia");
        exp2.setStartDate(LocalDate.of(2019, 1, 1));
        exp2.setEndDate(LocalDate.of(2020, 12, 31));
        exp2.setIsCurrent(false);
        exp2.setDescription("Started as a bootcamp participant and progressed to a tester role. " +
                "Gained hands-on experience in Java development and software testing. " +
                "Learned industry best practices and development methodologies.");
        exp2.setTechnologiesUsed("Java, Spring Framework, MySQL, JUnit, Selenium");
        exp2.setKeyAchievements("• Completed intensive Java bootcamp program\n" +
                "• Transitioned from trainee to full-time developer\n" +
                "• Contributed to testing automation framework\n" +
                "• Gained experience in Agile development");
        exp2.setDisplayOrder(2);
        exp2.setProfile(profile);
        
        experienceRepository.saveAll(List.of(exp1, exp2));
    }
    
    private void createEducation(Profile profile) {
        Education edu1 = new Education();
        edu1.setDegree("Master of Computer Science");
        edu1.setFieldOfStudy("Computer Science");
        edu1.setInstitutionName("Sepuluh Nopember Institute of Technology");
        edu1.setInstitutionLocation("Surabaya, Indonesia");
        edu1.setStartDate(LocalDate.of(2022, 1, 1));
        edu1.setEndDate(LocalDate.of(2024, 12, 31));
        edu1.setIsCurrent(false);
        edu1.setGpa(new BigDecimal("3.81"));
        edu1.setMaxGpa(new BigDecimal("4.00"));
        edu1.setDescription("Advanced studies in computer science with focus on software engineering and system design.");
        edu1.setDisplayOrder(1);
        edu1.setProfile(profile);
        
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
        edu2.setProfile(profile);
        
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
        java.setProfile(profile);
        
        Skill javascript = new Skill();
        javascript.setSkillName("JavaScript");
        javascript.setSkillCategory("Programming Languages");
        javascript.setProficiencyLevel(85);
        javascript.setYearsExperience(4);
        javascript.setDescription("Frontend and backend development");
        javascript.setDisplayOrder(2);
        javascript.setIsFeatured(true);
        javascript.setProfile(profile);
        
        Skill php = new Skill();
        php.setSkillName("PHP");
        php.setSkillCategory("Programming Languages");
        php.setProficiencyLevel(80);
        php.setYearsExperience(3);
        php.setDescription("Web development and scripting");
        php.setDisplayOrder(3);
        php.setIsFeatured(false);
        php.setProfile(profile);
        
        // Frameworks
        Skill springBoot = new Skill();
        springBoot.setSkillName("Spring Boot");
        springBoot.setSkillCategory("Frameworks");
        springBoot.setProficiencyLevel(90);
        springBoot.setYearsExperience(4);
        springBoot.setDescription("Java framework for building enterprise applications");
        springBoot.setDisplayOrder(4);
        springBoot.setIsFeatured(true);
        springBoot.setProfile(profile);
        
        Skill angular = new Skill();
        angular.setSkillName("Angular");
        angular.setSkillCategory("Frameworks");
        angular.setProficiencyLevel(80);
        angular.setYearsExperience(3);
        angular.setDescription("Frontend framework for building SPAs");
        angular.setDisplayOrder(5);
        angular.setIsFeatured(true);
        angular.setProfile(profile);
        
        // Databases
        Skill oracle = new Skill();
        oracle.setSkillName("Oracle");
        oracle.setSkillCategory("Databases");
        oracle.setProficiencyLevel(90);
        oracle.setYearsExperience(4);
        oracle.setDescription("Enterprise database management");
        oracle.setDisplayOrder(6);
        oracle.setIsFeatured(true);
        oracle.setProfile(profile);
        
        Skill sqlServer = new Skill();
        sqlServer.setSkillName("SQL Server");
        sqlServer.setSkillCategory("Databases");
        sqlServer.setProficiencyLevel(90);
        sqlServer.setYearsExperience(4);
        sqlServer.setDescription("Microsoft database platform");
        sqlServer.setDisplayOrder(7);
        sqlServer.setIsFeatured(true);
        sqlServer.setProfile(profile);
        
        skillRepository.saveAll(List.of(java, javascript, php, springBoot, angular, oracle, sqlServer));
    }
    
    private void createAchievements(Profile profile) {
        Achievement ach1 = new Achievement();
        ach1.setTitle("English Proficiency B2 CEFR Level (480)");
        ach1.setIssuingOrganization("Language Testing Organization");
        ach1.setIssueDate(LocalDate.of(2023, 1, 1));
        ach1.setCredentialId("CEFR-B2-480");
        ach1.setDescription("Achieved B2 level English proficiency with score of 480");
        ach1.setAchievementType(Achievement.AchievementType.LANGUAGE_PROFICIENCY);
        ach1.setDisplayOrder(1);
        ach1.setIsFeatured(true);
        ach1.setProfile(profile);
        
        Achievement ach2 = new Achievement();
        ach2.setTitle("Presenter Certification for ICTGov 2023");
        ach2.setIssuingOrganization("ICTGov Conference");
        ach2.setIssueDate(LocalDate.of(2023, 1, 1));
        ach2.setCredentialId("ICTGOV-2023-PRESENTER");
        ach2.setDescription("Certified presenter at ICTGov 2023 conference");
        ach2.setAchievementType(Achievement.AchievementType.PRESENTATION);
        ach2.setDisplayOrder(2);
        ach2.setIsFeatured(true);
        ach2.setProfile(profile);
        
        Achievement ach3 = new Achievement();
        ach3.setTitle("Bootcamp Java Developer");
        ach3.setIssuingOrganization("Ahlimata Persada");
        ach3.setIssueDate(LocalDate.of(2019, 1, 1));
        ach3.setCredentialId("AHLIMATA-JAVA-2019");
        ach3.setDescription("Completed intensive Java development bootcamp");
        ach3.setAchievementType(Achievement.AchievementType.COURSE_COMPLETION);
        ach3.setDisplayOrder(3);
        ach3.setIsFeatured(true);
        ach3.setProfile(profile);
        
        achievementRepository.saveAll(List.of(ach1, ach2, ach3));
    }
    
    private void createAdminUser() {
        User adminUser = new User();
        adminUser.setUsername("afan");
        adminUser.setPassword(passwordEncoder.encode("P@ssw0rd"));
        adminUser.setRole(User.Role.ADMIN);
        adminUser.setIsActive(true);
        
        User savedUser = userRepository.save(adminUser);
        System.out.println("✅ Admin user created - Username: afan, Password: P@ssw0rd");
        System.out.println("✅ Admin user details - ID: " + savedUser.getId() + ", IsActive: " + savedUser.getIsActive());
    }
}