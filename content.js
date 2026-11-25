/*
  SITE CONTENT: edit this file to update films.

  Any field left as '' (empty) is simply hidden on the site, so it is safe to
  launch before everything is filled in. Fill in what you know; leave the rest.

  Images live in /images and are named after the film's slug:
    images/<slug>.webp        main still (16:9)
    images/<slug>-1.webp ...  extra stills used for hover previews and the film page

  `youtube` is the video ID: the part after "v=" or "youtu.be/" in the link.
*/

// Featured films, in the order they appear on the home page.
// Each one gets its own page at harperrees.com/#film-<slug>
const FILMS = [
  {
    slug: 'ball-boy', title: 'Ball Boy', youtube: 'byZOfsVW2Ms', kind: 'Short film',
    role: 'Writer / Director / Editor',
    runtime: '',     // e.g. '7 min'
    year: '2024',
    place: 'Chapman University, Orange, California',
    logline: 'When intrigue becomes infatuation.',  // one sentence: who it's about, what they want, what's in the way
    note: '',        // director's note: 2–3 sentences on why she made it
    credits: [],     // e.g. [['Director','Harper Rees'], ['Cinematography','Name']]
    screenings: '',  // festivals or showcases, if any
    alt: 'A man in a cap drinks from a bright pink cloth under a blue sky',
  },
  {
    slug: 'forever-yours', title: 'Forever Yours', youtube: '1ABx9m9Giqk', kind: 'Short film',
    role: 'Writer / Director', runtime: '', year: '2025', place: 'Orange, California',
    logline: 'When the pressure of a secret relationship becomes too much, tragedy ensues.',
    note: '', credits: [], screenings: '',
    alt: 'Two silhouetted figures face each other in a warmly lit doorway',
  },
  {
    slug: 'the-driftless', title: 'The Driftless', youtube: 'u_PD6pTYEBQ', kind: 'Short film',
    role: '', runtime: '', year: '', place: 'Driftless Region, Wisconsin', logline: '', note: '', credits: [], screenings: '',
    alt: 'Two people wade through a creek under a fallen tree',
  },
  {
    slug: 'tangled-in-shoals', title: 'Tangled in Shoals', youtube: 'wAi5_21FryM', kind: 'Short film',
    role: '', runtime: '', year: '', place: '', logline: '', note: '', credits: [], screenings: '',
    alt: 'A smiling young woman lies in sunlit grass, framed like a strip of film',
  },
  {
    slug: 'mantra', title: 'Mantra', youtube: 'yHPH_ZjFnVY', kind: 'Short film',
    role: '', runtime: '', year: '', place: '', logline: '', note: '', credits: [], screenings: '',
    alt: 'A young man gently touches a young woman’s face against a bright window',
  },
];

// Festival work with Peter Thomson / Driftless Film Collective.
const COLLABS = [
  {
    slug: 'acceptance', title: 'Acceptance', youtube: 'OaWySmC0wgc', kind: '48-hour film · 2024',
    laurel: ['Audience Choice', 'Winner', 'La Crosse Film Academy'],
    role: '',  // Harper's role, e.g. 'Co-writer and editor'
    note: 'A film by <strong>Peter Thomson and Central Film Club</strong>, written, shot and edited in 48 hours.',
    alt: 'Title card for Acceptance with the Audience Choice laurel',
  },
  {
    slug: 'videotape', title: 'Videotape', youtube: 'vcusTaZbzko', kind: 'Short film · No dialogue',
    laurel: ['Milwaukee', 'Short Film', 'Festival'],  // change the middle word to 'Official Selection' etc. once confirmed
    role: 'Lead actor',
    note: 'A wordless film made with <strong>Peter Thomson</strong>. Harper tells the story through performance alone.',
    alt: 'A young woman smiles into the camera, lying in tall dry grass',
  },
];

// Smaller pieces. These link straight to YouTube.
const MORE = [
  { slug: 'countryside', title: 'Countryside', youtube: 'wHHR6fikd6g', tag: 'Personal', alt: 'A woman in a white dress walks through a field at sunset' },
  { slug: 'childhood-camcorder', title: 'childhood through a camcorder', youtube: 'Jacqu5yOE8w', tag: 'Personal', alt: 'Home video frame of a smiling child' },
  { slug: 'thailand-2023', title: 'Thailand 2023', youtube: 'IjCEw7oW9gI', tag: 'Travel film', alt: 'A Thai coastline with the title Thailand 2023' },
];

// Shows the "Resume (PDF)" button. resume.pdf is the web copy (no phone number).
const SHOW_RESUME = true;
