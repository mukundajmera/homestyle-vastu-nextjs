'use client';

import dynamic from 'next/dynamic';
import type { JourneyStep } from '@/components/journey-stepper';

const VastuDial = dynamic(() => import('@/components/vastu-dial').then((module) => module.VastuDial));
const PropertyExplorer = dynamic(() => import('@/components/property-explorer').then((module) => module.PropertyExplorer));
const JourneyStepper = dynamic(() => import('@/components/journey-stepper').then((module) => module.JourneyStepper));

export function HomeVastuDial() {
  return <VastuDial />;
}

export function HomePropertyExplorer() {
  return <PropertyExplorer />;
}

export function HomeJourneyStepper({ steps }: { steps: JourneyStep[] }) {
  return <JourneyStepper steps={steps} />;
}
