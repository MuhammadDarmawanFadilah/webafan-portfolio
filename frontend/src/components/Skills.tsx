import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Code, 
  Database, 
  Server, 
  Globe, 
  Wrench, 
  Monitor, 
  Zap,
  Star
} from 'lucide-react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('programming')

  const skillCategories = [
    { id: 'programming', label: 'Programming', icon: <Code className="w-4 h-4" /> },
    { id: 'database', label: 'Database', icon: <Database className="w-4 h-4" /> },
    { id: 'frameworks', label: 'Frameworks', icon: <Server className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools & DevOps', icon: <Wrench className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Globe className="w-4 h-4" /> },
    { id: 'systems', label: 'Systems', icon: <Monitor className="w-4 h-4" /> }
  ]

  const skills = {
    programming: [
      { name: 'Java', level: 92, color: 'bg-red-500', description: 'Enterprise application development, Spring ecosystem' },
      { name: 'JavaScript', level: 85, color: 'bg-yellow-500', description: 'Modern ES6+, Node.js, frontend development' },
      { name: 'PHP', level: 80, color: 'bg-purple-500', description: 'Web development, Laravel framework' },
      { name: 'HTML/CSS', level: 80, color: 'bg-orange-500', description: 'Semantic markup, responsive design' }
    ],
    database: [
      { name: 'Oracle', level: 90, color: 'bg-red-600', description: 'Advanced SQL, PL/SQL, performance tuning' },
      { name: 'SQL Server', level: 90, color: 'bg-blue-600', description: 'T-SQL, SSIS, database administration' },
      { name: 'MySQL', level: 85, color: 'bg-blue-500', description: 'Database design, optimization, replication' },
      { name: 'PostgreSQL', level: 75, color: 'bg-indigo-500', description: 'Advanced features, JSON operations' }
    ],
    frameworks: [
      { name: 'Spring Boot', level: 90, color: 'bg-green-500', description: 'Microservices, REST APIs, security' },
      { name: 'Spring Framework', level: 88, color: 'bg-green-600', description: 'IoC, AOP, MVC architecture' },
      { name: 'Angular', level: 80, color: 'bg-red-500', description: 'Component-based architecture, TypeScript' },
      { name: 'React', level: 75, color: 'bg-blue-400', description: 'Hooks, state management, modern patterns' }
    ],
    tools: [
      { name: 'Git', level: 90, color: 'bg-orange-500', description: 'Version control, branching strategies' },
      { name: 'Jenkins', level: 80, color: 'bg-blue-700', description: 'CI/CD pipelines, automated deployment' },
      { name: 'Docker', level: 75, color: 'bg-blue-500', description: 'Containerization, microservices deployment' },
      { name: 'Maven', level: 85, color: 'bg-orange-600', description: 'Build automation, dependency management' }
    ],
    frontend: [
      { name: 'Tailwind CSS', level: 85, color: 'bg-cyan-500', description: 'Utility-first CSS framework' },
      { name: 'Bootstrap', level: 80, color: 'bg-purple-600', description: 'Responsive design, component library' },
      { name: 'TypeScript', level: 78, color: 'bg-blue-600', description: 'Type-safe JavaScript development' },
      { name: 'Sass/SCSS', level: 75, color: 'bg-pink-500', description: 'CSS preprocessing, modular styles' }
    ],
    systems: [
      { name: 'Windows', level: 90, color: 'bg-blue-600', description: 'Server administration, PowerShell' },
      { name: 'Linux', level: 85, color: 'bg-gray-700', description: 'Command line, server management' },
      { name: 'SSIS', level: 90, color: 'bg-green-600', description: 'Data integration, ETL processes' },
      { name: 'Microsoft Office', level: 85, color: 'bg-blue-500', description: 'Advanced Excel, automation' }
    ]
  }

  const certifications = [
    {
      title: "English Proficiency B2 CEFR Level",
      score: "480",
      year: "2023",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Presenter Certification ICTGov",
      year: "2023",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Presenter Certification ICTISEE",
      year: "2023",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Auditor Certification ICAMIMIA",
      year: "2023",
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const currentSkills = skills[activeCategory as keyof typeof skills] || []

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-4">
            <Code className="w-4 h-4 mr-2" />
            Technical Skills
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Technical 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, tools, and certifications 
            acquired through years of hands-on experience and continuous learning.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Skills Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {currentSkills.map((skill, index) => (
                <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
                    <Badge className="bg-gray-100 text-gray-700">{skill.level}%</Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - Certifications & Summary */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills Summary */}
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl border-0">
              <h3 className="text-xl font-bold mb-6">Skills Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Programming Languages</span>
                  <span className="font-bold">4+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Frameworks & Libraries</span>
                  <span className="font-bold">8+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database Systems</span>
                  <span className="font-bold">4+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Development Tools</span>
                  <span className="font-bold">10+</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-semibold mb-3">Expertise Level</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Expert (90%+)</span>
                    <span>5 skills</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Advanced (80-89%)</span>
                    <span>8 skills</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Intermediate (70-79%)</span>
                    <span>4 skills</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Certifications & Achievements</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{cert.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-600">{cert.year}</span>
                        {cert.score && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Score: {cert.score}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16">
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-gray-600">Technologies Mastered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <div className="text-gray-600">Professional Certifications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">92%</div>
                <div className="text-gray-600">Java Expertise Level</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Skills