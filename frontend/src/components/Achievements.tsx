import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Award,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star,
  Trophy,
  Medal,
  Calendar
} from 'lucide-react'
import { achievementService, type Achievement } from '@/services/achievementService'

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide] = useState(3) // Show 3 achievements per slide

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const data = await achievementService.getFeaturedAchievements();
        // Sort by issue date (newest first)
        const sortedAchievements = data.sort((a, b) => {
          return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
        });
        setAchievements(sortedAchievements);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const totalSlides = Math.ceil(achievements.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentSlideAchievements = () => {
    const startIndex = currentSlide * itemsPerSlide
    return achievements.slice(startIndex, startIndex + itemsPerSlide)
  }

  const getAchievementIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'certification':
        return <Award className="w-6 h-6" />
      case 'award':
        return <Trophy className="w-6 h-6" />
      case 'course':
        return <Medal className="w-6 h-6" />
      default:
        return <Award className="w-6 h-6" />
    }
  }

  const getAchievementTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'certification':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'award':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'course':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'license':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const isExpired = (expiryDate: string) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  if (loading) {
    return (
      <section id="achievements" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Achievements & Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6"></div>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </section>
    )
  }

  if (achievements.length === 0) {
    return (
      <section id="achievements" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Achievements & Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6"></div>
          </div>
          <div className="text-center text-gray-600">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No achievements available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Achievements & Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional certifications and achievements that demonstrate my commitment to continuous learning and excellence
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentSlideAchievements().map((achievement) => (
              <Card 
                key={achievement.id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Header with Icon and Featured Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${getAchievementTypeColor(achievement.achievementType)}`}>
                        {getAchievementIcon(achievement.achievementType)}
                      </div>
                      {achievement.isFeatured && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium text-yellow-600">Featured</span>
                        </div>
                      )}
                    </div>
                    {achievement.credentialUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(achievement.credentialUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Achievement Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {achievement.title}
                  </h3>

                  {/* Issuing Organization */}
                  <p className="text-emerald-600 font-semibold mb-3">
                    {achievement.issuingOrganization}
                  </p>

                  {/* Description */}
                  {achievement.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {achievement.description}
                    </p>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge 
                      variant="outline" 
                      className={getAchievementTypeColor(achievement.achievementType)}
                    >
                      {achievement.achievementType}
                    </Badge>
                    {achievement.credentialId && (
                      <Badge variant="outline" className="text-xs">
                        ID: {achievement.credentialId}
                      </Badge>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Issued: {formatDate(achievement.issueDate)}</span>
                    </div>
                    {achievement.expiryDate && (
                      <div className={`text-xs px-2 py-1 rounded ${
                        isExpired(achievement.expiryDate) 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {isExpired(achievement.expiryDate) ? 'Expired' : 'Valid'}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-emerald-500 scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Auto-slide effect */}
        {totalSlides > 1 && (
          <div className="mt-8">
            <div className="text-center text-sm text-gray-500">
              Showing {currentSlide * itemsPerSlide + 1}-{Math.min((currentSlide + 1) * itemsPerSlide, achievements.length)} of {achievements.length} achievements
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Achievements