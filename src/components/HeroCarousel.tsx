import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { carModels } from '@/data/cars';
const HeroCarousel = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      ...carModels.find(c => c.category === 'suv')!,
      tagline: t('featured.suv'),
      bgGradient: 'from-red-900/20 via-background to-background',
    },
    {
      ...carModels.find(c => c.category === 'sedan')!,
      tagline: t('featured.sedan'),
      bgGradient: 'from-blue-900/20 via-background to-background',
    },
    {
      ...carModels.find(c => c.category === 'combi')!,
      tagline: t('featured.combi'),
      bgGradient: 'from-purple-900/20 via-background to-background',
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden hero-gradient">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>
              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center pt-20">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="max-w-3xl"
                >
                  <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                    {slide.tagline}
                  </span>
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
                    {t('hero.title')}
                  </h1>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-metallic mb-6">
                    {slide.name}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/used-cars"
                      className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center gap-2"
                    >
                      {t('hero.exploreCTA')}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/configurator"
                      className="btn-outline px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center"
                    >
                      {t('hero.configureCTA')}
                    </Link>
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <span className="text-3xl font-display font-bold text-primary">
                      €{slide.basePrice.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">Starting Price</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-card/80 hover:bg-card border border-border rounded-full flex items-center justify-center transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-card/80 hover:bg-card border border-border rounded-full flex items-center justify-center transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
export default HeroCarousel;