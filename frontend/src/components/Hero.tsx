import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Download, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Code, 
  Sparkles,
  ArrowDown
} from 'lucide-react'

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const roles = ['Senior Developer', 'Java Expert', 'Spring Boot Specialist', 'Full Stack Engineer']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Main Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Greeting */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700 mb-4">
                <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                Welcome to my portfolio
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="text-gray-900">Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Darmawan
                </span>
              </h1>
              
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 h-12">
                <span className="inline-block transition-all duration-500 transform">
                  {roles[currentRole]}
                </span>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Passionate about creating robust, scalable applications with <span className="font-semibold text-blue-600">Java</span> and <span className="font-semibold text-purple-600">Spring Boot</span>. 
                Transforming complex problems into elegant solutions with 5+ years of experience.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-600">Years Exp</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">Degrees</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-orange-600">4</div>
                <div className="text-sm text-gray-600">Certificates</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={scrollToContact}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Let's Talk
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-3 text-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="sm" className="p-3 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-3 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-3 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl border-0 p-8 transform hover:scale-105 transition-all duration-300">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffffff;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f0f9ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='90' fill='url(%23grad)'/%3E%3Ccircle cx='100' cy='80' r='25' fill='%233b82f6'/%3E%3Cpath d='M60 140 Q100 120 140 140 Q140 160 100 160 Q60 160 60 140' fill='%233b82f6'/%3E%3C/svg%3E" 
                      alt="M. Darmawan Fadilah" 
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <Badge className="bg-green-500 text-white border-2 border-white shadow-lg animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      Available
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  M. Darmawan Fadilah
                </h2>
                <p className="text-lg font-semibold text-blue-600 mb-2">
                  S.KOM, M.KOM
                </p>
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-4 py-1">
                  <Code className="w-3 h-3 mr-1" />
                  Senior Developer
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4 mr-3 text-blue-500" />
                  <span className="truncate">muhammaddarmawan@gmail.com</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-blue-500" />
                  <span>+62 856 0012 7 856</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-3 text-blue-500" />
                  <span>08 Desember 1997</span>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-blue-500 mt-0.5" />
                  <span>Purwokerto Utara, Banyumas</span>
                </div>
              </div>

              {/* Skills Preview */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'Oracle', 'Git'].map((skill) => (
                    <Badge key={skill} className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-2 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToContact}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </Card>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  )
}

export default Hero