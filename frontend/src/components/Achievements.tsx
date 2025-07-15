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
  const [itemsPerSlide, setItemsPerSlide] = useState(3) // Show 3 achievements per slide on desktop, 1 on mobile

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setItemsPerSlide(1) // 1 item per slide on mobile
      } else if (window.innerWidth < 1024) { // lg breakpoint
        setItemsPerSlide(2) // 2 items per slide on tablet
      } else {
        setItemsPerSlide(3) // 3 items per slide on desktop
      }
    }

    updateItemsPerSlide()
    window.addEventListener('resize', updateItemsPerSlide)
    return () => window.removeEventListener('resize', updateItemsPerSlide)
  }, [])

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
    <section id="achievements" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Achievements & Certifications</h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
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
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg w-8 h-8 sm:w-10 sm:h-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg w-8 h-8 sm:w-10 sm:h-10"
                onClick={nextSlide}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </>
          )}

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {getCurrentSlideAchievements().map((achievement) => (
              <Card 
                key={achievement.id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-4 sm:p-6">
                  {/* Header with Icon and Featured Badge */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`p-2 sm:p-3 rounded-lg ${getAchievementTypeColor(achievement.achievementType)}`}>
                        <div className="w-4 h-4 sm:w-6 sm:h-6">
                          {getAchievementIcon(achievement.achievementType)}
                        </div>
                      </div>
                      {achievement.isFeatured && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium text-yellow-600">Featured</span>
                        </div>
                      )}
                    </div>
                    {achievement.credentialUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1 sm:p-2"
                        onClick={() => window.open(achievement.credentialUrl, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Achievement Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {achievement.title}
                  </h3>

                  {/* Issuing Organization */}
                  <p className="text-emerald-600 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    {achievement.issuingOrganization}
                  </p>

                  {/* Description */}
                  {achievement.description && (
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                      {achievement.description}
                    </p>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <Badge 
                      variant="outline" 
                      className={`${getAchievementTypeColor(achievement.achievementType)} text-xs`}
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
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Issued: {formatDate(achievement.issueDate)}</span>
                    </div>
                    {achievement.expiryDate && (
                      <div className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${
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
            <div className="flex justify-center space-x-1.5 sm:space-x-2 mt-4 sm:mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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