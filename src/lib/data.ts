import { PlaceHolderImages } from './placeholder-images';
import type { Article } from './types';

const findImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  return {
    url: img?.imageUrl || 'https://picsum.photos/seed/default/600/400',
    hint: img?.imageHint || 'placeholder'
  };
};

export const articles: Article[] = [
  {
    slug: 'introduction-to-feng-shui',
    title: 'An Introduction to Feng Shui Principles',
    excerpt: 'Learn the fundamentals of Feng Shui and how to apply them to create a more harmonious living environment.',
    content: `
Feng Shui, which literally translates to "wind-water," is an ancient Chinese art of placement. The goal is to harmonize individuals with their surrounding environment. It's built on the idea that our living and working spaces are not just physical structures but are living entities filled with an invisible energy called Chi (or Qi).

**Key Concepts:**
- **Chi (Qi):** This is the vital life force energy that flows through everything. In Feng Shui, the aim is to encourage the positive flow of Chi and deflect negative energy.
- **The Five Elements:** Wood, Fire, Earth, Metal, and Water are the five elements that form the basis of all existence. Balancing these elements in your home is crucial. For example, you can add a plant (Wood) or a candle (Fire) to energize a space.
- **The Bagua Map:** This is the energy map of your space. It's an octagon or a square divided into nine areas, each corresponding to a different aspect of life, such as wealth, health, and relationships.

By making simple adjustments—like decluttering, adding plants, or repositioning furniture—you can significantly improve the flow of Chi, leading to better health, increased prosperity, and happier relationships.`,
    imageUrl: findImage('article-1').url,
    imageHint: findImage('article-1').hint,
  },
  {
    slug: 'clearing-clutter-for-better-energy',
    title: 'Clearing Clutter for Better Energy Flow',
    excerpt: 'Discover why decluttering is a cornerstone of Feng Shui and how it can transform your home and life.',
    content: `
In Feng Shui, clutter is more than just a mess. It represents stagnant, blocked energy that can negatively impact your life. It can drain your energy, block opportunities, and keep you stuck in the past.

**Why is Clutter Bad?**
- **Blocks Chi:** Clutter obstructs the flow of positive energy in your home.
- **Emotional Weight:** Old, unused items can tie you to past events and emotions, preventing you from moving forward.
- **Health Issues:** Dust and allergens trapped in clutter can contribute to health problems.

**How to Start Decluttering:**
1. **Start Small:** Choose one small area, like a drawer or a shelf, to begin.
2. **The Four-Box Method:** Get four boxes and label them: Keep, Donate/Sell, Trash, and Relocate.
3. **Ask Yourself:** For each item, ask: "Do I love it? Do I use it? Does it bring me joy?" If the answer is no, it's time to let it go.

A clutter-free home allows Chi to flow freely, creating a sense of peace, clarity, and renewal. It opens up not just physical space, but mental and emotional space as well.
    `,
    imageUrl: findImage('article-2').url,
    imageHint: findImage('article-2').hint,
  },
  {
    slug: 'feng-shui-for-a-restful-bedroom',
    title: 'Feng Shui Tips for a Restful Bedroom',
    excerpt: 'Transform your bedroom into a sanctuary of peace and rejuvenation with these simple Feng Shui adjustments.',
    content: `
The bedroom is one of the most important rooms in Feng Shui. It's your personal sanctuary, a place for rest, rejuvenation, and intimacy. The energy in your bedroom directly affects your personal energy and your relationships.

**Tips for a Harmonious Bedroom:**
- **Bed Placement:** The bed should be in the "commanding position." This means you should be able to see the door from your bed, but not be directly in line with it.
- **Headboard:** A solid headboard provides a sense of support and stability in life. It should be placed against a solid wall.
- **Limit Electronics:** TVs, computers, and exercise equipment create active, "yang" energy that can disrupt sleep. Keep them out of the bedroom if possible.
- **Colors:** Use soft, calming, and skin-tone colors (from light white to rich chocolate browns) to promote a soothing atmosphere.
- **Symmetry:** Place matching nightstands and lamps on either side of the bed to create a sense of balance and equality in a relationship.

By creating a bedroom with good Feng Shui, you're creating a space that nurtures your energy, supports your health, and promotes restful sleep.
    `,
    imageUrl: findImage('article-3').url,
    imageHint: findImage('article-3').hint,
  },
  {
    slug: 'the-five-elements-in-your-home',
    title: 'Balancing the Five Elements in Your Home',
    excerpt: 'Understand the five elements of Feng Shui—Wood, Fire, Earth, Metal, and Water—and how to balance them for optimal harmony.',
    content: `
The Five Elements theory is fundamental to Feng Shui practice. These elements—Wood, Fire, Earth, Metal, and Water—represent different types of energy that constantly interact in our environment. By understanding and balancing these elements in your home, you can create a harmonious living space that supports all aspects of your life.

**Understanding Each Element:**

**Wood Element:**
- Represents: Growth, vitality, flexibility, and new beginnings
- Colors: Green and brown
- Shapes: Tall, rectangular, and columnar
- Materials: Wood, bamboo, paper, cotton, and other natural fibers
- Add Wood: Plants, wooden furniture, floral patterns, or green accents

**Fire Element:**
- Represents: Energy, passion, transformation, and recognition
- Colors: Red, orange, yellow, pink, and purple
- Shapes: Triangular and pointed
- Materials: Anything made from animals (leather, feathers, bone, wool)
- Add Fire: Candles, fireplace, bright lighting, or red decorations

**Earth Element:**
- Represents: Stability, grounding, nourishment, and health
- Colors: Brown, tan, beige, and yellow earth tones
- Shapes: Square and flat
- Materials: Clay, brick, tile, and stone
- Add Earth: Crystals, pottery, square furniture, or earth-tone artwork

**Metal Element:**
- Represents: Precision, clarity, efficiency, and helpful people
- Colors: White, gray, and metallic tones
- Shapes: Round and oval
- Materials: Metal, marble, and stones
- Add Metal: Metal picture frames, wind chimes, or white/metallic décor

**Water Element:**
- Represents: Wisdom, serenity, inspiration, and career
- Colors: Black and dark blue
- Shapes: Wavy and curved
- Materials: Glass and mirrors
- Add Water: Fountains, mirrors, glass objects, or water features

**Creating Balance:**
The key is not to have equal amounts of each element, but to have them work together harmoniously. Use the productive cycle (Wood feeds Fire, Fire creates Earth, Earth produces Metal, Metal collects Water, Water nourishes Wood) to create supporting energy flow in your space.`,
    imageUrl: findImage('article-4').url,
    imageHint: findImage('article-4').hint,
  },
  {
    slug: 'vastu-shastra-for-home-office',
    title: 'Vastu Shastra for Your Home Office',
    excerpt: 'Enhance productivity and success by applying Vastu principles to your home office setup.',
    content: `
In today's work-from-home era, creating a productive and harmonious home office is more important than ever. Vastu Shastra, the ancient Indian science of architecture and spatial arrangement, offers powerful guidelines to optimize your workspace for success, prosperity, and well-being.

**Key Vastu Principles for Home Office:**

**Direction and Placement:**
- **Best Direction:** Face North or East while working to harness positive energy
- **Office Location:** Ideally place your home office in the North, East, or Northeast section of your home
- **Avoid:** Working facing South or Southwest directions, as they can increase stress and obstacles

**Desk Placement:**
- Position your desk so you have a solid wall behind you for support and stability
- Ensure you can see the entrance to your office while seated
- Keep your desk clutter-free and organized
- Avoid placing your desk directly under a beam or sloped ceiling

**Colors for Productivity:**
- **Light Blue:** Enhances concentration and mental clarity
- **Green:** Promotes growth, harmony, and fresh thinking
- **White:** Creates a clean, peaceful environment
- **Yellow:** Stimulates intellect and creativity
- **Avoid:** Dark colors like black or brown, which can create stagnant energy

**Essential Elements:**
- **Natural Light:** Maximize natural light; use full-spectrum bulbs if needed
- **Air Circulation:** Ensure proper ventilation for fresh energy flow
- **Plants:** Add bamboo, money plants, or other green plants for prosperity
- **Water Element:** A small fountain or water feature in the North can boost career prospects

**Storage and Organization:**
- Keep important documents in the North or East sections of your office
- Use closed storage to avoid visual clutter
- Place financial documents in the North direction
- Keep the center of your office space open and uncluttered

**Technology Placement:**
- Position computers and electronic devices in the Southeast corner
- Avoid placing electronic equipment in the Northeast corner
- Use surge protectors to manage electromagnetic energy

By implementing these Vastu principles, you'll create a home office environment that not only supports your physical comfort but also enhances your mental clarity, creativity, and professional success.`,
    imageUrl: findImage('article-5').url,
    imageHint: findImage('article-5').hint,
  },
  {
    slug: 'energize-your-kitchen-with-feng-shui',
    title: 'Energize Your Kitchen with Feng Shui',
    excerpt: 'The kitchen is a symbol of health and prosperity. Learn how to optimize its energy with these Feng Shui tips.',
    content: `
In Feng Shui, the kitchen represents the heart of the home and is deeply connected to health, nourishment, and prosperity. It's where food—the source of life energy—is prepared, making it one of the most important areas to optimize according to Feng Shui principles.

**The Kitchen's Significance:**
The kitchen symbolizes:
- **Health and Vitality:** Through the preparation of nourishing meals
- **Prosperity:** As it represents your ability to provide for your family
- **Family Unity:** As a gathering place for sharing meals and conversations

**Essential Kitchen Feng Shui Tips:**

**Stove Placement and Care:**
- **Command Position:** Position the stove so the cook can see the entrance while cooking
- **Back Support:** The stove should be against a wall, never on an island if possible
- **Keep It Clean:** A clean, well-maintained stove attracts abundance
- **All Burners Work:** Ensure all burners are functional—broken burners symbolize missed opportunities

**Color Harmony:**
- **Earth Tones:** Browns and yellows enhance the nourishing aspect
- **Green:** Promotes growth and healthy eating habits
- **White:** Creates cleanliness and clarity
- **Red Accents:** Can stimulate appetite and energy (use sparingly)
- **Avoid:** Too much black or dark colors, which can suppress appetite

**Organization and Flow:**
- **Clear Pathways:** Maintain clear walkways for good energy circulation
- **Declutter Counters:** Keep surfaces clean and organized
- **Sharp Knives:** Store knives in a block or drawer—visible sharp edges create harsh energy
- **Fresh Food:** Display fresh fruits and vegetables to attract abundance

**Element Balance:**
- **Fire Element:** Stove, lighting, and red accents
- **Water Element:** Sink, refrigerator, and blue/black accents
- **Earth Element:** Ceramic dishes, tile floors, and earth tones
- **Wood Element:** Wooden cutting boards, herbs, and plants
- **Metal Element:** Appliances, utensils, and white colors

**Lighting and Ambiance:**
- **Natural Light:** Maximize natural light with clean windows
- **Task Lighting:** Ensure adequate lighting for food preparation
- **Ambient Lighting:** Create warm, inviting atmosphere for family meals

**Kitchen Placement in Home:**
- **Ideal:** Back of the house, not visible from the front door
- **Good Directions:** Southeast (wealth) or East (health and family)
- **Avoid:** Center of home (creates imbalance) or too close to front door

**Plants and Life Energy:**
- **Herbs:** Fresh herbs like basil, rosemary, or mint enhance both cooking and energy
- **Small Plants:** Add living energy without cluttering the space
- **Avoid:** Cacti or plants with sharp edges in the kitchen

Remember, the kitchen should feel welcoming, clean, and organized. When you create positive energy in your kitchen, you're nourishing not just your body but also attracting prosperity and harmony into your entire home.`,
    imageUrl: findImage('article-6').url,
    imageHint: findImage('article-6').hint,
  },
  {
    slug: 'entrance-hallway-feng-shui',
    title: 'Creating Welcoming Energy at Your Front Entrance',
    excerpt: 'The entrance is the mouth of Chi—learn how to attract positive energy into your home from the moment guests arrive.',
    content: `
In Feng Shui, your front entrance is known as the "Mouth of Chi"—it's where energy enters your home and sets the tone for everything that follows. A well-designed entrance not only welcomes guests but also invites prosperity, opportunities, and positive energy into your life.

**The Importance of First Impressions:**
Your entrance should feel:
- Welcoming and inviting
- Clean and well-maintained
- Bright and clearly visible
- Spacious and uncluttered

**Key Elements for a Feng Shui Entrance:**

**Path and Approach:**
- **Clear Pathway:** Ensure the path to your door is clear, well-lit, and in good repair
- **Curved Approach:** A gently curving path is more inviting than a straight line
- **Lighting:** Good lighting guides positive energy and creates safety
- **Landscaping:** Healthy plants and flowers on both sides create balance

**The Door Itself:**
- **Size and Proportion:** Your front door should be appropriately sized for your home
- **Color:** Choose colors that complement your home's energy—red for power, green for growth, blue for calm
- **Condition:** Keep it well-maintained, painted, and functioning smoothly
- **Hardware:** Clean, polished handles and locks show respect for your home

**Entrance Hall/Foyer:**
- **Spaciousness:** Avoid cramming too much into a small entrance
- **Lighting:** Bright, welcoming light sets a positive mood
- **Mirror Placement:** Mirrors can expand small spaces but shouldn't directly face the front door
- **Storage:** Keep shoes, coats, and clutter organized and hidden

**Colors and Decor:**
- **Warm Welcomes:** Use warm, inviting colors rather than dark or cold tones
- **Art and Decoration:** Choose uplifting, positive imagery
- **Fresh Elements:** Fresh flowers or healthy plants bring life energy
- **Personal Touches:** Family photos or meaningful objects create warmth

**Common Entrance Problems and Solutions:**
- **Dark Entrance:** Add lighting, mirrors, or light-colored paint
- **Cluttered Space:** Create hidden storage solutions
- **Blocked View:** Remove obstacles that block the view of or path to your door
- **Broken Elements:** Repair squeaky hinges, burned-out bulbs, or damaged hardware

**Enhancing Different Entrance Directions:**
- **North:** Add water features or black/blue accents for career growth
- **South:** Use fire elements like candles or red colors for recognition
- **East:** Green plants and wooden elements support health and family
- **West:** Metal elements and white/gray colors attract helpful people

Remember, your entrance is working 24/7 to attract energy into your home. By creating a welcoming, well-maintained entrance, you're setting the stage for positive experiences throughout your entire living space.`,
    imageUrl: findImage('article-7').url,
    imageHint: findImage('article-7').hint,
  },
  {
    slug: 'living-room-harmony-feng-shui',
    title: 'Creating Harmony in Your Living Room',
    excerpt: 'Transform your living room into a space of comfort, conversation, and positive energy with these essential Feng Shui principles.',
    content: `
The living room is the social heart of your home—where family gathers, guests are entertained, and relaxation happens. According to Feng Shui principles, this space should promote harmony, comfort, and positive social interactions while maintaining good energy flow throughout.

**Key Principles for Living Room Feng Shui:**

**Furniture Arrangement:**
- **Command Position:** Arrange seating so people can see the entrance without being directly in line with it
- **Conversation Circle:** Create intimate groupings that encourage face-to-face conversation
- **Back Support:** Sofas and chairs should be positioned against walls when possible
- **Clear Pathways:** Ensure easy movement through the space without obstacles

**Color Harmony:**
- **Earth Tones:** Browns, tans, and warm beiges create grounding and stability
- **Soft Blues and Greens:** Promote calm and restful energy
- **Warm Accents:** Add touches of red, orange, or yellow for energy and warmth
- **Balance:** Avoid overwhelming any single color—variety creates visual interest

**Lighting Design:**
- **Layered Lighting:** Combine ambient, task, and accent lighting
- **Natural Light:** Maximize natural light with clean windows and light window treatments
- **Avoid Harsh Lighting:** Soft, warm light creates a more inviting atmosphere
- **Candles:** Add romantic and peaceful energy (use safely)

**Element Balance:**
- **Wood:** Wooden furniture, plants, green colors, and rectangular shapes
- **Fire:** Fireplace, candles, bright lighting, red accents, and triangular shapes
- **Earth:** Pottery, crystals, yellow/brown colors, and square shapes
- **Metal:** Picture frames, sculptures, white/gray colors, and round shapes
- **Water:** Mirrors, glass, blue/black colors, and flowing shapes

**Technology Integration:**
- **TV Placement:** Avoid making the TV the focal point; consider hiding it when not in use
- **Electronics:** Keep wires organized and hidden
- **Balance:** Ensure technology doesn't dominate the space's energy

**Art and Decoration:**
- **Positive Imagery:** Choose artwork that uplifts and inspires
- **Personal Meaning:** Display items that have personal significance and bring joy
- **Pairs:** Use pairs of objects to promote partnership and balance
- **Height Variation:** Create visual interest with objects of different heights

**Plant Life and Natural Elements:**
- **Living Plants:** Add vitality and improve air quality
- **Natural Materials:** Wood, stone, and other natural elements ground the space
- **Fresh Flowers:** Bring seasonal energy and natural beauty
- **Water Features:** Small fountains can add tranquil energy (place thoughtfully)

**Common Living Room Feng Shui Mistakes:**
- **Floating Furniture:** Furniture pulled away from walls without purpose
- **Blocking Pathways:** Furniture that impedes natural movement
- **Sharp Corners:** Too many sharp angles pointing toward seating areas
- **Clutter:** Overwhelming the space with too many decorative objects
- **Dead Plants:** Keeping unhealthy plants that represent stagnant energy

**Room Layout Tips:**
- Create multiple seating areas in larger rooms
- Use rugs to define conversation spaces
- Ensure each seat has access to a side table
- Position the main seating to take advantage of the best view (garden, fireplace, etc.)

By applying these Feng Shui principles, your living room will become a welcoming space that nurtures relationships, promotes relaxation, and supports the well-being of everyone who enters.`,
    imageUrl: findImage('article-8').url,
    imageHint: findImage('article-8').hint,
  },
];
