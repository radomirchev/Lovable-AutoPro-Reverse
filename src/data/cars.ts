export interface CarModel {
  id: string;
  name: string;
  category: 'suv' | 'sedan' | 'combi';
  basePrice: number;
  image: string;
  description: string;
}
export interface Trim {
  id: string;
  name: string;
  price: number;
  features: string[];
}
export interface Powertrain {
  id: string;
  name: string;
  type: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  power: string;
  price: number;
  fuelConsumption: string;
}
export interface ExteriorPackage {
  id: string;
  name: string;
  color: string;
  colorCode: string;
  price: number;
  wheelSize: string;
}
export interface Accessory {
  id: string;
  name: string;
  price: number;
  category: string;
}
export interface UsedCar {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuel: string;
  transmission: string;
  drivetrain: string;
  bodyType: string;
  location: string;
  image: string;
  features: string[];
  color: string;
}
// New Car Models
export const carModels: CarModel[] = [
  {
    id: 'apex-suv',
    name: 'APEX SUV',
    category: 'suv',
    basePrice: 54990,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    description: 'Commanding presence meets refined luxury in our flagship SUV.',
  },
  {
    id: 'velocity-sedan',
    name: 'VELOCITY Sedan',
    category: 'sedan',
    basePrice: 42990,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    description: 'The perfect fusion of elegance and performance.',
  },
  {
    id: 'touring-combi',
    name: 'TOURING Combi',
    category: 'combi',
    basePrice: 47990,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    description: 'Versatility redefined with premium comfort and space.',
  },
];
export const trims: Trim[] = [
  {
    id: 'comfort',
    name: 'Comfort',
    price: 0,
    features: ['17" Alloy Wheels', 'Cloth Seats', 'Manual Climate Control', '8" Touchscreen'],
  },
  {
    id: 'elegance',
    name: 'Elegance',
    price: 4500,
    features: ['18" Alloy Wheels', 'Leather Seats', 'Dual-Zone Climate', '10" Touchscreen', 'LED Headlights'],
  },
  {
    id: 'sport',
    name: 'Sport',
    price: 7500,
    features: ['19" Sport Wheels', 'Sport Seats', 'Sport Suspension', 'Panoramic Roof', 'Premium Sound'],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    price: 12000,
    features: ['20" Premium Wheels', 'Nappa Leather', 'Massage Seats', 'Head-Up Display', 'Matrix LED', 'Air Suspension'],
  },
];
export const powertrains: Powertrain[] = [
  {
    id: 'petrol-150',
    name: '1.5T Petrol',
    type: 'petrol',
    power: '150 HP',
    price: 0,
    fuelConsumption: '6.8 L/100km',
  },
  {
    id: 'petrol-200',
    name: '2.0T Petrol',
    type: 'petrol',
    power: '200 HP',
    price: 3500,
    fuelConsumption: '7.5 L/100km',
  },
  {
    id: 'diesel-180',
    name: '2.0 Diesel',
    type: 'diesel',
    power: '180 HP',
    price: 2500,
    fuelConsumption: '5.2 L/100km',
  },
  {
    id: 'hybrid-250',
    name: 'Hybrid',
    type: 'hybrid',
    power: '250 HP',
    price: 6000,
    fuelConsumption: '4.1 L/100km',
  },
  {
    id: 'electric-300',
    name: 'Full Electric',
    type: 'electric',
    power: '300 HP',
    price: 12000,
    fuelConsumption: '18 kWh/100km',
  },
];
export const exteriorPackages: ExteriorPackage[] = [
  { id: 'arctic-white', name: 'Arctic White', color: '#F5F5F5', colorCode: 'AW', price: 0, wheelSize: 'Standard' },
  { id: 'obsidian-black', name: 'Obsidian Black', color: '#1A1A1A', colorCode: 'OB', price: 850, wheelSize: 'Standard' },
  { id: 'meteor-grey', name: 'Meteor Grey', color: '#4A4A4A', colorCode: 'MG', price: 650, wheelSize: 'Standard' },
  { id: 'racing-red', name: 'Racing Red', color: '#E53935', colorCode: 'RR', price: 1200, wheelSize: 'Sport' },
  { id: 'ocean-blue', name: 'Ocean Blue', color: '#1565C0', colorCode: 'OBL', price: 950, wheelSize: 'Standard' },
  { id: 'sunset-orange', name: 'Sunset Orange', color: '#FF6D00', colorCode: 'SO', price: 1400, wheelSize: 'Sport' },
];
export const accessories: Accessory[] = [
  { id: 'tow-bar', name: 'Tow Bar Package', price: 890, category: 'Exterior' },
  { id: 'roof-rails', name: 'Roof Rails', price: 450, category: 'Exterior' },
  { id: 'winter-pack', name: 'Winter Package', price: 1200, category: 'Comfort' },
  { id: 'parking-sensors', name: 'Parking Sensors', price: 650, category: 'Safety' },
  { id: 'dash-cam', name: 'Integrated Dash Cam', price: 390, category: 'Safety' },
  { id: 'wireless-charging', name: 'Wireless Phone Charger', price: 280, category: 'Technology' },
  { id: 'premium-mats', name: 'Premium Floor Mats', price: 220, category: 'Interior' },
  { id: 'cargo-net', name: 'Cargo Net System', price: 120, category: 'Interior' },
];
// Used Cars Inventory
export const usedCars: UsedCar[] = [
  {
    id: 'uc-001',
    make: 'BMW',
    model: 'X5 xDrive40i',
    year: 2022,
    mileage: 28500,
    price: 62900,
    fuel: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    bodyType: 'SUV',
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600',
    features: ['Panoramic Roof', 'Leather Interior', 'Navigation', 'Harman Kardon Sound'],
    color: 'Alpine White',
  },
  {
    id: 'uc-002',
    make: 'Mercedes-Benz',
    model: 'E 300 AMG Line',
    year: 2021,
    mileage: 42000,
    price: 48500,
    fuel: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    bodyType: 'Sedan',
    location: 'Munich',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600',
    features: ['AMG Styling', 'MBUX', 'LED Matrix Lights', 'Ambient Lighting'],
    color: 'Obsidian Black',
  },
  {
    id: 'uc-003',
    make: 'Audi',
    model: 'A6 Avant 45 TFSI',
    year: 2023,
    mileage: 15200,
    price: 55900,
    fuel: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'Quattro',
    bodyType: 'Combi',
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600',
    features: ['Virtual Cockpit', 'Bang & Olufsen', 'Matrix LED', 'Adaptive Cruise'],
    color: 'Glacier White',
  },
  {
    id: 'uc-004',
    make: 'Volkswagen',
    model: 'Tiguan R-Line',
    year: 2022,
    mileage: 35800,
    price: 38900,
    fuel: 'Diesel',
    transmission: 'Automatic',
    drivetrain: '4Motion',
    bodyType: 'SUV',
    location: 'Hamburg',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600',
    features: ['R-Line Package', 'Digital Cockpit', 'Park Assist', 'Heated Seats'],
    color: 'Deep Black Pearl',
  },
  {
    id: 'uc-005',
    make: 'BMW',
    model: '330i M Sport',
    year: 2021,
    mileage: 52000,
    price: 42500,
    fuel: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    bodyType: 'Sedan',
    location: 'Frankfurt',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600',
    features: ['M Sport Package', 'Live Cockpit Pro', 'HiFi Sound', 'Sport Suspension'],
    color: 'Mineral Grey',
  },
  {
    id: 'uc-006',
    make: 'Mercedes-Benz',
    model: 'GLC 300 4MATIC',
    year: 2023,
    mileage: 18700,
    price: 58900,
    fuel: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    bodyType: 'SUV',
    location: 'Munich',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=600',
    features: ['Burmester Sound', 'MBUX', 'Multibeam LED', 'Air Suspension'],
    color: 'Selenite Grey',
  },
  {
    id: 'uc-007',
    make: 'Audi',
    model: 'Q7 55 TFSI',
    year: 2022,
    mileage: 31200,
    price: 72500,
    fuel: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'Quattro',
    bodyType: 'SUV',
    location: 'Stuttgart',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600',
    features: ['S Line', 'Virtual Cockpit Plus', 'Air Suspension', '7 Seats'],
    color: 'Mythos Black',
  },
  {
    id: 'uc-008',
    make: 'Volkswagen',
    model: 'Passat Variant',
    year: 2021,
    mileage: 65000,
    price: 28900,
    fuel: 'Diesel',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    bodyType: 'Combi',
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600',
    features: ['Business Package', 'Navigation Pro', 'LED Plus', 'Ergo Seats'],
    color: 'Oryx White',
  },
  {
    id: 'uc-009',
    make: 'BMW',
    model: 'iX3 Impressive',
    year: 2023,
    mileage: 12500,
    price: 54900,
    fuel: 'Electric',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    bodyType: 'SUV',
    location: 'Frankfurt',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600',
    features: ['Connected Package', 'Driving Assistant Pro', 'Curved Display', 'Heat Pump'],
    color: 'Mineral White',
  },
  {
    id: 'uc-010',
    make: 'Mercedes-Benz',
    model: 'C 200 Estate',
    year: 2022,
    mileage: 38500,
    price: 44900,
    fuel: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    bodyType: 'Combi',
    location: 'Hamburg',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600',
    features: ['Avantgarde Line', 'MBUX', 'Digital Light', 'Easy Pack Tailgate'],
    color: 'Polar White',
  },
  {
    id: 'uc-011',
    make: 'Audi',
    model: 'A4 40 TDI',
    year: 2021,
    mileage: 55000,
    price: 34500,
    fuel: 'Diesel',
    transmission: 'Automatic',
    drivetrain: 'Quattro',
    bodyType: 'Sedan',
    location: 'Stuttgart',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600',
    features: ['Sport Line', 'MMI Plus', 'LED Headlights', 'Park Assist'],
    color: 'Navarra Blue',
  },
  {
    id: 'uc-012',
    make: 'Volkswagen',
    model: 'ID.4 Pro Performance',
    year: 2023,
    mileage: 8500,
    price: 42900,
    fuel: 'Electric',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    bodyType: 'SUV',
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600',
    features: ['ID.Light', 'Travel Assist', 'AR Head-Up Display', 'Heat Pump'],
    color: 'Moonstone Grey',
  },
];
// Filter options for used cars
export const filterOptions = {
  makes: ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen'],
  fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
  transmissions: ['Automatic', 'Manual'],
  drivetrains: ['FWD', 'RWD', 'AWD', '4Motion', 'Quattro'],
  bodyTypes: ['SUV', 'Sedan', 'Combi'],
  locations: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Stuttgart'],
  yearRange: { min: 2019, max: 2024 },
  priceRange: { min: 20000, max: 100000 },
  mileageRange: { min: 0, max: 100000 },
};