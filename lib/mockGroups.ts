import type { Group } from "./types";

// In-memory dataset for the take-home.
// Candidates can expand this, change the fields etc. 
export const MOCK_GROUPS: Group[] = [
  {
    id: "g_parents_toddlers_walks",
    name: "Parents (Toddlers) Walks",
    description:
      "A small group of parents with toddlers who meet for weekday morning walks and occasional playground meetups.",
    tags: ["parents", "toddlers", "walks", "playground", "weekdays"],
    cadence: "Weekday mornings",
  },
  {
    id: "g_parent_baby_coffee",
    name: "Parent & Baby Coffee",
    description:
      "Low-pressure coffee meetups for parents/carers with babies. Pram-friendly, plenty of pauses, and lots of shared tips.",
    tags: ["parents", "babies", "newborns", "coffee", "support", "pram-friendly"],
    cadence: "Weekday mornings",
  },
  {
    id: "g_single_parents_support",
    name: "Single Parents Support & Social",
    description:
      "A friendly space for single parents to swap practical advice, vent a little, and plan occasional kid-friendly hangouts.",
    tags: ["parents", "single-parents", "support", "community", "family"],
    cadence: "Biweekly",
  },
  {
    id: "g_newcomers_coffee",
    name: "Newcomers Coffee",
    description:
      "Casual coffee meetups for people who’ve recently moved and want to make new friends.",
    tags: ["new", "friends", "coffee", "community"],
    cadence: "Saturdays",
  },
  {
    id: "g_remote_workers_cowork",
    name: "Remote Workers Co-work (Quiet + Chat)",
    description:
      "A few hours of focused co-working with optional coffee breaks. Great if you WFH and want a bit of structure and company.",
    tags: ["remote-work", "coworking", "productivity", "coffee", "community"],
    cadence: "Weekdays",
  },
  {
    id: "g_social_pub_quiz_team",
    name: "Pub Quiz Team Finder",
    description:
      "Rotate teammates each week so newcomers can join easily. Mostly general knowledge, with some silly rounds.",
    tags: ["social", "friends", "quiz", "pub", "evenings", "new"],
    cadence: "Weekly",
  },
  {
    id: "g_evening_run_club",
    name: "Evening Run Club",
    description: "Friendly 5k-ish runs at an easy pace. Beginners welcome.",
    tags: ["running", "fitness", "evenings", "beginners"],
    cadence: "Tuesdays",
  },
  {
    id: "g_weekend_hike_walks",
    name: "Weekend Hikes & Long Walks",
    description:
      "Social weekend walks and hikes at a steady pace. Routes vary; we keep it welcoming for newer hikers.",
    tags: ["hiking", "walking", "outdoors", "weekends", "nature", "social"],
    cadence: "Weekends",
  },
  {
    id: "g_cycling_social_spin",
    name: "Cycling Social Spin (Easy Pace)",
    description:
      "Easy-paced rides with a café stop. No-drop policy: we regroup often so nobody gets left behind.",
    tags: ["cycling", "outdoors", "fitness", "coffee", "beginners"],
    cadence: "Sundays",
  },
  {
    id: "g_cycling_fast_training",
    name: "Cycling Training Ride (Faster)",
    description:
      "A faster-paced training ride for confident cyclists. Bring lights and basic tools; we do short interval sections.",
    tags: ["cycling", "fitness", "training", "outdoors", "intermediate"],
    cadence: "Saturdays",
  },
  {
    id: "g_swim_squad_lanes",
    name: "Swim Squad (Lane Session)",
    description:
      "Structured lane swimming session with simple sets. All strokes welcome; you can pick a lane that suits your pace.",
    tags: ["swimming", "fitness", "training", "indoors"],
    cadence: "Weekday evenings",
  },
  {
    id: "g_climbing_beginners",
    name: "Indoor Climbing (Beginners)",
    description:
      "A relaxed intro-friendly climbing meetup. We share belay partners (where applicable) and tips for new climbers.",
    tags: ["climbing", "fitness", "beginners", "indoors", "social"],
    cadence: "Wednesdays",
  },
  {
    id: "g_tennis_social_doubles",
    name: "Social Tennis Doubles",
    description:
      "Friendly doubles with rotating partners. We keep it welcoming and focus on having fun rather than perfect technique.",
    tags: ["tennis", "sport", "outdoors", "social", "intermediate"],
    cadence: "Saturdays",
  },
  {
    id: "g_basketball_pickup",
    name: "Pick-up Basketball",
    description:
      "Casual games with mixed skill levels. Turn up when you can; we run shorter games so everyone gets court time.",
    tags: ["basketball", "sport", "fitness", "evenings", "social"],
    cadence: "Weekly",
  },
  {
    id: "g_quiet_book_club",
    name: "Quiet Book Club",
    description:
      "Bring a book, read together in silence for an hour, then optional chat afterwards. Low-pressure and friendly.",
    tags: ["books", "reading", "introverts", "quiet", "low-pressure"],
    cadence: "Sundays",
  },
  {
    id: "g_book_club_fiction_chatty",
    name: "Fiction Book Club (Chatty)",
    description:
      "Monthly fiction pick with a lively discussion. No pressure to finish every page—come for the conversation.",
    tags: ["books", "reading", "fiction", "discussion", "social"],
    cadence: "Monthly",
  },
  {
    id: "g_writers_workshop",
    name: "Writers Workshop (Feedback Circle)",
    description:
      "Bring a short piece (or an idea) and get kind, constructive feedback. Fiction, nonfiction, and poetry all welcome.",
    tags: ["writing", "creativity", "workshop", "feedback", "community"],
    cadence: "Biweekly",
  },
  {
    id: "g_poetry_open_mic",
    name: "Poetry Open Mic (Beginner-Friendly)",
    description:
      "Read your own work or just listen. Supportive vibes; optional prompts for anyone who wants a gentle nudge to write.",
    tags: ["poetry", "writing", "open-mic", "arts", "evenings"],
    cadence: "Monthly",
  },
  {
    id: "g_dog_walkers",
    name: "Dog Walkers Meetup",
    description:
      "Loose group for dog owners who want regular weekday walks and a bit of company. Dogs must be friendly.",
    tags: ["dogs", "walking", "outdoors", "weekday"],
    cadence: "Weekdays",
  },
  {
    id: "g_cat_owners_social",
    name: "Cat Owners Social (Low-Key)",
    description:
      "For cat people who want to chat, share tips, and swap recommendations. Mostly café meetups—no cat wrangling required.",
    tags: ["cats", "pets", "social", "community", "indoors"],
    cadence: "Monthly",
  },
  {
    id: "g_language_exchange_en_es",
    name: "Language Exchange (EN/ES)",
    description:
      "Meet to practise English and Spanish in relaxed conversation. All levels welcome; we rotate partners.",
    tags: ["language", "spanish", "english", "conversation", "learning"],
    cadence: "Wednesdays",
  },
  {
    id: "g_language_exchange_fr_de",
    name: "Language Exchange (FR/DE)",
    description:
      "Relaxed French/German practice with friendly prompts. All levels welcome—beginners get lots of patience.",
    tags: ["language", "french", "german", "conversation", "learning"],
    cadence: "Tuesdays",
  },
  {
    id: "g_language_exchange_it_pt",
    name: "Language Exchange (IT/PT)",
    description:
      "Practice Italian and Portuguese in small groups. We do quick icebreakers, then split by level if needed.",
    tags: ["language", "italian", "portuguese", "conversation", "learning"],
    cadence: "Thursdays",
  },
  {
    id: "g_new_mums_circle",
    name: "New Mums Circle",
    description:
      "Supportive, non-judgmental space for new mums. Short walks, a café stop, and a place to talk honestly.",
    tags: ["parents", "newborns", "support", "mums", "walks"],
    cadence: "Fridays",
  },
  {
    id: "g_men_mental_health_circle",
    name: "Men’s Mental Health Check-in",
    description:
      "A confidential peer space for men to talk honestly and listen well. Not therapy—just support and connection.",
    tags: ["mental-health", "support", "men", "community", "wellbeing"],
    cadence: "Biweekly",
  },
  {
    id: "g_neurodivergent_social",
    name: "Neurodivergent Social (Autism/ADHD)",
    description:
      "A low-pressure meetup for neurodivergent folks. Clear structure, optional conversation prompts, and a quiet corner.",
    tags: ["neurodivergent", "adhd", "autism", "community", "low-pressure", "support"],
    cadence: "Monthly",
  },
  {
    id: "g_mindfulness_meditation",
    name: "Mindfulness & Meditation",
    description:
      "Guided meditations plus a short discussion. Beginner-friendly and secular; bring questions and curiosity.",
    tags: ["mindfulness", "meditation", "wellbeing", "stress", "beginners"],
    cadence: "Weekday evenings",
  },
  {
    id: "g_yoga_gentle_flow",
    name: "Gentle Yoga Flow",
    description:
      "A gentle yoga session focused on mobility and relaxation. Options offered for different bodies and energy levels.",
    tags: ["yoga", "wellbeing", "fitness", "mobility", "beginners"],
    cadence: "Sundays",
  },
  {
    id: "g_accessible_outings",
    name: "Accessible Outings & Coffee",
    description:
      "Meetups planned with accessibility in mind (step-free routes where possible). Short outings plus time to chat.",
    tags: ["accessibility", "disabled", "community", "coffee", "outings"],
    cadence: "Monthly",
  },
  {
    id: "g_board_games_night",
    name: "Board Games Night",
    description:
      "Weekly board games with a mix of light and strategy games. Come solo or bring a friend.",
    tags: ["boardgames", "games", "social", "evenings"],
    cadence: "Thursdays",
  },
  {
    id: "g_tabletop_rpg_one_shots",
    name: "Tabletop RPG One-shots",
    description:
      "Beginner-friendly tabletop RPG one-shots. Pre-made characters available; we keep sessions welcoming and inclusive.",
    tags: ["ttrpg", "games", "roleplay", "social", "beginners", "indoors"],
    cadence: "Monthly",
  },
  {
    id: "g_video_games_coop",
    name: "Co-op Video Games Night",
    description:
      "Relaxed co-op and party games. Bring your favourite controller if you have one; spectators welcome too.",
    tags: ["videogames", "games", "social", "indoors", "evenings"],
    cadence: "Weekly",
  },
  {
    id: "g_casual_cycling_ride",
    name: "Casual Cycling Ride",
    description:
      "Easy-paced rides, mostly flat. We stop for coffee halfway. Helmets recommended.",
    tags: ["cycling", "outdoors", "fitness", "coffee"],
    cadence: "Saturdays",
  },
  {
    id: "g_photography_walks",
    name: "Photography Walks (Any Camera)",
    description:
      "Bring any camera (or your phone) and take photos together. We share tips on composition and editing—very beginner-friendly.",
    tags: ["photography", "outdoors", "creativity", "walks", "beginners"],
    cadence: "Biweekly",
  },
  {
    id: "g_sketching_art_club",
    name: "Sketching & Art Club",
    description:
      "Casual sketching session with optional prompts. Bring your own materials; all skill levels welcome.",
    tags: ["art", "drawing", "sketching", "creativity", "indoors"],
    cadence: "Weekly",
  },
  {
    id: "g_music_jam_session",
    name: "Music Jam Session (Acoustic)",
    description:
      "Bring an instrument or your voice. We play simple songs, swap chords, and keep it friendly for all levels.",
    tags: ["music", "jam", "guitar", "singing", "creativity", "social"],
    cadence: "Monthly",
  },
  {
    id: "g_choir_community_singers",
    name: "Community Choir (No Auditions)",
    description:
      "A welcoming choir for people who love singing. No auditions and no pressure—just learning songs together.",
    tags: ["music", "choir", "singing", "community", "beginners"],
    cadence: "Weekly",
  },
  {
    id: "g_film_cinema_night",
    name: "Film Night (Cinema + Chat)",
    description:
      "Pick a film, watch together, then grab a drink and chat about it after. Mix of classics and new releases.",
    tags: ["film", "cinema", "social", "discussion", "evenings"],
    cadence: "Monthly",
  },
  {
    id: "g_cooking_supper_club",
    name: "Supper Club (Cook & Share)",
    description:
      "Take turns hosting or co-hosting a simple meal. Great for people who like cooking and want a cosy social plan.",
    tags: ["cooking", "food", "social", "community", "dinner"],
    cadence: "Monthly",
  },
  {
    id: "g_baking_club",
    name: "Baking Club (Sweet & Savoury)",
    description:
      "Bring a bake to share and swap recipes. We rotate themes (cookies, bread, cakes) and keep it beginner-friendly.",
    tags: ["baking", "food", "recipes", "community", "beginners"],
    cadence: "Biweekly",
  },
  {
    id: "g_vegan_vegetarian_potluck",
    name: "Vegan/Vegetarian Potluck",
    description:
      "A potluck where everyone brings a vegan or vegetarian dish. Perfect for recipe ideas and meeting food-loving friends.",
    tags: ["vegan", "vegetarian", "food", "community", "potluck"],
    cadence: "Monthly",
  },
  {
    id: "g_knitting_crochet_circle",
    name: "Knitting & Crochet Circle",
    description:
      "Bring a project and stitch together. Beginners welcome—someone will help you get started with simple patterns.",
    tags: ["knitting", "crochet", "crafts", "relaxing", "community", "beginners"],
    cadence: "Weekly",
  },
  {
    id: "g_gardening_allotment_swap",
    name: "Gardening & Plant Swap",
    description:
      "Chat plants, swap cuttings, and share growing tips. All levels welcome—from houseplants to veg beds.",
    tags: ["gardening", "plants", "outdoors", "community", "environment"],
    cadence: "Monthly",
  },
  {
    id: "g_coding_learners_js",
    name: "Coding Learners (JavaScript)",
    description:
      "A friendly study group for people learning JavaScript. Bring questions, pair up on small exercises, and share resources.",
    tags: ["coding", "javascript", "learning", "career", "beginners", "tech"],
    cadence: "Weekly",
  },
  {
    id: "g_data_ai_study_group",
    name: "Data & AI Study Group",
    description:
      "Peer-led sessions on data analysis and AI basics. We do short talks, then work on exercises together.",
    tags: ["data", "ai", "learning", "tech", "career", "projects"],
    cadence: "Biweekly",
  },
  {
    id: "g_startup_founders_meetup",
    name: "Startup Founders & Builders",
    description:
      "Meet other founders and builders to share progress, challenges, and practical advice. Warm intros, no hard pitching.",
    tags: ["startups", "entrepreneurship", "business", "networking", "tech"],
    cadence: "Monthly",
  },
  {
    id: "g_career_switchers",
    name: "Career Switchers Meetup",
    description:
      "For anyone considering a career change. Share stories, swap resources, and set small goals for the month ahead.",
    tags: ["career", "networking", "learning", "support", "goals"],
    cadence: "Monthly",
  },
  {
    id: "g_personal_finance_club",
    name: "Personal Finance Club (Budgeting & Goals)",
    description:
      "A friendly group to talk budgeting, saving, and financial goals. No judgement—just practical tips and accountability.",
    tags: ["finance", "budgeting", "goals", "community", "support"],
    cadence: "Monthly",
  },
  {
    id: "g_womens_networking",
    name: "Women in Work (Networking + Support)",
    description:
      "A supportive networking meetup for women. Light structure, warm intros, and space to talk career wins and challenges.",
    tags: ["women", "career", "networking", "support", "community"],
    cadence: "Biweekly",
  },
  {
    id: "g_lgbtq_social",
    name: "LGBTQ+ Social (Low-Key)",
    description:
      "A relaxed LGBTQ+ meetup—coffee, board games, and easy conversation. Allies welcome; inclusion is the priority.",
    tags: ["lgbtq", "social", "community", "friends", "low-pressure"],
    cadence: "Weekly",
  },
  {
    id: "g_seniors_tea_chat",
    name: "Seniors Tea & Chat",
    description:
      "A warm, gentle meetup for older adults to chat, play simple games, and make new friends at a relaxed pace.",
    tags: ["seniors", "community", "social", "tea", "low-pressure"],
    cadence: "Weekdays",
  },
  {
    id: "g_students_study_buddy",
    name: "Study Buddies (Students)",
    description:
      "A study group for students to co-work, swap notes, and keep each other motivated. Quiet focus blocks + breaks.",
    tags: ["students", "study", "productivity", "learning", "coworking"],
    cadence: "Weekly",
  },
  {
    id: "g_community_litter_pick",
    name: "Community Litter Pick",
    description:
      "Monthly litter pick to help keep shared spaces tidy. Grabbers and bags provided.",
    tags: ["volunteering", "community", "outdoors", "environment"],
    cadence: "Monthly",
  },
  {
    id: "g_volunteering_food_bank",
    name: "Volunteer at a Food Bank",
    description:
      "Regular volunteering sessions helping sort and pack food. A good way to meet people while doing something tangible.",
    tags: ["volunteering", "community", "charity", "food", "service"],
    cadence: "Weekly",
  },
  {
    id: "g_climate_action_group",
    name: "Climate Action Group",
    description:
      "For people who want to take practical climate action—skill-sharing, local projects, and support staying motivated.",
    tags: ["climate", "environment", "community", "activism", "projects"],
    cadence: "Biweekly",
  },
];


