// Product design case studies carried over from the Squarespace portfolio
// (endive-seal-wnly.squarespace.com), 30 Sept 2026. Every claim below is taken from
// that site's copy or read off its own artefacts — the personas, pain-point slides,
// usability findings and annotated mocks. Nothing is a reported outcome, and where the
// original work stops (no usability round, placeholder copy) the page says so.
//
// Images live in public/work/<slug>/. Width and height are the files' real pixel sizes.

export type Figure = {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption?: string;
  /** "wide" spans the full column; "half" pairs with its neighbour on desktop. */
  span?: "wide" | "half";
};

export type CaseSection = {
  id: string;
  eyebrow: string;
  title: string;
  prose?: string[];
  pull?: string;
  points?: { k: string; v: string }[];
  figures?: Figure[];
};

export type CaseStudy = {
  slug: string;
  title: string; // card + metadata
  cardMeta: string;
  kicker: string;
  headline: string;
  sub: string;
  cover: Figure;
  facts: [string, string][];
  disclosure: string;
  sections: CaseSection[];
  next: { k: string; v: string }[];
  closing: string;
};

const fig = (slug: string, name: string, w: number, h: number, alt: string, caption?: string, span: Figure["span"] = "wide"): Figure => ({
  src: `/work/${slug}/${name}.webp`,
  w,
  h,
  alt,
  caption,
  span,
});

