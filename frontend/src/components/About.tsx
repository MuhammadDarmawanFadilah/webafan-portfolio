import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Target, 
  Heart, 
  Lightbulb, 
  Code2, 
  Database, 
  Server, 
  Globe 
} from 'lucide-react'
import { profileService, type Profile } from '@/services/profileService'

const About = () => {
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
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">Profile not found</p>
        </div>
      </section>
    );
  }
  const values = profile.values ? profileService.parseValues(profile.values) : [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Problem Solver",
      description: "I thrive on turning complex challenges into elegant, efficient solutions."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passionate Learner",
      description: "Continuous learning and staying updated with latest technologies drives me."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation Focused",
      description: "Always looking for creative ways to improve processes and user experiences."
    }
  ]

  const expertise = profile.expertiseAreas ? profileService.parseExpertiseAreas(profile.expertiseAreas) : [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Backend Development",
      description: "Expert in Java, Spring Boot, and enterprise application development",
      color: "bg-blue-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Management",
      description: "Proficient in Oracle, SQL Server, and database optimization",
      color: "bg-green-500"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "System Architecture",
      description: "Designing scalable and maintainable system architectures",
      color: "bg-purple-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Full Stack Development",
      description: "End-to-end application development with modern technologies",
      color: "bg-orange-500"
    }
  ]
  
  const technicalSkills = profile.technicalSkills ? profileService.parseTechnicalSkills(profile.technicalSkills) : []

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            About Me
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            Passionate Developer with a 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Vision</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            {profile.about || `With over ${profile.yearsExperience || 5} years of experience in software development, I specialize in creating robust, scalable applications that solve real-world problems and deliver exceptional user experiences.`}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Column - Story & Values */}
          <div className="space-y-6 sm:space-y-8">
            {/* My Story */}
            <Card className="p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">My Journey</h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  {profile.personalStory || "My passion for technology began during my computer science studies at Jenderal Soedirman University. What started as curiosity about how software works evolved into a deep commitment to crafting exceptional digital solutions."}
                </p>
                <p>
                  "I believe in writing clean, maintainable code that not only works but also tells a story. Every line of code is an opportunity to create something meaningful."
                </p>
              </div>
            </Card>

            {/* Core Values */}
            <Card className="p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What Drives Me</h3>
              <div className="space-y-4 sm:space-y-6">
                {values.map((value: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{value.title}</h4>
                      <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Expertise & Skills */}
          <div className="space-y-6 sm:space-y-8">
            {/* Expertise Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {expertise.map((area: any, index: number) => (
                <Card key={index} className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${area.color} rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto`}>
                    {area.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 text-center">{area.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm text-center">{area.description}</p>
                </Card>
              ))}
            </div>

            {/* Key Skills */}
            <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Technical Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Programming Languages</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span>Java</span>
                      <span className="text-blue-200">92%</span>
                    </div>
                    <div className="w-full bg-blue-400 rounded-full h-1.5 sm:h-2">
                      <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span>JavaScript</span>
                      <span className="text-blue-200">85%</span>
                    </div>
                    <div className="w-full bg-blue-400 rounded-full h-1.5 sm:h-2">
                      <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {['Spring Boot', 'Oracle', 'SQL Server', 'Git', 'Jenkins', 'Angular'].map((skill: string) => (
                      <Badge key={skill} className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors text-xs sm:text-sm px-2 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {technicalSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Additional Skills</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {technicalSkills.map((skill: string, index: number) => (
                      <Badge key={index} className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors text-xs sm:text-sm px-2 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About