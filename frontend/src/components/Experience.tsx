import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Code, 
  Database, 
  Server, 
  Users 
} from 'lucide-react'
import { profileService, type Profile } from '@/services/profileService'

const Experience = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getPublicProfile();
      setProfile(profileData);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white" id="experience">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="py-20 bg-white" id="experience">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-600">Profile not found</p>
        </div>
      </section>
    );
  }
  // Default experiences if no data from API
  const defaultExperiences = [
    {
      id: 1,
      title: "Senior Developer",
      company: "PT. Graha Sarana Duta",
      location: "Jakarta, Indonesia",
      period: "2020 - Present",
      duration: "4+ years",
      type: "Full-time",
      description: "Leading application development and handling complex enterprise solutions. Responsible for system architecture, code reviews, and mentoring junior developers.",
      achievements: [
        "Led development of 15+ enterprise applications",
        "Improved system performance by 40% through optimization",
        "Mentored 5+ junior developers",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ],
      technologies: ["Java", "Spring Boot", "Oracle", "SQL Server", "Jenkins", "Git", "Angular"],
      current: true
    },
    {
      id: 2,
      title: "Junior Java Developer",
      company: "PT. Askrindo Syariah",
      location: "Jakarta, Indonesia",
      period: "2019 - 2020",
      duration: "1 year",
      type: "Full-time",
      description: "Started as a bootcamp graduate and quickly transitioned to a tester role, then developer. Gained hands-on experience in Java development and testing methodologies.",
      achievements: [
        "Successfully completed Java bootcamp program",
        "Transitioned from tester to developer role",
        "Contributed to 5+ projects",
        "Learned enterprise development practices"
      ],
      technologies: ["Java", "Spring Framework", "MySQL", "JUnit", "Maven"],
      current: false
    }
  ];

  // Use default experiences since profile doesn't have experiences property
  const experiences = defaultExperiences;

  const skills = [
    { name: "Application Development", icon: <Code className="w-5 h-5" />, color: "bg-blue-500" },
    { name: "Database Management", icon: <Database className="w-5 h-5" />, color: "bg-green-500" },
    { name: "System Architecture", icon: <Server className="w-5 h-5" />, color: "bg-purple-500" },
    { name: "Team Leadership", icon: <Users className="w-5 h-5" />, color: "bg-orange-500" }
  ]

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 rounded-full text-purple-700 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Professional Experience
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            My Professional 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Journey</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Over 5 years of hands-on experience in software development, from junior developer to senior role, 
            building enterprise applications and leading development teams.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Skills Overview */}
          <div className="lg:col-span-1">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-xl lg:sticky lg:top-24">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Core Competencies</h3>
              <div className="space-y-3 sm:space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${skill.color} rounded-lg flex items-center justify-center text-white`}>
                      <div className="w-4 h-4 sm:w-5 sm:h-5">
                        {skill.icon}
                      </div>
                    </div>
                    <span className="font-medium text-gray-700 text-sm sm:text-base">{skill.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Career Highlights</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Total Experience</span>
                    <span className="font-semibold text-purple-600 text-sm sm:text-base">5+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Projects Led</span>
                    <span className="font-semibold text-blue-600 text-sm sm:text-base">15+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Team Members</span>
                    <span className="font-semibold text-green-600 text-sm sm:text-base">5+</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>
              
              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                {experiences.map((exp: any) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline Dot */}
                    <div className={`absolute left-2.5 sm:left-4.5 lg:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-white shadow-lg ${
                      exp.current ? 'bg-purple-500 animate-pulse' : 'bg-blue-500'
                    }`}></div>
                    
                    {/* Experience Card */}
                    <div className="ml-10 sm:ml-16 lg:ml-20">
                      <Card className={`p-4 sm:p-6 lg:p-8 shadow-xl border-0 transition-all duration-300 hover:shadow-2xl lg:transform lg:hover:scale-105 ${
                        exp.current 
                          ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-purple-500' 
                          : 'bg-white'
                      }`}>
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                            <p className="text-base sm:text-lg font-semibold text-purple-600 mb-2">{exp.company}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {exp.period}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span className="hidden sm:inline">{exp.location}</span>
                                <span className="sm:hidden">Jakarta</span>
                              </div>
                              <Badge className={`text-xs px-2 py-1 ${exp.current ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                {exp.duration}
                              </Badge>
                            </div>
                          </div>
                          {exp.current && (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-1 mt-2 sm:mt-0">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Current
                            </Badge>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">{exp.description}</p>

                        {/* Achievements */}
                        <div className="mb-4 sm:mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Key Achievements</h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {exp.achievements.map((achievement: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Technologies Used</h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {exp.technologies.map((tech: string) => (
                              <Badge key={tech} className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors text-xs px-2 py-1">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and contribute to innovative projects. 
              Let's discuss how my experience can benefit your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                View My Projects
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors">
                Contact Me
              </button>
            </div>
          </Card>
        </div> */}
      </div>
    </section>
  )
}

export default Experience