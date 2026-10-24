export type VastuDirection = {
  label: string;
  name: string;
  angle: number;
  theme: string;
  question: string;
  note: string;
};

const traditionalNote =
  'This is a traditional association; a consultation is where Sanjay Jain reviews the actual property.';

export const vastuDirections: readonly VastuDirection[] = [
  {
    label: 'N',
    name: 'North',
    angle: 0,
    theme: 'career and steady income',
    question: 'Is the north side of my plot or entrance open and uncluttered?',
    note: traditionalNote,
  },
  {
    label: 'NE',
    name: 'North-East',
    angle: 45,
    theme: 'clarity, prayer and calm',
    question: 'Is the north-east corner kept light, clean and free of heavy storage?',
    note: traditionalNote,
  },
  {
    label: 'E',
    name: 'East',
    angle: 90,
    theme: 'health and new beginnings',
    question: 'Does the east side get morning light into the main living area?',
    note: traditionalNote,
  },
  {
    label: 'SE',
    name: 'South-East',
    angle: 135,
    theme: 'the kitchen and energy',
    question: 'Is the kitchen in the south-east, and is the stove placed well?',
    note: traditionalNote,
  },
  {
    label: 'S',
    name: 'South',
    angle: 180,
    theme: 'stability and reputation',
    question: 'Is the south side solid, with heavier construction and no open cuts?',
    note: traditionalNote,
  },
  {
    label: 'SW',
    name: 'South-West',
    angle: 225,
    theme: 'stability in relationships',
    question: 'Is the master bedroom in the south-west?',
    note: traditionalNote,
  },
  {
    label: 'W',
    name: 'West',
    angle: 270,
    theme: 'gains and children',
    question: 'Does the west side have openings that bring in afternoon light?',
    note: traditionalNote,
  },
  {
    label: 'NW',
    name: 'North-West',
    angle: 315,
    theme: 'movement, guests and support',
    question: 'Is the north-west used for guests, movement or air flow?',
    note: traditionalNote,
  },
];