// ── Traveling Jobs ──────────────────────────────────────────────────────────────
const TJ = "traveling-jobs";
const travelingJobs: CaseStudy = {
  slug: TJ,
  title: "Traveling Jobs — a job and housing marketplace for traveling nurses",
  cardMeta:
    "Product design for Blue Umbrella Software: one platform where traveling nurses find contracts and short-term housing, and facilities and landlords list them.",
  kicker: "Product design · SaaS marketplace",
  headline: "Three kinds of customer, one front door.",
  sub: "Traveling nurses need a contract and somewhere to sleep near it. Facilities need staff; landlords need tenants. I designed the platform that puts all three in one place — for Blue Umbrella Software, as their product designer.",
  cover: fig(TJ, "cover", 1500, 844, "Traveling Jobs sign-up screen on a laptop: a blue panel reading “Start your journey with us” beside a create-account form."),
  facts: [
    ["Role", "Product designer — research, personas, journey and user flows, wireframes, style guide, high-fidelity screens"],
    ["Client", "Blue Umbrella Software · travelingjobs.com"],
    ["Duration", "August 2022 – February 2023"],
    ["Users", "Traveling nurses, healthcare facilities and HR reps, landlords and property owners"],
    ["Tools", "Figma"],
  ],
  disclosure:
    "Earlier work, written up from the original project files. Some high-fidelity screens still carry placeholder copy where the client's final copy wasn't in yet; they are shown as they were.",
  sections: [
    {
      id: "problem",
      eyebrow: "The Problem",
      title: "2020 made travel nursing ordinary. The tools didn't follow.",
      prose: [
        "Working on the road isn't new. But in 2020, while most office work went remote, medical staff went the other way — crossing state lines, sometimes the country, to cover shortages. A nurse taking a contract away from home has two problems at once: the job, and somewhere to live near it.",
        "Those two problems usually live on different sites, run by people who don't talk to each other. The brief was a single platform where travelers find and book roles and housing, and where the people offering both — facilities, HR reps and property owners — can list them.",
      ],
      pull: "So the design problem was a three-sided marketplace: every screen had to know who was looking at it.",
    },
    {
      id: "research",
      eyebrow: "Understanding the User",
      title: "What a traveler is actually worried about.",
      prose: [
        "I ran interviews and built empathy maps, then a persona per side of the market. The traveler persona, Donna, is a 26-year-old registered nurse from Pittsburgh, open to relocating for a stretch. What she wants is plain: roles filtered by duration and housing, a commute she can live with, fair and transparent offers. What gets in her way is trust — reviews of roles she can't verify, the feeling of being haggled, housing she can't vouch for.",
      ],
      points: [
        { k: "Pain point 1", v: "Who is this resource partnered with? A traveler needs to know who stands behind a listing before handing over details." },
        { k: "Pain point 2", v: "Another login. Travelers wanted to sign in with accounts they already had — Google, Facebook." },
        { k: "Pain point 3", v: "Is the housing safe? Short-term housing from people they'd never met came up again and again." },
      ],
      figures: [
        fig(TJ, "pain-points", 1500, 420, "Three numbered pain points: wondering who the resource is partnered with; wanting to log in with existing Google or Facebook credentials; safety of housing in question.", undefined),
        fig(TJ, "persona-donna", 1500, 844, "Persona card for Donna, 26, registered nurse from Pittsburgh: bio, goals, and frustrations, with two stakeholder sticky notes about how a user's status should work.", "Donna, the distance-traveler persona. The sticky notes are stakeholder review comments — they reframed the status field (below)."),
        fig(TJ, "journey-map", 1500, 818, "User journey map for Donna across five stages, with actions, touchpoints, emotions, pain points and opportunities in color-coded rows.", "Journey map — Donna, from first search to settling in."),
      ],
    },
    {
      id: "decisions",
      eyebrow: "Decisions",
      title: "Four calls the research made for me.",
      points: [
        {
          k: "Ask who you are first",
          v: "The first screen after sign-up asks for a user type — Traveler, Facility or Landlord — and everything after it branches. Three audiences sharing one undifferentiated flow is how a marketplace ends up serving none of them.",
        },
        {
          k: "Sign in with what you have",
          v: "Google sign-in sits on the first screen and in the flow, straight from pain point two. The flow also carries the failure paths — sign-in failed, forgot password, reset — rather than leaving them to the build.",
        },
        {
          k: "Status works like LinkedIn",
          v: "In stakeholder review, comments on the persona questioned a single “status” field: for a traveler it should describe the job hunt — open to work, not looking, on a contract now — while a facility's status is a different thing entirely. That reframed the field from a generic profile attribute into the traveler's job-hunt state.",
        },
        {
          k: "Answer the trust questions out loud",
          v: "The landlord and traveler pages carry an FAQ built from the safety worries in research: background checks run in-app through Checkr, who handles tenant insurance, what happens if a property is damaged, how and when owners get paid.",
        },
      ],
      figures: [
        fig(TJ, "flow-sign-in", 1500, 844, "Sign-in user flow: start, welcome, has account, sign up with Google authentication, sign-in failed, forgot password and reset password paths, ending in successfully signed in or exit.", "Sign-in flow, failure paths included.", "half"),
        fig(TJ, "wireframe-user-type", 1500, 844, "Wireframe: “What type of user are you?” with three cards — Traveler, Facility, Landlord.", "User type comes first; the rest of onboarding branches on it.", "half"),
        fig(TJ, "wireframe-sign-up", 1440, 1127, "Grey wireframe of the sign-up page: “Start your journey with us” beside a create-account form with a Sign up with Google button.", undefined, "half"),
        fig(TJ, "wireframe-pricing", 1500, 1250, "Wireframe of the pricing step: three plan cards with a monthly / annual toggle.", undefined, "half"),
      ],
    },
    {
      id: "system",
      eyebrow: "Visual System",
      title: "Built on the brand that already existed.",
      prose: [
        "Traveling Jobs had a mark and a blue already, so the style guide extends rather than replaces them: Work Sans in three weights for the type scale, and a palette of the brand blues with neutral, teal, green, amber and red ramps for states and accents.",
      ],
      figures: [
        fig(TJ, "typography", 1440, 1024, "Typography specimen: Work Sans in regular, semibold and bold, H1 through paragraph sizes.", undefined, "half"),
        fig(TJ, "color-palette", 1500, 1582, "Color palette: neutral greys, brand blues, cyans, teals, greens, ambers and reds, each as a ramp of swatches.", undefined, "half"),
      ],
    },
    {
      id: "screens",
      eyebrow: "High-Fidelity",
      title: "The screens, side by side.",
      prose: [
        "Each audience gets its own landing page with its own job to do: travelers search by profession, specialty and location; facilities choose a plan; landlords learn how to list a home and get paid.",
      ],
      figures: [
        fig(TJ, "hifi-sign-up", 1440, 1292, "High-fidelity sign-up screen in brand blue with a centered form, above a dark footer.", undefined, "half"),
        fig(TJ, "hifi-home", 1200, 1007, "Homepage section: “3 Easy Steps to Get You Connected & Earning” — pick your membership type, find the right plan, book your next gig — with testimonials below.", undefined, "half"),
        fig(TJ, "hifi-job-search", 1200, 504, "Traveler landing: “Time To Find a Traveling Job” with profession, specialty, state and zip fields and a View jobs button."),
        fig(TJ, "hifi-pricing-facilities", 1200, 734, "Facility pricing: Business Basic at $40 a month, Business Pro at $80 (popular), Business Enterprise at $120.", undefined, "half"),
        fig(TJ, "hifi-landlords", 1200, 723, "Landlord page: “List Your House and Earn Passive Income” with six benefit tiles.", undefined, "half"),
        fig(TJ, "hifi-faq-landlords", 1200, 638, "FAQ grid answering background checks, traveler insurance, property damage, minimum stay length, and how and when owners are paid.", "The trust questions from research, answered on the page."),
      ],
    },
  ],
  next: [
    { k: "Test", v: "None of this has been through a usability round yet. Five sessions per side of the market — the user-type fork first, because every later screen depends on people choosing correctly there." },
    { k: "Finish", v: "Replace the remaining placeholder copy with the client's, then re-check the pages for length; real copy is longer than lorem ipsum and the cards were sized to the latter." },
    { k: "Measure", v: "Completion of sign-up by user type, and how many travelers book housing and a role together — the whole bet of the product is that those happen in one place." },
  ],
  closing:
    "An ongoing engagement: I'm still in regular contact with Blue Umbrella and the product is still moving.",
};

