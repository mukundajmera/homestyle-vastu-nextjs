export type BlogSection = { heading: string; paragraphs: string[] };
export type BlogFAQ = { question: string; answer: string };
export type BlogPost = {
  slug: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  readMinutes: number;
  tool: 'compare' | 'plot-checklist' | 'entrance-explorer' | 'plan-check';
  sections: BlogSection[];
  faqs: BlogFAQ[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'vastu-and-feng-shui-compared', image: '/blog/vastu-and-feng-shui-compared.svg',
    imageAlt: 'Architectural comparison diagram showing a home plan, compass, entrance and kitchen in Vastu and Feng Shui columns.',
    title: 'Vastu and Feng Shui for Jaipur Homes: Key Differences',
    description: 'Compare traditional Vastu and Feng Shui perspectives for Jaipur homes, then prepare measured plans and focused questions for a consultant.',
    keywords: ['Vastu consultant in Jaipur', 'Feng Shui consultant Jaipur', 'Vastu and Feng Shui differences', 'Vastu for Jaipur homes', 'home entrance Vastu', 'Vastu kitchen direction', 'online Vastu consultation', 'measured floor plan review'],
    publishedAt: '2026-09-01', readMinutes: 5, tool: 'compare',
    sections: [
      { heading: 'Two traditions, two ways to read a home', paragraphs: [
        'Vastu Shastra and Feng Shui are distinct traditions with different histories, schools and ways of interpreting a place. A consultant may discuss orientation, room use and the relationship between a building and its surroundings in either tradition, but the terms and reasoning are not interchangeable. Even within one tradition, interpretations can vary. Treat a recommendation as a traditional perspective to consider alongside measured facts and your household’s practical needs.',
        'For a Jaipur home, begin with the actual site and building. Record which sides meet a road, where the main door sits, how rooms connect and which walls or services cannot move. A north arrow is useful only when you know how it was established. Note whether it came from a site survey, a plan or a phone compass, and mark it approximate if readings differ. Keep daylight, ventilation, safe circulation, access and local building requirements in view throughout the discussion.'
      ]},
      { heading: 'Compare Vastu and Feng Shui advice against one measured plan', paragraphs: [
        'Use the same current plan when asking about both traditions. Include every floor, the outside dimensions, room names, doors, windows, stairs, balconies and fixed features. For an entrance question, measure the opening and its distance from the nearest corners, then show the approach from the gate. For a kitchen question, mark the sink, cooktop, counters, windows, exhaust point and the direction in which a person faces while cooking. A rough sketch is useful if it is labelled as approximate; it should not be presented as a surveyed drawing.',
        'Write down what is fixed: structural walls, plumbing, gas lines, electrical panels, shared shafts and existing furniture that cannot be relocated. Add a few clear photographs and a short list of priorities. These details help a consultant distinguish a traditional preference from a change that would require construction or a qualified trade professional.'
      ]},
      { heading: 'Questions for a Vastu consultant in Jaipur', paragraphs: [
        'When you receive advice, ask which tradition and method it comes from, what feature of the plan it refers to and what assumptions were made about direction. If two recommendations differ, ask each adviser to explain the basis rather than combining rules yourself. Ask which options need no building work, which should be reviewed by an architect, and which involve a structural engineer, electrician or plumber. A traditional reading cannot establish that a wall can safely be removed or that a proposed layout meets local regulations.',
        'Keep a dated copy of the plan and write suggested changes directly beside the relevant room or wall. If you later update the drawing, label the new version so that everyone is discussing the same layout. Sanjay Jain is a Feng Shui and Vastu Consultant with 25+ years of practice. Share the plan, your measurements and the questions that matter most to your household.'
      ]},
      { heading: 'Make room for practical needs', paragraphs: [
        'A useful review leaves space for the people who live in the home. Consider how residents enter, cook, rest, work and move between rooms. Check that doors open fully, routes remain clear, rooms can be ventilated and proposed changes do not interfere with safe appliance use. If the home is occupied, under construction or being renovated, state that clearly because it affects which options are realistic.',
        'Traditional Vastu and Feng Shui interpretations are perspectives for discussion. Consider them alongside measured information, building rules, professional safety advice and your own priorities.'
      ]}
    ],
    faqs: [
      { question: 'Are Vastu Shastra and Feng Shui the same system?', answer: 'No. They are distinct traditions with different methods and schools. Similar topics do not mean that their explanations or recommendations are interchangeable.' },
      { question: 'What should I prepare before comparing advice?', answer: 'Bring a current north-marked plan for each floor, dimensions, room labels, fixed features, a few photographs and a short list of priorities.' },
      { question: 'Can a traditional recommendation confirm that construction is safe?', answer: 'No. Ask an architect or appropriately qualified professional to assess structural, electrical, plumbing, ventilation and regulatory questions.' }
    ]
  },
  {
    slug: 'plot-selection-checklist', image: '/blog/plot-selection-checklist.svg',
    imageAlt: 'Architectural site plan diagram with a measured plot boundary, road edge, north arrow and drainage marks.',
    title: 'Vastu for Plot Selection: A Jaipur Site Checklist',
    description: 'Check plot records, boundaries, access, levels and drainage in Jaipur before weighing traditional Vastu preferences or planning a building.',
    keywords: ['Vastu for plot selection', 'Vastu consultant in Jaipur', 'Jaipur plot checklist', 'plot direction Vastu', 'Vastu plot shape', 'plot boundary survey', 'Jaipur land due diligence', 'site selection questions'],
    publishedAt: '2026-09-15', readMinutes: 5, tool: 'plot-checklist',
    sections: [
      { heading: 'Jaipur plot selection: confirm the boundary on paper and on site', paragraphs: [
        'Start with independent due diligence. Ask a property lawyer to review title, ownership, encumbrances, permitted use, access rights and relevant approvals. Have a licensed surveyor locate the boundary points and compare dimensions with the documents. Ask the local authority or your architect about setbacks, permitted construction, road widening plans and utility connections. A traditional Vastu preference cannot confirm that land is legally buildable or that a proposed building can be approved.',
        'Take the sale plan, a notebook, measuring tape or laser measure, and a phone for photographs on the site visit. Record the frontage, depth and each side. Mark the north direction and say how it was checked. Photograph each corner, the road edge and neighbouring boundaries. If a boundary marker is missing or unclear, ask the surveyor to identify it instead of relying on an estimate.'
      ]},
      { heading: 'Measure shape, levels and drainage', paragraphs: [
        'Sketch the plot from above and label every measured side, angle, corner, cut or extension. A site that looks square can have unequal sides, so use surveyed dimensions rather than appearance. Note whether the legal plot outline differs from the part that seems usable. In traditional Vastu discussions, shape, proportions and orientation may be considered. Ask the consultant which outline their interpretation uses and how an irregular boundary is handled.',
        'Observe ground levels at the road and across the site. Note low points, retaining walls, erosion, damp patches and any visible route that rainwater takes. Ask a civil engineer or surveyor to assess grading, soil and storm-water drainage. Keep that engineering assessment separate from a traditional interpretation of slope or relative levels. Do not infer foundation suitability from a visual inspection.'
      ]},
      { heading: 'Record access and surroundings', paragraphs: [
        'Write down which sides meet a public road, the road width and how a person or vehicle enters the plot. Visit at different times if you can. Note traffic, street lighting, visibility, pedestrian access, emergency access and nearby services. Photograph the approach from the road and mark gates, drains, trees, poles, adjoining walls and any shared passage or easement on the sketch.',
        'Ask for written evidence of proposed development or utility connections. A nearby empty area, for example, may not remain open unless its use is confirmed. These practical facts affect the building footprint and access. Traditional Vastu readings may also consider the approach road and direction, but they do not replace checks of ownership, access rights or site conditions.'
      ]},
      { heading: 'Bring a useful brief to a consultant', paragraphs: [
        'For a traditional review, bring the verified survey, a clear plot outline with north marked, photographs of the road and boundaries, and a note about the building you are considering. Include approximate room, parking and access needs plus any restrictions already confirmed. Ask which traditional checks apply to this plot, what measurements they rely on, what remains uncertain, and how the advice fits within the permitted building area. Sanjay Jain is a Feng Shui and Vastu Consultant with 25+ years of practice.',
        'Keep the purchase decision grounded in independent legal, financial and technical advice, as well as your own requirements. Traditional Vastu interpretations offer one perspective on a plot; they do not establish legal, financial or technical suitability.'
      ]}
    ],
    faqs: [
      { question: 'What should I verify before considering Vastu preferences?', answer: 'Have a lawyer review the records and a licensed surveyor confirm the boundary and dimensions. Also check permitted use, access, approvals, services and site conditions.' },
      { question: 'Which measurements should I take to a plot discussion?', answer: 'Bring surveyed side lengths and boundary points, road width, levels where available, a north-marked outline and photographs of the approach and surroundings.' },
      { question: 'Can a checklist determine whether I should buy a plot?', answer: 'No. It helps organise questions. Purchase decisions need independent legal, financial and technical checks and should reflect your own requirements.' }
    ]
  },
  {
    slug: 'entrance-and-kitchen-basics', image: '/blog/entrance-and-kitchen-basics.svg',
    imageAlt: 'Architectural home plan highlighting an entrance approach, kitchen work triangle, windows and compass directions.',
    title: 'Main Entrance Vastu Direction: Jaipur Home Checks',
    description: 'Measure a Jaipur home entrance and kitchen, map fixed services and prepare direction details for a practical Vastu discussion.',
    keywords: ['main entrance Vastu direction', 'Vastu consultant in Jaipur', 'Jaipur home entrance Vastu', 'Vastu for kitchen', 'Vastu entrance measurement', 'north direction floor plan', 'Vastu home consultation', 'kitchen layout review'],
    publishedAt: '2026-09-29', readMinutes: 5, tool: 'entrance-explorer',
    sections: [
      { heading: 'Measure the main entrance Vastu direction as it is built', paragraphs: [
        'Traditional Vastu discussions may consider the direction of the main entrance, its position along the wall, the approach and the route into the home. To describe your entrance clearly, measure the door opening and its distance from the nearest corners of that wall. Mark the door swing, threshold, steps, porch, gate and any column or wall beside it. Add a north arrow and state how you determined direction. If a phone compass gives inconsistent readings, label the direction approximate.',
        'Check daily use as well. Can the door open fully? Is the route clear and lit? Are there steps or narrow turns to mention? Photograph the approach from outside and the view just inside the door. These observations make a discussion concrete without treating any one directional preference as a rule that applies to every house.'
      ]},
      { heading: 'Map the kitchen and its fixed services', paragraphs: [
        'Measure the inside length and width of the kitchen. Mark doors, windows, counters, sink, cooktop, refrigerator, exhaust point and fixed storage. Note the room’s direction and the direction a person faces at the main cooking position. Traditional Vastu interpretations may consider the kitchen location and relative placement of cooking and water areas. Ask which method is being used and which features on your plan support the interpretation.',
        'Before considering a change, mark plumbing, gas lines, electrical points, ventilation ducts, structural walls and shared shafts. Keep required appliance clearances and ventilation in view. Ask a qualified designer or tradesperson to check any changes to gas, wiring, plumbing or walls. A traditional preference should not override fire safety, building rules or the needs of people who cook in the space.'
      ]},
      { heading: 'Use the whole floor plan for context', paragraphs: [
        'Provide a legible plan for every floor with outside dimensions, room names, north, doors, windows, stairs, balconies and fixed walls. Mark which spaces are bedrooms, work areas or shared rooms. If the house has changed since the plan was drawn, mark the changes and date your update. Include photographs of the entrance and kitchen and list the questions you want answered in order of importance.',
        'State whether the property is complete, under construction or being renovated. Note deadlines and constraints such as fixed plumbing or a structural wall. Sanjay Jain is a Feng Shui and Vastu Consultant with 25+ years of practice. Ask what can be discussed from the material you provide and what would need an on-site inspection.'
      ]},
      { heading: 'Prioritise safe, workable changes', paragraphs: [
        'Sort suggestions into changes that need no construction, options for an architect or interior designer to review, and work that needs a qualified trade professional. Ask for the reason behind each suggestion and whether it depends on a specific direction reading or a particular school of Vastu. Keep a marked-up copy of the correct plan so that a contractor does not work from an old version.',
        'Traditional Vastu interpretations are perspectives for discussion. Keep safe access, ventilation, lighting, appliance clearances and local requirements in the decision.'
      ]}
    ],
    faqs: [
      { question: 'How do I describe my entrance direction?', answer: 'Show a north arrow and note how you checked it. Mark the doorway, its position along the wall, its approach, nearby corners and any uncertainty in the reading.' },
      { question: 'What should a kitchen plan show?', answer: 'Include room dimensions, doors, windows, sink, cooktop, counters, refrigerator, ventilation, fixed services and the direction a person faces while cooking.' },
      { question: 'Should I move gas or plumbing for a traditional preference?', answer: 'Get a qualified professional to assess safety and feasibility first. Keep building requirements and practical use in view.' }
    ]
  },
  {
    slug: 'preparing-floor-plan-for-online-review', image: '/blog/preparing-floor-plan-for-online-review.svg',
    imageAlt: 'A clean annotated floor plan with north arrow, dimensions, room labels, doors, windows and fixed features.',
    title: 'Online Vastu Floor Plan Review: Prepare Your Jaipur Home Plan',
    description: 'Prepare a clear floor plan for an online Vastu review with measured dimensions, north, room labels and focused questions.',
    keywords: ['online Vastu floor plan review', 'Vastu consultant in Jaipur', 'Jaipur Vastu consultation online', 'floor plan Vastu check', 'north direction on floor plan', 'Vastu plan dimensions', 'home layout consultation', 'prepare floor plan for Vastu'],
    publishedAt: '2026-10-13', readMinutes: 5, tool: 'plan-check',
    sections: [
      { heading: 'Prepare a clear floor plan for an online Vastu review', paragraphs: [
        'Use the latest architect’s plan or a careful measured drawing. Export a readable PDF or take a straight-on photo in even light. Keep the entire outside outline in frame, then zoom in to confirm that room names and dimensions can be read on a phone. Send a separate plan for every floor, including a basement, terrace or other level if it relates to your question. Date the drawing and mark later changes clearly.',
        'Do not guess at a missing wall or dimension. Mark an unknown measurement as unknown and say if the drawing is not to scale. For an occupied home, the plan should show fixed walls, openings and services before movable furniture. Remove identity documents, account details and unrelated personal information from the image before sharing it.'
      ]},
      { heading: 'Mark north and measure consistently', paragraphs: [
        'Place a north arrow on every floor. If you used a phone compass, write that down and note where you stood. Nearby metal and electrical equipment can affect readings. If you cannot confirm the direction, label it uncertain instead of drawing a precise arrow. Traditional Vastu interpretations may depend on orientation, so the source and confidence of the reading help frame the discussion.',
        'Add the overall outside length and width, then room dimensions using one unit throughout, such as metres or feet and inches. Include wall thicknesses if available. If a measurement is estimated, label it. A short measurement list beside the drawing is easier to read than crowded text placed over room labels.'
      ]},
      { heading: 'Label rooms, openings and fixed features', paragraphs: [
        'Write each room’s everyday use inside it: kitchen, bedroom, living room, bathroom, store or work area. Mark the main entrance and other doors, windows, stairs, balconies and open-to-sky areas. Show columns, structural walls, fixed plumbing, gas points and electrical panels if they limit possible changes. For kitchen questions, label the sink, cooktop and ventilation; for entrance questions, show the gate and approach if known.',
        'Add a brief note about the household’s main concern and any immovable constraint. You might identify a structural wall that cannot be altered or explain that plumbing is fixed. Send only what is needed for the discussion and keep private records separate from the plan.'
      ]},
      { heading: 'Ask focused questions and explain the project stage', paragraphs: [
        'Say whether the home is planned, under construction, complete or being renovated. List two or three questions, such as what direction detail is still needed, whether a proposed kitchen position can be considered from this drawing, or which fixed walls affect options. Ask what additional measurement or photograph would make the next conversation clearer. Sanjay Jain is a Feng Shui and Vastu Consultant with 25+ years of practice.',
        'Keep a copy of the plan and any notes about the discussion so a follow-up uses the same version. Traditional Vastu interpretations are perspectives for discussion. Structural, electrical, plumbing and regulatory questions need appropriately qualified professionals.'
      ]}
    ],
    faqs: [
      { question: 'Can I send a hand-drawn floor plan?', answer: 'Yes, if it is legible, dated and labelled as a measured or approximate sketch. Include dimensions, north, room names, openings and fixed features.' },
      { question: 'Do I need to send every floor?', answer: 'Include each floor that affects your question, and label levels clearly. Shared stairs or features spanning floors should be marked.' },
      { question: 'What if I do not know the exact north direction?', answer: 'Mark the direction as uncertain and say how you estimated it. Do not present an unverified compass reading as exact.' }
    ]
  }
];

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
