// Shared offering data — used by the homepage (App.jsx) and the lane pages.

export const services = [
  {
    num: '01',
    tag: 'Video',
    name: 'Video Production',
    line: 'Stories that move.',
    desc: 'Cinematic brand films, commercials and short-form content that stop the scroll — and stay with people long after.',
    deliverables: ['Brand Films', 'Commercials', 'Social Reels', 'Event Coverage'],
    glow: '197,164,74',
    approach: 'From a single hero film to an ongoing content engine, we handle concept, shoot and edit end to end — so all you do is show up.',
    perfectFor: [
      { t: 'Construction', d: 'Timeline, progress & completion films that document the whole build.' },
      { t: 'Real Estate', d: 'Listing & development showcases that sell the lifestyle, not just the floorplan.' },
      { t: 'Hospitality', d: 'Venue, food & atmosphere reels that fill tables and rooms.' },
      { t: 'Events', d: 'Highlight films & recaps you can run for years.' },
      { t: 'Brands', d: 'Commercials & social campaigns built to convert.' },
    ],
  },
  {
    num: '02',
    tag: 'Photography',
    name: 'Photography',
    line: 'Every detail, sharp.',
    desc: 'Editorial brand, product and lifestyle photography — shot to sell, not just to look pretty.',
    deliverables: ['Brand & Product', 'Lifestyle', 'Headshots', 'On-Location'],
    glow: '197,164,74',
    approach: 'Editorial-grade stills for every corner of your brand — shot, retouched and delivered ready to publish.',
    perfectFor: [
      { t: 'Real Estate', d: 'Interiors & listing galleries that make properties impossible to scroll past.' },
      { t: 'Hospitality', d: 'Food, drink & venue shoots that look as good as they taste.' },
      { t: 'Construction', d: 'Site & milestone documentation for reports and marketing.' },
      { t: 'Products & E-commerce', d: 'Clean studio and lifestyle imagery that drives sales.' },
      { t: 'Teams', d: 'Headshots & culture shoots that humanise your brand.' },
    ],
  },
  {
    num: '03',
    tag: 'Aerial',
    name: 'Aerial & Drone',
    line: 'A view they can’t match.',
    desc: 'Licensed drone cinematography that gives your brand a perspective competitors simply can’t reach.',
    deliverables: ['4K Aerial', 'Real Estate', 'Construction', 'Landscapes'],
    glow: '197,164,74',
    approach: 'CASA-licensed drone work that adds scale and cinema to any project — flown safely, legally and beautifully.',
    perfectFor: [
      { t: 'Construction', d: 'Aerial progress capture & site surveys from groundbreak to handover.' },
      { t: 'Real Estate', d: 'Property & land showcases that reveal the full scope.' },
      { t: 'Events', d: 'Sweeping crowd & venue reveals for a cinematic open.' },
      { t: 'Hospitality & Tourism', d: 'Location films that sell the destination.' },
      { t: 'Acreage & Landscapes', d: 'Resorts, golf courses and large sites shown at scale.' },
    ],
  },
  {
    num: '04',
    tag: 'Web',
    name: 'Web Design',
    line: 'Content into customers.',
    desc: 'Fully custom-coded websites — no templates — that turn all of that content into real, paying customers.',
    deliverables: ['Custom Build', 'No Templates', 'SEO Ready', 'Lightning Fast'],
    glow: '197,164,74',
    approach: 'Fully custom-coded sites that turn all this media into enquiries — fast, modern and built to convert.',
    perfectFor: [
      { t: 'Trades & Local Business', d: 'Lead-generation sites that turn clicks into calls.' },
      { t: 'Real Estate', d: 'Listing & agent sites with your photography front and centre.' },
      { t: 'Hospitality', d: 'Booking, menu & enquiry sites that look the part.' },
      { t: 'Brands', d: 'Campaign & portfolio sites that showcase your media.' },
      { t: 'Anyone on a template', d: 'A proper custom build to replace a slow Wix or Squarespace site.' },
    ],
  },
]

