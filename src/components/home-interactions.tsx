'use client';

import dynamic from 'next/dynamic';

const VastuDial = dynamic(() => import('@/components/vastu-dial').then((module) => module.VastuDial));
const PropertyExplorer = dynamic(() => import('@/components/property-explorer').then((module) => module.PropertyExplorer));

export function HomeVastuDial() {
  return <VastuDial />;
}

export function HomePropertyExplorer() {
  return <PropertyExplorer />;
}
