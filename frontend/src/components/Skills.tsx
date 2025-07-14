import { useState, useEffect } from 'react'
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
import { skillService, type Skill } from '@/services/skillService'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Programming Languages')
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [skillsData, categoriesData] = await Promise.all([
        skillService.getAllSkills(),
        skillService.getSkillCategories()
      ])
      setSkills(skillsData)
      setCategories(categoriesData)
      if (categoriesData.length > 0) {
        setActiveCategory(categoriesData[0])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </section>
    )
  }

  const currentSkills = skills.filter(skill => skill.skillCategory === activeCategory)
  const skillsCounts = categories.reduce((acc, category) => {
      acc[category] = skills.filter(skill => skill.skillCategory === category).length
      return acc
    }, {} as Record<string, number>)

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'Programming Languages': <Code className="w-4 h-4" />,
      'Databases': <Database className="w-4 h-4" />,
      'Frameworks': <Server className="w-4 h-4" />,
      'Version Control & DevOps': <Wrench className="w-4 h-4" />,
      'Frontend Technologies': <Globe className="w-4 h-4" />,
      'Systems': <Monitor className="w-4 h-4" />
    }
    return iconMap[category] || <Code className="w-4 h-4" />
  }

  const getSkillColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Programming Languages': 'bg-blue-500',
      'Databases': 'bg-green-500',
      'Frameworks': 'bg-purple-500',
      'Version Control & DevOps': 'bg-orange-500',
      'Frontend Technologies': 'bg-cyan-500',
      'Systems': 'bg-gray-500'
    }
    return colors[category] || 'bg-blue-500'
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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
            >
              {getCategoryIcon(category)}
              <span className="font-medium">{category}</span>
              <Badge variant="secondary" className="ml-2 bg-white/20 text-current">
                {skillsCounts[category] || 0}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Skills Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {currentSkills.map((skill, index) => (
                <Card key={skill.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {skill.skillName}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{skill.proficiencyLevel}%</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{skill.description || 'Professional expertise'}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Proficiency</span>
                        <span className="font-medium text-gray-700">{skill.proficiencyLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${getSkillColor(skill.skillCategory)} rounded-full transition-all duration-1000 ease-out transform origin-left`}
                          style={{ width: `${skill.proficiencyLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>
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
                  <span className="font-bold">{skillsCounts['Programming Languages'] || 0}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Frameworks & Libraries</span>
                  <span className="font-bold">{skillsCounts['Frameworks'] || 0}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database Systems</span>
                  <span className="font-bold">{skillsCounts['Databases'] || 0}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Development Tools</span>
                  <span className="font-bold">{skillsCounts['Version Control & DevOps'] || 0}+</span>
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


      </div>
    </section>
  )
}

export default Skills