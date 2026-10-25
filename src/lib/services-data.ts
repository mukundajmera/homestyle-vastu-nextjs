import { Building2, Factory, Home, MapPin, PencilRuler, Ruler, type LucideIcon } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/site';

export function whatsappLink(message = 'Hello, I would like to ask about a consultation.') {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export type PropertyService = {
  id: string;
  icon: LucideIcon;
  tab: string;
  title: string;
  tag: string;
  lead: string;
  text: string;
  /** Short line that tells the visitor what to bring to the first conversation. */
  bring: string;
};

export const propertyServices: PropertyService[] = [
  {
    id: 'residential',
    icon: Home,
    tab: 'Homes',
    title: 'Residential Vastu & Feng Shui',
    tag: 'Homes',
    lead: 'Guidance for homes, apartments and residential plots.',
    text: 'Discuss Vastu and Feng Shui questions about where you live, and ask which consultation format may suit your property.',
    bring: 'The property type, its rough layout and the questions you have.',
  },
  {
    id: 'commercial',
    icon: Building2,
    tab: 'Business',
    title: 'Commercial Vastu & Feng Shui',
    tag: 'Business',
    lead: 'Offices, retail spaces, hotels, hospitals and restaurants.',
    text: 'Commercial consultations can cover offices, retail spaces, hotels, hospitals and restaurants. Feng Shui can also be discussed for commercial spaces.',
    bring: 'The business type, the space you use and the decision you are weighing.',
  },
  {
    id: 'plot-land',
    icon: MapPin,
    tab: 'Plots',
    title: 'Plot & Land Selection',
    tag: 'Before you buy',
    lead: 'Think it through before you commit.',
    text: 'Talk through the Vastu considerations of a plot or site you are thinking about for a home or business.',
    bring: 'The plot location, its shape if known, and what it will be used for.',
  },
  {
    id: 'construction',
    icon: PencilRuler,
    tab: 'Construction',
    title: 'Construction & Renovation',
    tag: 'Planned builds',
    lead: 'For a planned build or a renovation.',
    text: 'Discuss a new build or renovation and the questions you have at your current project stage.',
    bring: 'Your project stage, drawings if you have them, and the rooms you are changing.',
  },
  {
    id: 'industrial',
    icon: Factory,
    tab: 'Industrial',
    title: 'Industrial & Factory Vastu',
    tag: 'Industrial',
    lead: 'Layout and Vastu for industrial and factory properties.',
    text: 'Discuss the layout and Vastu considerations of an industrial or factory property.',
    bring: 'The site layout, the main work areas and the entry points.',
  },
  {
    id: 'floor-plan',
    icon: Ruler,
    tab: 'Floor plan',
    title: 'Online Floor-Plan Review',
    tag: 'Remote',
    lead: 'Share a layout remotely.',
    text: 'Share your layout remotely and discuss what information is useful to send before the review.',
    bring: 'A clear photo or PDF of the layout with the main directions marked.',
  },
];

export type ServicePageCopy = Pick<PropertyService, 'title' | 'lead' | 'text' | 'bring'>;

/**
 * Services-page copy, keyed by propertyServices id. Kept separate because the homepage
 * property explorer also reads propertyServices and should not change with this page.
 */
export const servicePageCopy: Record<PropertyService['id'], ServicePageCopy> = {
  residential: {
    title: 'Homes: Vastu & Feng Shui',
    lead: 'Make the place you live feel settled and right.',
    text: 'Walk through the parts of your home that shape daily life: the entrance, bedrooms, kitchen, prayer corner, and the placement of water and fire. You leave with clear points to keep, change, or ask about.',
    bring: 'The rough layout of your home, the rooms you use most, and the questions on your mind.',
  },
  commercial: {
    title: 'Business: Vastu & Feng Shui',
    lead: 'Commercial Vastu and Feng Shui for offices, shops and hospitality spaces.',
    text: 'Commercial consultations can cover offices, retail spaces, hotels, hospitals and restaurants. Discuss which Vastu or Feng Shui questions are relevant to your space, such as the entrance, counters and seating.',
    bring: 'The business type, the spaces customers and staff use, and the decision you are weighing.',
  },
  'plot-land': {
    title: 'Plots & Land: Check Before You Buy',
    lead: 'Know what a site is telling you before you commit.',
    text: "Look at a plot's shape, slope, road access, and surroundings before you buy or start building. Discuss Vastu considerations for a plot or site you are considering.",
    bring: 'The plot location, its shape if you have it, and whether it is for a home or a business.',
  },
  construction: {
    title: 'Construction & Renovation',
    lead: 'Plan it right at the drawing stage, or fix it mid-way.',
    text: 'Bring your plan to the design stage, or ask about a renovation already in progress. Discuss the entrance, room placement and key spaces at your current project stage.',
    bring: 'Your project stage, drawings if you have them, and the rooms you plan to change.',
  },
  industrial: {
    title: 'Factories & Industrial Units',
    lead: 'A layout that supports production and the people on the floor.',
    text: 'For factories, warehouses, and industrial units, discuss the entry, work zones, storage and machinery areas of your property.',
    bring: 'The site layout, the main work areas, and the entry and exit points.',
  },
  'floor-plan': {
    title: 'Online Floor-Plan Review',
    lead: 'A second look at your layout, from wherever you are.',
    text: 'Share your plan and discuss the directions, room placement and entrances of your plan remotely.',
    bring: 'A clear photo or PDF of the layout, with the main directions marked.',
  },
};

export const consultationFormats = [
  {
    id: 'on-site',
    label: 'On-site',
    title: 'On-site consultation',
    text: 'Meet in person, walk through your property, and talk through what you see together. Ask whether this format suits your property and your needs.',
  },
  {
    id: 'online',
    label: 'Online / remote',
    title: 'Online / remote consultation',
    text: 'Send your plans and talk it through remotely, including floor-plan reviews. A good fit when you are away from the property or prefer to start from home.',
  },
] as const;
