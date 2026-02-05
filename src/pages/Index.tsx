import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Wrench, Shield, CreditCard, ArrowRight, Star, Award, Users } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import { carModels } from '@/data/cars';
const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroCarousel />
      {/* Featured Models Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {t('featured.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our lineup of premium vehicles designed for every lifestyle
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {carModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="card-metallic overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase">
                    {model.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{model.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{model.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-primary">
                      From €{model.basePrice.toLocaleString()}
                    </span>
                    <Link
                      to="/configurator"
                      className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 group/link"
                    >
                      Configure
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/configurator"
              className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-2"
            >
              {t('hero.configureCTA')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Choose AutoPro
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience automotive excellence with our commitment to quality and service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Every vehicle undergoes rigorous inspection and certification',
              },
              {
                icon: Shield,
                title: 'Warranty Included',
                description: 'Comprehensive warranty coverage for your peace of mind',
              },
              {
                icon: CreditCard,
                title: 'Flexible Financing',
                description: 'Tailored financing solutions to fit your budget',
              },
              {
                icon: Wrench,
                title: 'Expert Service',
                description: 'Factory-trained technicians and genuine parts',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="card-metallic p-6 text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '50k+', label: 'Vehicles Sold' },
              { value: '98%', label: 'Customer Satisfaction' },
              { value: '5', label: 'Locations' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Vehicle?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Browse our extensive collection of premium new and pre-owned vehicles. 
              Our team of experts is ready to help you find the perfect match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/used-cars"
                className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center gap-2"
              >
                {t('hero.exploreCTA')}
                <Car className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center gap-2"
              >
                Create Account
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Thomas Müller',
                role: 'BMW X5 Owner',
                quote: 'Exceptional service from start to finish. The team at AutoPro made buying my new car a pleasure.',
              },
              {
                name: 'Anna Schmidt',
                role: 'Mercedes E-Class Owner',
                quote: 'The configurator made it so easy to customize my dream car. Highly recommend!',
              },
              {
                name: 'Michael Weber',
                role: 'Audi Q7 Owner',
                quote: 'Great selection of quality pre-owned vehicles. Found exactly what I was looking for.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="card-metallic p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Index;