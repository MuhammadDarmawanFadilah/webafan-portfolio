import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter,
  Heart,
  ArrowUp,
  ExternalLink
} from 'lucide-react'
import { config } from '../config/config'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      href: config.social.github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      href: config.social.linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      href: config.social.instagram,
      color: 'hover:text-pink-400'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      href: config.social.twitter,
      color: 'hover:text-blue-400'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'Full-Stack Development',
    'Java Enterprise Applications',
    'Database Design & Optimization',
    'System Integration',
    'Technical Consulting',
    'Code Review & Mentoring'
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* About Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
                M. Darmawan Fadilah S.Kom, M.Kom
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Senior Developer with 5+ years of experience in Java enterprise applications, 
                database systems, and full-stack development. Passionate about creating 
                efficient and scalable solutions.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3 text-gray-300">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">muhammaddarmawanfadillah@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+62 85600121760</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3 text-gray-300">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm leading-relaxed">Griya Satria Indah 02, Blok Mataram No. 19, Purwokerto Utara, Banyumas, Jawa Tengah.</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm sm:text-base"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-6">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 text-xs sm:text-sm flex items-start">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-6">Stay Connected</h4>
            <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6">
              Follow me on social media for updates on my latest projects and tech insights.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2 sm:space-x-4 mb-4 sm:mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                  title={social.name}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>

            {/* CTA */}
            <Card className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-purple-600 border-0">
              <h5 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Ready to work together?</h5>
              <p className="text-xs sm:text-sm text-blue-100 mb-2 sm:mb-3">
                Let's discuss your next project
              </p>
              <Button
                asChild
                size="sm"
                className="w-full bg-white text-blue-600 hover:bg-gray-100 text-xs sm:text-sm py-1.5 sm:py-2"
              >
                <a href="#contact">
                  Get In Touch
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 sm:ml-2" />
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} M. Darmawan Fadilah. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-0.5 sm:mt-1">
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <span className="text-gray-400 text-xs order-2 sm:order-1">
                Made with ❤️ in Indonesia
              </span>
              
              {/* Back to Top Button */}
              <Button
                onClick={scrollToTop}
                size="sm"
                variant="outline"
                className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 order-1 sm:order-2"
              >
                <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Top</span>
                <span className="xs:hidden">Top</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
    </footer>
  )
}

export default Footer