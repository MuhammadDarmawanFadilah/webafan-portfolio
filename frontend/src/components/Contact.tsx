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

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Wablas API Configuration
  const WABLAS_CONFIG = {
    url: 'https://tegal.wablas.com',
    token: 'oHDDXxRgr1XghtF9507vuf79HXFG22ReSBror2QgX2buGFKYNpfCBgY.v6ylljnX',
    sender: '6285157661640'
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'muh.darmawan.fadilah@gmail.com',
      href: 'mailto:muh.darmawan.fadilah@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+62 896 0812 1760',
      href: 'tel:+6289608121760',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'WhatsApp',
      value: '+62 896 0812 1760',
      href: 'https://wa.me/6289608121760',
      color: 'from-green-600 to-green-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Banjarnegara, Central Java, Indonesia',
      href: 'https://maps.google.com/?q=Banjarnegara,Central+Java,Indonesia',
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const sendWhatsAppMessage = async (formData: ContactForm) => {
    try {
      const message = `🔔 *New Contact Form Submission*\n\n` +
                    `👤 *Name:* ${formData.name}\n` +
                    `📧 *Email:* ${formData.email}\n` +
                    `📋 *Subject:* ${formData.subject}\n\n` +
                    `💬 *Message:*\n${formData.message}\n\n` +
                    `⏰ *Sent at:* ${new Date().toLocaleString('id-ID')}`

      const response = await fetch(`${WABLAS_CONFIG.url}/api/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WABLAS_CONFIG.token}`
        },
        body: JSON.stringify({
          phone: WABLAS_CONFIG.sender,
          message: message,
          isGroup: false
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send WhatsApp message')
      }

      return await response.json()
    } catch (error) {
      console.error('WhatsApp API Error:', error)
      throw error
    }
  }

  const sendEmail = async (formData: ContactForm) => {
    // For demo purposes, we'll simulate email sending
    // In a real application, you would integrate with an email service like EmailJS, Nodemailer, etc.
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email would be sent:', {
          to: 'muh.darmawan.fadilah@gmail.com',
          from: formData.email,
          subject: `Contact Form: ${formData.subject}`,
          body: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
        })
        resolve({ success: true })
      }, 1000)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error')
      setStatusMessage('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Send both WhatsApp and Email
      await Promise.all([
        sendWhatsAppMessage(formData),
        sendEmail(formData)
      ])

      setSubmitStatus('success')
      setStatusMessage('Message sent successfully! I will get back to you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-4">
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Work 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? 
            I'd love to hear from you. Send me a message and I'll respond as soon as possible.
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
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
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
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a href="https://wa.me/6289608121760" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Me
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <a href="mailto:muh.darmawan.fadilah@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <a href="tel:+6289608121760">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Me
                  </a>
                </Button>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl border-0">
              <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">WhatsApp</span>
                  <Badge className="bg-white/20 text-white">&lt; 1 hour</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Email</span>
                  <Badge className="bg-white/20 text-white">&lt; 24 hours</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Phone Call</span>
                  <Badge className="bg-white/20 text-white">Immediate</Badge>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-blue-100 text-sm">
                  I'm usually available Monday to Friday, 9 AM - 6 PM (GMT+7)
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