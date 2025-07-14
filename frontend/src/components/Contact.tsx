import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  User, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink
} from 'lucide-react'
import { config, apiEndpoints } from '../config/config'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  contactMethod: string
  phoneNumber: string
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'whatsapp',
    phoneNumber: ''
  })
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // API Configuration from config
  const API_BASE_URL = config.apiBaseUrl

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'muhammaddarmawanfadillah@gmail.com',
      href: 'mailto:muhammaddarmawanfadillah@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: `+${config.whatsapp.number}`,
      href: `tel:+${config.whatsapp.number.replace(/\s/g, '')}`,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'WhatsApp',
      value: `+${config.whatsapp.number}`,
      href: config.whatsapp.url,
      color: 'from-green-600 to-green-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Banjarnegara, Central Java, Indonesia',
      href: config.maps.url,
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactMethodChange = (method: 'whatsapp' | 'email') => {
    setContactMethod(method)
    setFormData(prev => ({ ...prev, contactMethod: method }))
  }

  const submitContactForm = async (formData: ContactForm) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Contact form submitted successfully:', result)
        return { success: true, data: result }
      } else {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        console.error('Failed to submit contact form:', errorData)
        return { success: false, error: errorData.message || response.statusText }
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  const openWhatsAppChat = () => {
    const message = encodeURIComponent(
      `Hi Muhammad Darmawan Fadillah! 👋\n\n` +
      `I'm interested in discussing a potential project or collaboration. ` +
      `Could we schedule a time to chat?\n\n` +
      `Best regards!`
    )
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `${config.whatsapp.url}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.subject || !formData.message) {
      setSubmitStatus('error')
      setStatusMessage('Please fill in all required fields')
      return
    }

    // Contact method specific validation
    if (contactMethod === 'whatsapp') {
      if (!formData.phoneNumber) {
        setSubmitStatus('error')
        setStatusMessage('Phone number is required for WhatsApp contact')
        return
      }
    } else if (contactMethod === 'email') {
      if (!formData.email) {
        setSubmitStatus('error')
        setStatusMessage('Email address is required for email contact')
        return
      }
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (contactMethod === 'whatsapp') {
        // Send via WhatsApp
        const result = await submitContactForm(formData)
        
        if (result.success) {
          setSubmitStatus('success')
          setStatusMessage('Message sent via WhatsApp successfully! I will get back to you soon.')
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            contactMethod: 'whatsapp',
            phoneNumber: ''
          })
        } else {
          setSubmitStatus('error')
          setStatusMessage(result.error || 'Failed to send WhatsApp message. Please try again or contact me directly.')
        }
      } else {
        // Send via Email (backend API)
        const result = await submitContactForm(formData)
        
        if (result.success) {
          setSubmitStatus('success')
          setStatusMessage('Message sent via Email successfully! I will get back to you soon.')
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            contactMethod: 'whatsapp',
            phoneNumber: ''
          })
        } else {
          setSubmitStatus('error')
          setStatusMessage(result.error || 'Failed to send email. Please try again or contact me directly.')
        }
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(`Failed to send message via ${contactMethod}. Please try again or contact me directly.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium mb-6 shadow-lg">
            <Mail className="w-4 h-4 mr-2 text-blue-400" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Let's Work{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities?{' '}
            <span className="text-white font-medium">Let's create something amazing together.</span>{' '}
            I'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  {contactMethod === 'email' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+62 812 3456 7890"
                        required
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                {/* Contact Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Send className="w-4 h-4 inline mr-2" />
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="whatsapp"
                        checked={contactMethod === 'whatsapp'}
                        onChange={(e) => handleContactMethodChange(e.target.value as 'whatsapp' | 'email')}
                        className="w-4 h-4 text-green-600 bg-white/10 border-white/20 focus:ring-green-500 focus:ring-2"
                      />
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white font-medium">WhatsApp</span>
                        <Badge className="bg-green-600/20 text-green-300 text-xs">Faster</Badge>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={contactMethod === 'email'}
                        onChange={(e) => handleContactMethodChange(e.target.value as 'whatsapp' | 'email')}
                        className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">Email</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell me about your project or inquiry..."
                    required
                  />
                </div>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <div className={`flex items-center space-x-2 p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                      : 'bg-red-500/20 border border-red-500/30 text-red-300'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl ${
                    contactMethod === 'whatsapp' 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending via {contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}...
                    </>
                  ) : (
                    <>
                      {contactMethod === 'whatsapp' ? (
                        <MessageCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <Mail className="w-5 h-5 mr-2" />
                      )}
                      Send via {contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Details */}
            <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                    {info.href.startsWith('http') && (
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    )}
                  </a>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Quick Connect</h3>
              <div className="space-y-3">
                <Button
                  onClick={openWhatsAppChat}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 py-3 transition-all duration-300 hover:scale-105"
                >
                  <a href={`mailto:${config.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 py-3 transition-all duration-300 hover:scale-105"
                >
                  <a href={`tel:+${config.whatsapp.number.replace(/\s/g, '')}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Direct Call
                  </a>
                </Button>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-slate-700 shadow-2xl border-0">
              <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 font-medium">WhatsApp</span>
                  <Badge className="bg-white/20 text-white font-semibold">&lt; 1 hour</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 font-medium">Email</span>
                  <Badge className="bg-white/20 text-white font-semibold">&lt; 24 hours</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 font-medium">Phone Call</span>
                  <Badge className="bg-white/20 text-white font-semibold">Immediate</Badge>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-blue-100 text-sm leading-relaxed">
                  <span className="font-medium">Available:</span> Monday to Friday, 9 AM - 6 PM (GMT+7)<br/>
                  <span className="font-medium">Emergency:</span> WhatsApp 24/7
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact