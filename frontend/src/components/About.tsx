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

const About = () => {
  const values = [
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

  const expertise = [
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

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-4">
            <User className="w-4 h-4 mr-2" />
            About Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Passionate Developer with a 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Vision</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With over 5 years of experience in software development, I specialize in creating robust, 
            scalable applications that solve real-world problems and deliver exceptional user experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Story & Values */}
          <div className="space-y-8">
            {/* My Story */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  My passion for technology began during my computer science studies at Jenderal Soedirman University. 
                  What started as curiosity about how software works evolved into a deep commitment to crafting 
                  exceptional digital solutions.
                </p>
                <p>
                  After completing my Bachelor's degree with a GPA of 3.65, I pursued a Master's in Computer Science 
                  at Sepuluh Nopember Institute of Technology, achieving a 3.81 GPA. This academic foundation, 
                  combined with hands-on experience, has shaped my approach to problem-solving.
                </p>
                <p>
                  <strong>"Tracing, logs and debugging programs have become parts of my daily tasks. 
                  Effective communication and the use of AI are crucial in task completion. 
                  Continuous learning, responsibility, and hard work are essential to achieving my vision and mission."</strong>
                </p>
              </div>
            </Card>

            {/* Core Values */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Drives Me</h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Expertise & Skills */}
          <div className="space-y-8">
            {/* Expertise Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {expertise.map((area, index) => (
                <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-16 h-16 ${area.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto`}>
                    {area.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">{area.title}</h4>
                  <p className="text-gray-600 text-sm text-center">{area.description}</p>
                </Card>
              ))}
            </div>

            {/* Key Skills */}
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-0">
              <h3 className="text-2xl font-bold mb-6">Technical Expertise</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Programming Languages</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Java</span>
                      <span className="text-blue-200">92%</span>
                    </div>
                    <div className="w-full bg-blue-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between items-center">
                      <span>JavaScript</span>
                      <span className="text-blue-200">85%</span>
                    </div>
                    <div className="w-full bg-blue-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Spring Boot', 'Oracle', 'SQL Server', 'Git', 'Jenkins', 'Angular'].map((skill) => (
                      <Badge key={skill} className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6">
                <h4 className="font-semibold mb-3">Professional Highlights</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-blue-200 text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-blue-200 text-sm">Projects Completed</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About