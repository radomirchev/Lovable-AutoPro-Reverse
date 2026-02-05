import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, MapPin, Fuel, Gauge, Calendar, ArrowUpDown } from 'lucide-react';
import { usedCars, filterOptions, UsedCar } from '@/data/cars';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
type SortOption = 'priceAsc' | 'priceDesc' | 'yearDesc' | 'mileageAsc';
const UsedCars = () => {
  const { t } = useTranslation();
  const { isAuthenticated, addFilter } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('yearDesc');
  const [filters, setFilters] = useState({
    make: '',
    bodyType: '',
    fuel: '',
    transmission: '',
    drivetrain: '',
    location: '',
    minPrice: filterOptions.priceRange.min,
    maxPrice: filterOptions.priceRange.max,
    minYear: filterOptions.yearRange.min,
    maxYear: filterOptions.yearRange.max,
    maxMileage: filterOptions.mileageRange.max,
  });
  const filteredAndSortedCars = useMemo(() => {
    let result = usedCars.filter(car => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!car.make.toLowerCase().includes(query) && 
            !car.model.toLowerCase().includes(query)) {
          return false;
        }
      }
      // Apply filters
      if (filters.make && car.make !== filters.make) return false;
      if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.drivetrain && car.drivetrain !== filters.drivetrain) return false;
      if (filters.location && car.location !== filters.location) return false;
      if (car.price < filters.minPrice || car.price > filters.maxPrice) return false;
      if (car.year < filters.minYear || car.year > filters.maxYear) return false;
      if (car.mileage > filters.maxMileage) return false;
      return true;
    });
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc': return a.price - b.price;
        case 'priceDesc': return b.price - a.price;
        case 'yearDesc': return b.year - a.year;
        case 'mileageAsc': return a.mileage - b.mileage;
        default: return 0;
      }
    });
    return result;
  }, [searchQuery, filters, sortBy]);
  const clearFilters = () => {
    setFilters({
      make: '',
      bodyType: '',
      fuel: '',
      transmission: '',
      drivetrain: '',
      location: '',
      minPrice: filterOptions.priceRange.min,
      maxPrice: filterOptions.priceRange.max,
      minYear: filterOptions.yearRange.min,
      maxYear: filterOptions.yearRange.max,
      maxMileage: filterOptions.mileageRange.max,
    });
    setSearchQuery('');
  };
  const saveCurrentFilter = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save filters');
      return;
    }
    addFilter({
      name: `Search - ${new Date().toLocaleDateString()}`,
      filters: { ...filters, searchQuery, sortBy },
    });
    toast.success('Search saved successfully!');
  };
  const hasActiveFilters = filters.make || filters.bodyType || filters.fuel || 
    filters.transmission || filters.drivetrain || filters.location ||
    filters.minPrice !== filterOptions.priceRange.min ||
    filters.maxPrice !== filterOptions.priceRange.max;
  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t('usedCars.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('usedCars.subtitle')}
          </p>
        </div>
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 input-dark rounded-lg"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
              hasActiveFilters ? 'border-primary text-primary' : ''
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {t('usedCars.filters.title')}
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none w-full md:w-48 px-4 py-3 input-dark rounded-lg pr-10"
            >
              <option value="yearDesc">{t('usedCars.sort.yearDesc')}</option>
              <option value="priceAsc">{t('usedCars.sort.priceAsc')}</option>
              <option value="priceDesc">{t('usedCars.sort.priceDesc')}</option>
              <option value="mileageAsc">{t('usedCars.sort.mileageAsc')}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card-metallic p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold">{t('usedCars.filters.title')}</h3>
              <div className="flex gap-4">
                <button
                  onClick={saveCurrentFilter}
                  className="text-sm text-primary hover:underline"
                >
                  Save Search
                </button>
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('usedCars.filters.clearAll')}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Make */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.make')}
                </label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters(f => ({ ...f, make: e.target.value }))}
                  className="w-full px-3 py-2 input-dark rounded-lg text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              {/* Body Type */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.bodyType')}
                </label>
                <select
                  value={filters.bodyType}
                  onChange={(e) => setFilters(f => ({ ...f, bodyType: e.target.value }))}
                  className="w-full px-3 py-2 input-dark rounded-lg text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.bodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              {/* Fuel */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.fuel')}
                </label>
                <select
                  value={filters.fuel}
                  onChange={(e) => setFilters(f => ({ ...f, fuel: e.target.value }))}
                  className="w-full px-3 py-2 input-dark rounded-lg text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.fuelTypes.map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>
              {/* Transmission */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.transmission')}
                </label>
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilters(f => ({ ...f, transmission: e.target.value }))}
                  className="w-full px-3 py-2 input-dark rounded-lg text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.transmissions.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>
              {/* Drivetrain */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.drivetrain')}
                </label>
                <select
                  value={filters.drivetrain}
                  onChange={(e) => setFilters(f => ({ ...f, drivetrain: e.target.value }))}
                  className="w-full px-3 py-2 input-dark rounded-lg text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.drivetrains.map(dt => (
                    <option key={dt} value={dt}>{dt}</option>
                  ))}
                </select>
              </div>
              {/* Location */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.location')}
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                  className="w-full px-3 py-2 input-dark rounded-lg text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Price Range */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.price')}: €{filters.minPrice.toLocaleString()} - €{filters.maxPrice.toLocaleString()}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    step={1000}
                    value={filters.minPrice}
                    onChange={(e) => setFilters(f => ({ ...f, minPrice: parseInt(e.target.value) }))}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    step={1000}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(f => ({ ...f, maxPrice: parseInt(e.target.value) }))}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('usedCars.filters.mileage')}: up to {filters.maxMileage.toLocaleString()} km
                </label>
                <input
                  type="range"
                  min={0}
                  max={filterOptions.mileageRange.max}
                  step={5000}
                  value={filters.maxMileage}
                  onChange={(e) => setFilters(f => ({ ...f, maxMileage: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          {t('usedCars.results', { count: filteredAndSortedCars.length })}
        </p>
        {/* Car Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        {filteredAndSortedCars.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No vehicles match your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 btn-primary px-6 py-2 rounded-lg text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const CarCard = ({ car }: { car: UsedCar }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-metallic overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {car.year}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold mb-1">
          {car.make} {car.model}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{car.color}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="w-4 h-4" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4" />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowUpDown className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{car.location}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {car.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
              {feature}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="font-display text-2xl font-bold text-primary">
            €{car.price.toLocaleString()}
          </span>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium">
            {t('usedCars.viewDetails')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default UsedCars;
src/test/example.test.ts
import { describe, it, expect } from "vitest";
describe("example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});