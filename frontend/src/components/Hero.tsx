import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Code2, 
  Star,
  ChevronDown,
  ExternalLink,
  Award,
  Briefcase
} from 'lucide-react'
import { profileService, type Profile } from '@/services/profileService'
import { config } from '@/config/config'

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const roles = ['Senior Developer', 'Java Expert', 'Spring Boot Specialist', 'Full Stack Engineer']

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getPublicProfile()
      setProfile(profileData)
      setLoading(false)
      setTimeout(() => setIsVisible(true), 100)
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadCV = () => {
    if (!profile?.cvFileUrl) {
      console.error('No CV file available for download');
      return;
    }

    try {
      // Create a link to download the uploaded CV file
      const link = document.createElement('a');
      // Convert relative URL to absolute URL
      const absoluteUrl = profile.cvFileUrl.startsWith('http') 
        ? profile.cvFileUrl 
        : `${config.backendUrl}${profile.cvFileUrl}`;
      link.href = absoluteUrl;
      link.download = `CV_${profile.fullName.replace(/\s+/g, '_')}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading CV file:', err);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </section>
    )
  }

  if (!profile) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-600">Profile not found</p>
        </div>
      </section>
    )
  }

  const dynamicRoles = profile.roles ? profileService.parseRoles(profile.roles) : roles
  const topSkills = profile.topSkills ? profileService.parseTopSkills(profile.topSkills) : ['Java', 'Spring Boot', 'Oracle', 'Git']

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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left Column - Main Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Greeting */}
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 mb-3 sm:mb-4 shadow-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-600" />
                Professional Portfolio
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-slate-900">Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-600 via-slate-800 to-blue-700 bg-clip-text text-transparent block sm:inline">
                  {profile.fullName || 'M. Darmawan Fadilah'}
                </span>
              </h1>
              
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700 h-12 sm:h-16 flex items-center justify-center lg:justify-start">
                <span className="inline-block transition-all duration-700 ease-in-out transform text-center lg:text-left">
                  {dynamicRoles[currentRole % dynamicRoles.length]}
                </span>
                <span className="ml-2 w-0.5 h-6 sm:h-8 bg-blue-600 animate-pulse"></span>
              </div>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {profile.about || profile.personalStory || 'Experienced software engineer specializing in Java ecosystem and enterprise applications. Passionate about building scalable, maintainable solutions that drive business success.'}
              </p>
            </div>

            {/* Quick Stats - Enhanced */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              <div className="text-center p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1" />
                  <div className="text-lg sm:text-xl font-bold text-blue-600">{profile.yearsExperience || 5}+</div>
                </div>
                <div className="text-xs text-slate-600">Years Experience</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mr-1" />
                  <div className="text-lg sm:text-xl font-bold text-purple-600">{profile.projectsCount || 0}+</div>
                </div>
                <div className="text-xs text-slate-600">Projects</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1" />
                  <div className="text-lg sm:text-xl font-bold text-green-600">{profile.degreesCount || 0}</div>
                </div>
                <div className="text-xs text-slate-600">Degrees</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 mr-1" />
                  <div className="text-lg sm:text-xl font-bold text-orange-600">{profile.certificatesCount || 0}</div>
                </div>
                <div className="text-xs text-slate-600">Certificates</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={scrollToContact}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Let's Talk
                <ChevronDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              
              {profile.cvFileUrl && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-600 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-slate-50 transition-all duration-300 group"
                  onClick={handleDownloadCV}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download CV
                  <ExternalLink className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 sm:p-3 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <Card className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-lg shadow-2xl border-0 p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-all duration-300">
              {/* Profile Image */}
              <div className="relative mb-4 sm:mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl">
                    {profile.profileImageUrl ? (
                      <img 
                        src={profile.profileImageUrl} 
                        alt={profile.fullName}
                        className="w-full h-full rounded-2xl sm:rounded-3xl object-cover"
                      />
                    ) : (
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffffff;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f0f9ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='90' fill='url(%23grad)'/%3E%3Ccircle cx='100' cy='80' r='25' fill='%233b82f6'/%3E%3Cpath d='M60 140 Q100 120 140 140 Q140 160 100 160 Q60 160 60 140' fill='%233b82f6'/%3E%3C/svg%3E" 
                        alt={profile.fullName || 'M. Darmawan Fadilah'} 
                        className="w-full h-full rounded-2xl sm:rounded-3xl object-cover"
                      />
                    )}
                  </div>
                  <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2">
                    <Badge className="bg-green-500 text-white border-2 border-white shadow-lg animate-pulse text-xs">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1 sm:mr-2"></div>
                      Available
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {profile.fullName || 'M. Darmawan Fadilah'}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-blue-600 mb-2">
                  {profile.title || 'S.KOM, M.KOM'}
                </p>
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-3 sm:px-4 py-1 text-xs sm:text-sm">
                  <Code2 className="w-3 h-3 mr-1" />
                  Senior Developer
                </Badge>
              </div>

              {/* Location Info - Simplified */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-500" />
                  <span className="truncate">{profile.currentAddress || profile.address || 'Purwokerto Utara, Banyumas'}</span>
                </div>
              </div>

              {/* Quick Contact */}
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToContact}
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Get In Touch
              </Button>
            </Card>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  )
}

export default Hero