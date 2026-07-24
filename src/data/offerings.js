// Shared offering data — used by the homepage (App.jsx) and the lane pages.

export const services = [
  {
    num: '01',
    tag: 'Video',
    name: 'Video Production',
    line: 'Stories that move.',
    desc: 'Cinematic brand films, commercials and short-form content that stop the scroll — and stay with people long after.',
    deliverables: ['Brand Films', 'Commercials', 'Social Reels', 'Event Coverage'],
    glow: '216,116,60',
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
    glow: '198,120,150',
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
    glow: '78,140,180',
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
    glow: '150,130,210',
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
  },
  {
    n: '02', t: 'Real Estate',
    d: 'Listing films, editorial interiors & aerial showcases that sell the lifestyle — not just the floorplan.',
    tags: ['Film', 'Photo', 'Aerial', 'Web'],
  },
  {
    n: '03', t: 'Hospitality & Venues',
    d: 'Food, drink & atmosphere reels — plus booking-ready sites — that fill tables and rooms.',
    tags: ['Film', 'Photo', 'Web'],
  },
  {
    n: '04', t: 'Trades & Local Business',
    d: 'Lead-generation websites, backed by the photo & video content that makes them convert.',
    tags: ['Web', 'Film', 'Photo'],
  },
  {
    n: '05', t: 'Brands & Product',
    d: 'Commercials, social campaigns & editorial stills built to move product and grow reach.',
    tags: ['Film', 'Photo', 'Web'],
  },
]

// Event types for the "For Events" lane.
export const eventTypes = [
  {
    n: '01', t: 'Weddings',
    d: 'Cinematic films and full-day photography that let you relive the day — not just remember it.',
    tags: ['Film', 'Photo', 'Aerial'],
  },
  {
    n: '02', t: 'Parties & Celebrations',
    d: 'Milestones, launches and private events captured with energy and taste.',
    tags: ['Film', 'Photo'],
  },
  {
    n: '03', t: 'Corporate & Conferences',
    d: 'Recap films, speaker coverage and photography that give your event a second life online.',
    tags: ['Film', 'Photo'],
  },
  {
    n: '04', t: 'Live & Performance',
    d: 'Multi-angle films and stills that capture the scale — and the feeling of the room.',
    tags: ['Film', 'Photo', 'Aerial'],
  },
]
