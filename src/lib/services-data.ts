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

export const consultationFormats = [
  {
    id: 'on-site',
    label: 'On-site',
    title: 'On-site consultation',
    text: 'An on-site consultation format is available. Ask whether this format may suit your property and consultation needs.',
  },
  {
    id: 'online',
    label: 'Online / remote',
    title: 'Online / remote consultation',
    text: 'An online or remote format is available, including online floor-plan review. Ask whether this format may suit your property.',
  },
] as const;
