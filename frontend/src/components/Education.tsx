import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Star,
  TrendingUp
} from 'lucide-react'

const Education = () => {
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Sepuluh Nopember Institute of Technology",
      location: "Surabaya, Indonesia",
      period: "2022 - 2024",
      gpa: "3.89 / 4.00",
      status: "Graduated",
      description: "Specialized in advanced software engineering, data structures, and system architecture. Completed thesis on enterprise application optimization.",
      achievements: [
        "Dean's List for Academic Excellence",
        "Research Publication in Software Engineering",
        "Graduate Teaching Assistant"
      ],
      courses: [
        "Advanced Software Engineering",
        "Database Systems",
        "System Architecture",
        "Research Methodology"
      ],
      color: "from-blue-600 to-purple-600"
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "Jenderal Soedirman University",
      location: "Purwokerto, Indonesia",
      period: "2015 - 2019",
      gpa: "3.54 / 4.00",
      status: "Graduated",
      description: "Comprehensive study in computer science fundamentals, programming, and software development. Strong foundation in mathematics and algorithms.",
      achievements: [
        "Cum Laude Graduate",
        "Student Organization Leader",
        "Programming Competition Participant"
      ],
      courses: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Design",
        "Software Engineering"
      ],
      color: "from-green-600 to-blue-600"
    }
  ]

  const additionalEducation = [
    {
      title: "English TOEFL Course at LIA",
      institution: "LIA Language Institute",
      year: "2016",
      type: "Language Certification",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "English Language Course at LIA",
      institution: "LIA Language Institute",
      year: "2017",
      type: "Language Development",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Bootcamp Java Developer",
      institution: "Alterra Academy",
      year: "2019",
      type: "Professional Development",
      icon: <Award className="w-5 h-5" />
    }
  ]

  const skills = [
    { name: "Academic Research", level: 90 },
    { name: "Technical Writing", level: 85 },
    { name: "Problem Solving", level: 95 },
    { name: "Critical Thinking", level: 90 }
  ]

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-medium mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            Educational Background
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Academic 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            My educational foundation in computer science, complemented by continuous learning 
            and professional development programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Education Timeline */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {education.map((edu, index) => (
                <Card key={index} className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-12 h-12 bg-gradient-to-r ${edu.color} rounded-xl flex items-center justify-center text-white`}>
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-purple-600 font-semibold">{edu.institution}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                        <Badge className={`bg-gradient-to-r ${edu.color} text-white`}>
                          {edu.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{edu.gpa}</div>
                      <div className="text-sm text-gray-600">GPA</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">{edu.description}</p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {edu.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                          <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relevant Courses */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <Badge key={idx} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Academic Skills */}
            <Card className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl border-0">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Academic Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional Education */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Education</h3>
              <div className="space-y-4">
                {additionalEducation.map((course, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{course.title}</h4>
                      <p className="text-xs text-gray-600 mb-1">{course.institution}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-100 text-purple-700 text-xs">
                          {course.year}
                        </Badge>
                        <span className="text-xs text-gray-500">{course.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education Stats */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Education Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Degrees Earned</span>
                  <span className="font-bold text-gray-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Years of Study</span>
                  <span className="font-bold text-gray-900">6+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average GPA</span>
                  <span className="font-bold text-gray-900">3.72</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Certifications</span>
                  <span className="font-bold text-gray-900">3</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">Cum Laude</div>
                  <div className="text-sm text-gray-600">Academic Honor</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education