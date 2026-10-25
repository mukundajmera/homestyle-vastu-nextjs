/** Blog posts are maintained here: add an object to this array to publish a new article. */
export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD) used for ordering and display. */
  publishedAt: string;
  readMinutes: number;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    "slug": "vastu-and-feng-shui-compared",
    "title": "Vastu Shastra and Feng Shui: similarities and differences",
    "description": "Learn what Vastu Shastra and Feng Shui share, how their traditions differ, and how to consider both when planning a home.",
    "publishedAt": "2026-10-01",
    "readMinutes": 3,
    "sections": [
      {
        "heading": "Two traditions, shared concerns",
        "paragraphs": [
          "Vastu Shastra and Feng Shui are traditional systems for thinking about how buildings relate to their surroundings. Both invite people to notice orientation, movement, light, and the way rooms are used. They offer frameworks for making thoughtful choices about a home, rather than a single universal plan that suits every site.",
          "The traditions also share an interest in balance and the experience of living in a space. A clear route through a home, comfortable daylight, and rooms that support everyday routines are practical considerations many homeowners can explore alongside traditional guidance."
        ]
      },
      {
        "heading": "Where the traditions differ",
        "paragraphs": [
          "Vastu Shastra developed in India and often considers directions, site proportions, room placement, and a building's relationship to its plot. Feng Shui developed in China and includes its own approaches to orientation, the movement of qi, and the relationship between people and their surroundings. Each tradition has different schools and methods, so advice can vary among practitioners.",
          "Some terms or recommendations may sound similar, but that does not mean the systems are interchangeable. A direction, element, or placement can carry a different meaning in each tradition. It is helpful to ask which framework is being used and how a recommendation relates to your particular home."
        ]
      },
      {
        "heading": "Using both thoughtfully",
        "paragraphs": [
          "If you are interested in both, begin with your household's needs, the actual layout, and any limits set by structure, safety, or local rules. You can explore each tradition separately, note where recommendations align, and ask a consultant to explain any differences before deciding what to do. Avoid making major changes based only on a general rule or an online diagram.",
          "A practical review can consider how people enter, move through, and use the home, as well as the traditional principles you want to follow. Sanjay Jain can help discuss Vastu guidance for a specific property. Treat traditional interpretations as cultural guidance, not as proven claims about health, wealth, or future outcomes."
        ]
      }
    ]
  },
  {
    "slug": "plot-selection-checklist",
    "title": "A traditional checklist for choosing a plot",
    "description": "Consider a plot's shape, slope, road access, and surroundings, and prepare questions for a professional before you buy.",
    "publishedAt": "2026-10-08",
    "readMinutes": 3,
    "sections": [
      {
        "heading": "Start with the plot and your needs",
        "paragraphs": [
          "Choosing land is a major practical decision. Before applying traditional Vastu checks, confirm the plot's boundaries, legal status, access, utilities, and suitability for the home you plan to build. Review official records and consult qualified property and construction professionals. Traditional guidance can be one part of your consideration, but it does not replace due diligence.",
          "Make a simple checklist of what matters to your household: approximate home size, outdoor space, privacy, access to daily services, and any building limits. A site plan or survey can help you discuss the land accurately with a Vastu consultant."
        ]
      },
      {
        "heading": "Observe shape and slope",
        "paragraphs": [
          "In traditional Vastu discussions, plot shape may be considered in relation to proportions and boundaries. People often ask about regular shapes, such as rectangular or square plots, and about irregular corners or extensions. These are traditional interpretations, not a substitute for checking the actual dimensions, boundary markers, and buildable area.",
          "Slope and drainage deserve practical attention. Notice how the land sits relative to nearby roads and properties, where rainwater flows, and whether there are signs of pooling or erosion. Traditional guidance may also consider the direction of slope. Ask a surveyor or engineer to assess grading and drainage rather than relying on visual impressions alone."
        ]
      },
      {
        "heading": "Check roads and surroundings",
        "paragraphs": [
          "Look at how roads meet the plot, the position of entrances, and the ease of reaching the site. Traditional guidance may interpret road directions or the way a road approaches a plot in particular ways. For daily living, also consider traffic, noise, pedestrian access, and emergency vehicle access.",
          "Walk the area at different times if possible. Note neighboring buildings, open spaces, utilities, trees, and any planned development you can verify. Ask about easements, setbacks, and local construction rules. What feels peaceful during one visit may be different at another time of day."
        ]
      },
      {
        "heading": "Discuss the site before committing",
        "paragraphs": [
          "Bring a plot plan, compass-based direction information if available, photographs, and your practical requirements to a professional. Ask which traditional method they use, what observations they need, and how any suggestions fit the site's legal and engineering constraints. A consultant can help interpret traditional considerations for your plot; the final purchase should also reflect independent legal, financial, and technical advice."
        ]
      }
    ]
  },
  {
    "slug": "entrance-and-kitchen-basics",
    "title": "Main entrance and kitchen: traditional Vastu basics",
    "description": "Explore traditional considerations for a home's entrance and kitchen, and see why a site visit or floor plan review can help.",
    "publishedAt": "2026-10-15",
    "readMinutes": 3,
    "sections": [
      {
        "heading": "The entrance in traditional guidance",
        "paragraphs": [
          "The main entrance is often an important point in traditional Vastu discussions because it connects the home with its surroundings. Guidance may consider the direction and position of the doorway, the approach from outside, and how people move into the interior. Interpretations can differ by method and by the details of the property.",
          "There are also everyday questions worth checking: Is the entry easy to find and use? Does the door open safely? Is the route well lit and clear? Can residents and visitors move through it comfortably? These practical concerns can be considered alongside traditional preferences."
        ]
      },
      {
        "heading": "Thinking about kitchen placement",
        "paragraphs": [
          "Traditional Vastu guidance often considers the kitchen's location and the placement of cooking and storage areas. Specific recommendations vary, and a suggested position may not be feasible in an existing home. The structure, plumbing, ventilation, electrical connections, and household routines all matter when considering a layout.",
          "Keep safety and building requirements central. A kitchen needs suitable ventilation, clear working space, safe appliance placement, and appropriate services. Consult qualified professionals before relocating utilities or making structural changes. Traditional guidance can inform discussion, but it should not override safety or local requirements."
        ]
      },
      {
        "heading": "Why the full layout matters",
        "paragraphs": [
          "A short description of a doorway or kitchen cannot show how the whole home fits together. The direction of the building, the actual location of rooms, windows, stairs, walls, and nearby surroundings may affect how a recommendation is interpreted. A site visit can make these conditions easier to understand.",
          "When an in-person visit is not practical, a clear, dimensioned floor plan can support an initial review. Include a north marker, room names, entrances, windows, and any known structural limits. The consultant may need follow-up questions or additional information before commenting on particular details."
        ]
      },
      {
        "heading": "Use guidance as a considered input",
        "paragraphs": [
          "Sanjay Jain can discuss traditional Vastu considerations for a home's entrance and kitchen based on the information available. Ask how a recommendation relates to your floor plan and what practical constraints should be checked. Treat such guidance as a traditional perspective, not a proven promise of health, wealth, or a particular outcome."
        ]
      }
    ]
  },
  {
    "slug": "preparing-floor-plan-for-online-review",
    "title": "How to prepare a floor plan for an online Vastu review",
    "description": "Prepare a readable floor plan with north marked, room labels, and dimensions so an online Vastu discussion has useful context.",
    "publishedAt": "2026-10-22",
    "readMinutes": 3,
    "sections": [
      {
        "heading": "Begin with a clear plan",
        "paragraphs": [
          "A useful online Vastu review starts with a floor plan that is easy to read. Use a clear scan, export, or straight-on photograph rather than an angled image. Check that the full outline of the home is visible and that text remains legible when zoomed in. If you have several floors, provide a separate plan for each level.",
          "Use the most accurate plan you have. If the home has changed since the drawing was made, mark the changes or note that the plan may be outdated. Do not guess at walls or room positions when you can measure or verify them."
        ]
      },
      {
        "heading": "Mark direction and dimensions",
        "paragraphs": [
          "Show north clearly on the plan. If you are unsure of the orientation, say so rather than adding an uncertain arrow. Explain how the direction was determined, if known, and include a site plan or other reference when available. Direction can be important in traditional interpretation, so uncertainty is useful context.",
          "Add room dimensions, or provide them in a simple accompanying list. Include the overall external dimensions if available. Measurements help distinguish a rough sketch from a scaled plan and can clarify the size and proportions of rooms. Use consistent units and label them."
        ]
      },
      {
        "heading": "Label rooms and useful details",
        "paragraphs": [
          "Write a clear name inside each room, such as bedroom, kitchen, bathroom, living area, or utility space. Mark the main entrance, other doors, windows, stairs, balconies, and any open areas. If relevant, show fixed features such as columns or walls that cannot be moved.",
          "You can add a brief note about how rooms are used, especially if a space serves more than one purpose. Include the property's general setting or orientation if it helps explain the plan. Share only details that are needed for the review, and avoid including personal documents or sensitive information in the drawing."
        ]
      },
      {
        "heading": "Send context and questions",
        "paragraphs": [
          "Along with the plan, list your main questions and mention whether the home is under construction, complete, or being renovated. Point out any practical constraints, such as fixed plumbing or structural walls. This helps the consultant understand what can realistically be discussed from an online review.",
          "An online review is based on the material provided, so unclear or missing details may lead to follow-up questions. Sanjay Jain can explain what additional information would help assess traditional Vastu considerations. Keep the discussion focused on the plan and your goals, and treat any traditional interpretation as guidance rather than a promise of results."
        ]
      }
    ]
  }
];

/** Newest first, so the blog index and the sitemap list the latest article at the top. */
export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
