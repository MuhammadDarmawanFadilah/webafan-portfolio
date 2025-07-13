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

const Experience = () => {
  const experiences = [
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
  ]

  const skills = [
    { name: "Application Development", icon: <Code className="w-5 h-5" />, color: "bg-blue-500" },
    { name: "Database Management", icon: <Database className="w-5 h-5" />, color: "bg-green-500" },
    { name: "System Architecture", icon: <Server className="w-5 h-5" />, color: "bg-purple-500" },
    { name: "Team Leadership", icon: <Users className="w-5 h-5" />, color: "bg-orange-500" }
  ]

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-medium mb-4">
            <Briefcase className="w-4 h-4 mr-2" />
            Professional Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Professional 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Over 5 years of hands-on experience in software development, from junior developer to senior role, 
            building enterprise applications and leading development teams.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Skills Overview */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Core Competencies</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${skill.color} rounded-lg flex items-center justify-center text-white`}>
                      {skill.icon}
                    </div>
                    <span className="font-medium text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Career Highlights</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Experience</span>
                    <span className="font-semibold text-purple-600">5+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Projects Led</span>
                    <span className="font-semibold text-blue-600">15+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Team Members</span>
                    <span className="font-semibold text-green-600">5+</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>
              
              <div className="space-y-12">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline Dot */}
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                      exp.current ? 'bg-purple-500 animate-pulse' : 'bg-blue-500'
                    }`}></div>
                    
                    {/* Experience Card */}
                    <div className="ml-20">
                      <Card className={`p-8 shadow-xl border-0 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 ${
                        exp.current 
                          ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-purple-500' 
                          : 'bg-white'
                      }`}>
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                            <p className="text-lg font-semibold text-purple-600 mb-2">{exp.company}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {exp.period}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {exp.location}
                              </div>
                              <Badge className={exp.current ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}>
                                {exp.duration}
                              </Badge>
                            </div>
                          </div>
                          {exp.current && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Current
                            </Badge>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb-6">{exp.description}</p>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors">
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
        <div className="text-center mt-16">
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
        </div>
      </div>
    </section>
  )
}

export default Experience