// Industry-tailored offerings for the "For Businesses" lane.
export const businessIndustries = [
  {
    n: '01', t: 'Construction & Development', ongoing: true,
    d: 'Monthly progress updates, timeline & completion films, plus aerial site capture from groundbreak to handover.',
    tags: ['Film', 'Aerial', 'Photo'],
    detail: {
      lead: 'Long builds deserve long-form storytelling. We document your projects from groundbreak to handover — so every milestone becomes marketing.',
      crafts: [
        { k: 'Film', v: 'Timeline, progress & completion films that document the whole build.' },
        { k: 'Aerial', v: 'CASA-licensed progress capture & site surveys, flown on a schedule.' },
        { k: 'Photo', v: 'Site & milestone stills for reports, tenders and marketing.' },
      ],
      outcomes: ['Monthly progress series', 'Completion film', '4K site aerials', 'Tender-ready stills'],
    },
  },
  {
    n: '02', t: 'Real Estate',
    d: 'Listing films, editorial interiors & aerial showcases that sell the lifestyle — not just the floorplan.',
    tags: ['Film', 'Photo', 'Aerial', 'Web'],
    detail: {
      lead: 'Buyers fall for lifestyle, not floorplans. We make every listing look like it belongs in a magazine — and move faster because of it.',
      crafts: [
        { k: 'Film', v: 'Listing & development showcases that sell the lifestyle.' },
        { k: 'Photo', v: 'Editorial interiors & galleries impossible to scroll past.' },
        { k: 'Aerial', v: 'Property & land showcases that reveal the full scope.' },
        { k: 'Web', v: 'Development micro-sites that turn interest into enquiries.' },
      ],
      outcomes: ['Listing films', 'Editorial interiors', 'Aerial showcases', 'Development sites'],
    },
  },
  {
    n: '03', t: 'Hospitality & Venues',
    d: 'Food, drink & atmosphere reels — plus booking-ready sites — that fill tables and rooms.',
    tags: ['Film', 'Photo', 'Web'],
    detail: {
      lead: 'People book with their eyes. We make food, drink & atmosphere content that lets them taste it before they arrive.',
      crafts: [
        { k: 'Film', v: 'Venue & atmosphere reels that fill tables and rooms.' },
        { k: 'Photo', v: 'Food & drink shoots that look as good as they taste.' },
        { k: 'Web', v: 'Booking-ready sites that convert the craving.' },
      ],
      outcomes: ['Atmosphere reels', 'Menu & venue shoots', 'Booking websites', 'Social content drops'],
    },
  },
  {
    n: '04', t: 'Trades & Local Business',
    d: 'Lead-generation websites, backed by the photo & video content that makes them convert.',
    tags: ['Web', 'Film', 'Photo'],
    detail: {
      lead: 'Work that wins locals: a site that ranks and converts, backed by content that proves you’re the real deal.',
      crafts: [
        { k: 'Web', v: 'Custom-coded lead-gen sites — no templates, built to convert.' },
        { k: 'Film', v: 'On-the-job films that build trust before the first call.' },
        { k: 'Photo', v: 'Team & project shoots that humanise the brand.' },
      ],
      outcomes: ['Lead-gen website', 'Job-site films', 'Team shoots', 'Google-ready galleries'],
    },
  },
  {
    n: '05', t: 'Brands & Product',
    d: 'Commercials, social campaigns & editorial stills built to move product and grow reach.',
    tags: ['Film', 'Photo', 'Web'],
    detail: {
      lead: 'Scroll-stopping campaigns and editorial stills, built to move product — and grow the brand behind it.',
      crafts: [
        { k: 'Film', v: 'Commercials & social campaigns built to convert.' },
        { k: 'Photo', v: 'Studio & lifestyle imagery that drives sales.' },
        { k: 'Web', v: 'Brand sites that turn attention into customers.' },
      ],
      outcomes: ['Commercials', 'Social campaigns', 'Product stills', 'Brand sites'],
    },
  },
]

// Event types for the "For Events" lane.
export const eventTypes = [
  {
    n: '01', t: 'Weddings',
    d: 'Cinematic films and full-day photography that let you relive the day — not just remember it.',
    tags: ['Film', 'Photo', 'Aerial'],
    detail: {
      lead: 'The one day you can’t reshoot. A calm, unobtrusive crew with cinema cameras and full-day photography — so every vow, speech and dance-floor moment is yours forever.',
      crafts: [
        { k: 'Film', v: 'A cinematic highlight film — plus the full ceremony & speeches, uncut.' },
        { k: 'Photo', v: 'Editorial full-day photography, from prep to the last dance.' },
        { k: 'Aerial', v: 'Venue & couple aerials that set the scene.' },
      ],
      outcomes: ['Highlight film', 'Full ceremony edit', 'Full-day gallery', 'Venue aerials'],
    },
  },
  {
    n: '02', t: 'Parties & Celebrations',
    d: 'Milestones, launches and private events captured with energy and taste.',
    tags: ['Film', 'Photo'],
    detail: {
      lead: 'Milestones deserve better than phone footage. We capture the energy, the people and the feeling of the night — with taste.',
      crafts: [
        { k: 'Film', v: 'Recap films with the night’s energy, cut ready to share.' },
        { k: 'Photo', v: 'Candid, editorial coverage of the people who matter.' },
      ],
      outcomes: ['Recap film', 'Social cuts', 'Candid gallery', 'Fast delivery'],
    },
  },
  {
    n: '03', t: 'Corporate & Conferences',
    d: 'Recap films, speaker coverage and photography that give your event a second life online.',
    tags: ['Film', 'Photo'],
    detail: {
      lead: 'Your event ends — its content shouldn’t. Recap films, speaker sessions and photography that give the day a second life across your channels.',
      crafts: [
        { k: 'Film', v: 'Recap films plus full speaker & session coverage.' },
        { k: 'Photo', v: 'Stage, delegate & networking photography, brand-safe.' },
      ],
      outcomes: ['Recap film', 'Speaker sessions', 'Event gallery', 'Social cuts'],
    },
  },
  {
    n: '04', t: 'Live & Performance',
    d: 'Multi-angle films and stills that capture the scale — and the feeling of the room.',
    tags: ['Film', 'Photo', 'Aerial'],
    detail: {
      lead: 'Multi-angle coverage that captures the scale of the production — and the feeling in the room when it all lands.',
      crafts: [
        { k: 'Film', v: 'Multi-cam films cut to the energy of the set.' },
        { k: 'Photo', v: 'Stage, crowd & backstage stills.' },
        { k: 'Aerial', v: 'Venue-scale aerials, where licensed & safe.' },
      ],
      outcomes: ['Multi-cam film', 'Aftermovie', 'Stage stills', 'Crowd energy'],
    },
  },
]
