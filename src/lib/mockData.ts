import { Property } from '@/types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Sunny Penthouse with Panoramic City Views',
    description: 'Welcome to this stunning penthouse in the heart of Madrid. Enjoy breathtaking views from your private 40m2 terrace. This bright and spacious home features modern finishes, a fully equipped kitchen, and a cozy living area perfect for entertaining. The building includes a concierge and elevator.',
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: 'Calle Serrano, Madrid',
    city: 'Madrid',
    lat: 40.416775,
    lng: -3.703790,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
    virtual_tour_url: 'https://matterport.com/discover/space/S1xrKbCV898', // Placeholder
    is_verified: true,
    seller_type: 'agency',
    created_at: new Date().toISOString(),
    features: ['Terrace', 'Elevator', 'Air Conditioning', 'concierge', 'fitted_kitchen'],
    type: 'penthouse'
  },
  {
    id: '2',
    title: 'Modern Industrial Loft in Creative Poblenou',
    description: 'Immerse yourself in the vibrant Poblenou neighborhood with this unique industrial-style loft. High ceilings, exposed brick walls, and massive windows flood the space with natural light. Perfect for creatives or professionals looking for an inspiring live/work environment. Smart home features included.',
    price: 420000,
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    address: 'Carrer de Llull, Barcelona',
    city: 'Barcelona',
    lat: 41.385063,
    lng: 2.173404,
    images: [
      'https://images.unsplash.com/photo-1600607687940-477a63bd394c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    is_verified: true,
    seller_type: 'private',
    created_at: new Date().toISOString(),
    features: ['Parking', 'Smart Home', 'Large Windows', 'open_plan'],
    type: 'loft'
  },
  {
    id: '3',
    title: 'Charming Family House with lush Garden',
    description: 'Escape the city noise in this peaceful family home. Featuring a large private garden with a swimming pool, this house offers the perfect blend of indoor and outdoor living. Spacious bedrooms, a modern kitchen, and a double garage make this an ideal choice for growing families.',
    price: 1200, // Monthly rent maybe? Or just cheap? Assuming sale based on others. Let's make it 550k.
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    address: 'Avenida de la Ilustración, Valencia',
    city: 'Valencia',
    lat: 39.469907,
    lng: -0.376288,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-bfad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    is_verified: false,
    seller_type: 'private',
    created_at: new Date().toISOString(),
    features: ['Garden', 'Pool', 'Garage', 'fireplace'],
    type: 'house'
  },
  {
    id: '4',
    title: 'Stylish Apartment in Historic Center',
    description: 'Experience the charm of the old town in this renovated apartment. Original wooden beams meet modern design. Located steps away from cafes, shops, and cultural landmarks. Ideal as a pied-à-terre or investment property.',
    price: 320000,
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    address: 'Calle de la Paz, Seville',
    city: 'Seville',
    lat: 37.389092,
    lng: -5.984459,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    is_verified: true,
    seller_type: 'agency',
    created_at: new Date().toISOString(),
    features: ['Balcony', 'Historic Building', 'Renovated'],
    type: 'apartment'
  },
  {
    id: '5',
    title: 'Luxury Villa with Sea Views',
    description: 'Exclusive villa overlooking the Mediterranean. Features infinity pool, home cinema, gym, and guest house. Privacy and luxury combined in this exceptional property.',
    price: 2500000,
    bedrooms: 6,
    bathrooms: 5,
    area: 500,
    address: 'Avenida del Mar, Marbella',
    city: 'Marbella',
    lat: 36.510074,
    lng: -4.882443,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    is_verified: true,
    seller_type: 'agency',
    created_at: new Date().toISOString(),
    features: ['Sea View', 'Infinity Pool', 'Gym', 'Cinema'],
    type: 'house'
  }
];