// ── GhanaWeb: Re:Envisioned ─────────────────────────────────────────────────────
const GW = "ghanaweb-reenvisioned";
const ghanaWeb: CaseStudy = {
  slug: GW,
  title: "GhanaWeb: Re:Envisioned — a news feed the reader curates",
  cardMeta:
    "A UX redesign of GhanaWeb, one of Ghana's biggest news sites, from my master's at Ohio University: let readers pick what they see, share it where they are, and read it on a phone.",
  kicker: "UX design and research · News platform",
  headline: "Everything, all at once, is the same as nothing.",
  sub: "GhanaWeb loads the whole of Ghanaian news on every visit. I redesigned it around one idea — the reader decides what the front page is — as sole designer and researcher, during my master's at Ohio University.",
  cover: fig(GW, "cover", 1500, 844, "GhanaWeb Re-Envisioned: two phone screens, a “Curate your content” category picker and a personalized For You feed."),
  facts: [
    ["Role", "Sole UX designer and researcher — interviews, persona, flows, sketches, wireframes, style guide, prototype"],
    ["Context", "M.A., Infographics and Interactive Media Design, Ohio University"],
    ["Duration", "November 2018 – May 2019, revisited since"],
    ["Platform", "ghanaweb.com · mobile first"],
    ["Tools", "Paper, Figma"],
  ],
  disclosure:
    "Academic project, not commissioned by GhanaWeb. The redesign is mine; the brand, and the news content in the mocks, are GhanaWeb's.",
  sections: [
    {
      id: "problem",
      eyebrow: "The Problem",
      title: "A front page that can't tell you apart from anyone else.",
      prose: [
        "GhanaWeb is a go-to source for news from Ghana. Open it and the whole site arrives at once — politics, sport, entertainment, business, gossip — in the same order for everybody. Readers described being overwhelmed by the volume and variety before they'd found the one thing they came for.",
      ],
      pull: "The brief I set: let readers curate the feed by parameters they choose, and keep the rest of GhanaWeb one tap away.",
    },
    {
      id: "research",
      eyebrow: "Understanding the User",
      title: "Paul wants the transfer news. That's it.",
      prose: [
        "Interviews and empathy maps gave a user group from teens to millennials. The persona that crystallized it is Paul, 19, a college student who follows Manchester United, the Black Stars and Afrobeats, and has a passing interest in finance. His quote became the test for every screen: “I just want quick access to Man U transfer news.”",
      ],
      points: [
        { k: "Pain point 1", v: "Overwhelmed by articles and posts the reader has no interest in." },
        { k: "Pain point 2", v: "No quick way to share an article out to Instagram or Facebook, which is where the conversation actually happens." },
        { k: "Pain point 3", v: "The site isn't responsive — phone readers are sent to a different URL for a separate mobile version." },
      ],
      figures: [
        fig(GW, "pain-points", 1500, 567, "Three pain points: being overwhelmed by uninteresting articles; unable to share to Instagram and Facebook; site not responsive, with a separate mobile URL."),
        fig(GW, "persona-paul", 1500, 844, "Persona: Paul, 19, college student — motivation, personality, interests and pain points, with the quote “I just want quick access to Man U transfer news.”"),
      ],
    },
    {
      id: "flows",
      eyebrow: "Flows and Sketches",
      title: "Curation is a four-step flow, not a settings page.",
      prose: [
        "Personalization usually hides in settings, where nobody goes. Here it is onboarding: sign up, then curate — pick broad categories, refine them into specific picks, confirm, done. A progress indicator across the top tells you how far you are, and “Go straight to GhanaWeb” is always available for anyone who'd rather skip it.",
        "The flows came first, then paper: rough ideation, then screen-by-screen sketches of the feed, the article and the curation steps, before anything went into Figma.",
      ],
      figures: [
        fig(GW, "flow-sign-up", 1500, 694, "Sign-up user flow diagram with Facebook authentication, sign-in failure and password reset branches.", undefined, "half"),
        fig(GW, "flow-curate", 1500, 618, "Curation flow: start, curate feed, categories, refine picks, confirm picks, congratulations, with an exit path.", undefined, "half"),
        fig(GW, "sketches-screens-1", 1500, 946, "Paper sketches of three phone screens: search, a feed of image cards and a category grid, each with a bottom navigation bar.", "Paper first.", "half"),
        fig(GW, "sketches-screens-2", 1500, 910, "Paper sketches of an article view, a loading state and a category picker.", undefined, "half"),
        fig(GW, "wireframes-curate", 1012, 556, "Low-fidelity wireframes of the four curation steps: curate your content, refine your picks, confirm your picks, congratulations.", "The curation steps in grey, before color."),
      ],
    },
    {
      id: "screens",
      eyebrow: "High-Fidelity",
      title: "The feed, the picker, and the share sheet.",
      prose: [
        "The style guide keeps GhanaWeb's own mark and color and adds a component set for category tiles, buttons and inputs. The annotated screens below are the ones that carry the three pain points: curation for the overload, a share sheet with large Instagram and Facebook targets for sharing, and the whole thing built mobile-first so there is no second URL.",
      ],
      figures: [
        fig(GW, "style-guide", 1500, 650, "Style guide: hero and heading type, a palette of category colors, the GhanaWeb logo and core components."),
        fig(GW, "hifi-sign-in", 1500, 844, "Annotated sign-in and create-account screens, with notes on the progress indicator and Facebook sign-up.", undefined, "half"),
        fig(GW, "hifi-curate-refine", 1500, 844, "Annotated curate and refine screens: category tiles in GhanaWeb colors, then sport refined into specific picks.", undefined, "half"),
        fig(GW, "hifi-confirm", 1500, 844, "Annotated confirm-your-picks and congratulations screens.", undefined, "half"),
        fig(GW, "hifi-discover", 1500, 844, "Annotated Discover screen with trending searches, notifications and a bottom navigation dock.", undefined, "half"),
        fig(GW, "hifi-for-you", 1500, 844, "Three For You feed screens with tabs for For You, News and Sports, and a full-width view option.", undefined, "half"),
        fig(GW, "hifi-article-share", 1500, 844, "An article screen and its share sheet, with large Facebook and Instagram buttons and reading-list options.", "Sharing, where the readers are.", "half"),
      ],
    },
  ],
  next: [
    { k: "Test", v: "The curation flow is the whole product and it hasn't been tested with readers. The question to answer first: does a four-step onboarding cost more readers than an overloaded front page does?" },
    { k: "Measure", v: "How many readers finish curation versus take “Go straight to GhanaWeb”, and whether curated readers come back more often." },
    { k: "Extend", v: "Let the feed learn from what people actually open, so curation is a starting point rather than a one-off setting." },
  ],
  closing:
    "As the sole designer and researcher I keep returning to this one — tuning the interface as feedback comes in and trying it on other platforms.",
};

export const CASE_STUDIES: CaseStudy[] = [travelingJobs, ghanaWeb];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
