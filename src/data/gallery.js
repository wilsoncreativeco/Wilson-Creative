// Gallery source of truth. Add an entry here and drop the files into
// public/work (full, max 1920px) and public/work/thumb (grid, max 900px).
// Dimensions are the optimised full-size ones — used for aspect ratio so the
// grid reserves space before anything loads.

export const galleryCats = ['All', 'Real Estate', 'Construction', 'Aerial']

// Collections shown as folders on /work — click one to open its set.
export const collections = [
  { cat: 'Aerial',       cover: 'drn-03', blurb: 'Licensed drone work — sites, boundaries and elevated overviews.' },
  { cat: 'Construction', cover: 'con-02', blurb: 'Progress and structure documented from groundbreak onward.' },
  { cat: 'Real Estate',  cover: 're-01',  blurb: 'Property and interiors, shot to sell the lifestyle.' },
]

export const galleryItems = [
  { id: 'drn-03', cat: 'Aerial',       title: 'Boundary line, first light',  w: 1920, h: 1440 },
  { id: 're-01',  cat: 'Real Estate',  title: 'Residential exterior',        w: 1920, h: 1279 },
  { id: 'con-02', cat: 'Construction', title: 'Formwork in progress',        w: 1920, h: 1216 },
  { id: 'drn-01', cat: 'Aerial',       title: 'Site from above',             w: 1920, h: 993  },
  { id: 're-03',  cat: 'Real Estate',  title: 'Interior, natural light',     w: 1920, h: 1279 },
  { id: 'con-01', cat: 'Construction', title: 'Vertical build',              w: 1079, h: 1920 },
  { id: 're-05',  cat: 'Real Estate',  title: 'Living space',                w: 1920, h: 1473 },
  { id: 'con-03', cat: 'Construction', title: 'Structure detail',            w: 1920, h: 1392 },
  { id: 'drn-02', cat: 'Aerial',       title: 'Elevated site overview',      w: 1920, h: 1610 },
  { id: 're-02',  cat: 'Real Estate',  title: 'Frontage',                    w: 1920, h: 1279 },
  { id: 'con-04', cat: 'Construction', title: 'Site progress',               w: 1920, h: 1079 },
  { id: 're-04',  cat: 'Real Estate',  title: 'Outdoor entertaining',        w: 1920, h: 1280 },
]

export const full = id => `/work/${id}.jpg`
export const thumb = id => `/work/thumb/${id}.jpg`
