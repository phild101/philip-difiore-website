# Phil's Website BIBLE

## Project Overview

This is the personal website for **Philip Di Fiore**, an award-winning director, filmmaker, and photographer based in New York. The site features an AI chatbot called "Artificial Phil" on the landing page, along with a portfolio of projects, about section, and apps showcase.

---

## Project Locations

### Local Development
- **Project Folder:** `/Users/PD/Desktop/Phil Website/`
- **Main File:** `/Users/PD/Desktop/Phil Website/public/index.html`
- **Local Server:** Run `python3 -m http.server 8082` from `/Users/PD/Desktop/Phil Website/public/`

### GitHub Repository
- **Repo:** `phild101/philip-difiore-website`
- **URL:** https://github.com/phild101/philip-difiore-website
- **Branches:** `main`, `staging`

### Supabase
- **Project ID:** `gjvvbofpkxuicrpshxun`
- **Project URL:** https://gjvvbofpkxuicrpshxun.supabase.co
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdnZib2Zwa3h1aWNycHNoeHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNzY1NzcsImV4cCI6MjA4NTc1MjU3N30.igGl_64MuqL-0VsLE4NibmMq1hPxnZ_WusRrM043n5M`
- **Edge Function:** `artificial-philip`
- **Edge Function URL:** https://gjvvbofpkxuicrpshxun.supabase.co/functions/v1/artificial-philip
- **REST API:** https://gjvvbofpkxuicrpshxun.supabase.co/rest/v1/

### Deployment (Netlify)
- **Platform:** Netlify
- **Project Name:** philipdifiore
- **Netlify URL:** https://philipdifiore.netlify.app
- **Config:** `netlify.toml` (publishes from `public/` folder)
- **Deploys from:** GitHub `main` branch (auto-deploy on push)
- **Custom Domain:** philipdifiore.com (pending DNS verification)

---

## Domain & Hosting

### Current State (February 2026)
- **Domain:** philipdifiore.com
- **Netlify Project:** https://app.netlify.com/projects/philipdifiore
- **Staging URL:** https://philipdifiore.netlify.app (working)
- **Custom Domain Status:** Pending DNS verification

### DNS Configuration Required
To complete the migration, update DNS records at your domain registrar:

**Option 1 - Recommended (ALIAS/ANAME/CNAME):**
```
philipdifiore.com  ALIAS  apex-loadbalancer.netlify.com
www                CNAME  philipdifiore.netlify.app
```

**Option 2 - Fallback (A Record):**
```
philipdifiore.com  A      75.2.60.5
www                CNAME  philipdifiore.netlify.app
```

### Migration Checklist
- [x] Connect GitHub repo to Netlify
- [x] Configure Netlify project settings
- [x] Add custom domain in Netlify
- [ ] Update DNS records at domain registrar
- [ ] Verify DNS propagation (can take up to 24 hours)
- [ ] Verify SSL certificate provisioning
- [ ] Test site on custom domain
- [ ] Deprecate WordPress on WP Engine

---

## Supabase Database

### Projects Table
Stores all portfolio projects (migrated from WordPress).

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  wp_id INTEGER UNIQUE,           -- Original WordPress post ID
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,          -- 'Films', 'Music Videos', 'Live', 'Experiments & Miscellanea'
  vimeo_id TEXT,                   -- Vimeo video ID for embedding
  featured_image TEXT,             -- URL to featured image
  content TEXT,                    -- HTML content/description
  created_at TIMESTAMPTZ DEFAULT NOW(),
  display_order INTEGER DEFAULT 0  -- For custom sorting
);
```

### Current Projects (19 total)
- **Films:** The Buffalo Hunt, Stranger: Bernie Worrell On Earth
- **Music Videos:** Caveman "In the City", Caveman "Old Friend", RDGLDGRN "Power Ups", Rival Schools "Shot After Shot", and more
- **Live:** Ellie Goulding
- **Experiments & Miscellanea:** Save My Life feat. Har Mar Superstar & Friends, Recording Parties, and more

### Row Level Security (RLS)
- RLS enabled on `projects` table
- Public read access policy: `allow_public_read`
- Allows anonymous users to SELECT all projects

### Fetching Projects
```javascript
const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=display_order.asc,created_at.desc`, {
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
  }
});
```

---

## Site Architecture

### Single-Page Application
The entire site is a single `index.html` file with embedded CSS and JavaScript. No build step required.

### Views/Pages
1. **Landing Page** (`currentView = 'landing'`)
   - Name and subtitle header
   - "Artificial Phil" AI chatbox
   - Preset question buttons
   - "Go to Site" button
   - Footer with Instagram and email

2. **Projects Page** (`currentView = 'projects'`)
   - Navigation tabs (Projects, About, Apps)
   - Grid of project cards from Supabase
   - Click to view detail page

3. **Detail Page** (`currentView = 'detail'`)
   - Back button
   - Vimeo video embed
   - Title and description

4. **About Page** (`currentView = 'about'`)
   - Bio text (hardcoded in `ABOUT_TEXT` constant)

5. **Apps Page** (`currentView = 'apps'`)
   - Grid of app cards (hardcoded in `APPS` array)
   - Text-based headers with colored hover states

---

## Design System

### Fonts

#### Adobe Typekit (loaded via CSS)
```html
<link rel="stylesheet" href="https://use.typekit.net/ayz4ezz.css" />
<link rel="stylesheet" href="https://use.typekit.net/iof8yta.css" />
```

#### Font Families
- **Display Font (Headers, Logo):** `'itc-avant-garde-gothic-pro'` - Used for "PHILIP DI FIORE" and "ARTIFICIAL PHIL"
- **Body Font:** `'DM Sans'` - Used for navigation tabs, descriptions, chat text, project captions
- **Mono Font:** `'JetBrains Mono'` - Used for subtitle and footer copyright

#### CSS Variables
```css
:root {
  --font-display: 'itc-avant-garde-gothic-pro', 'Century Gothic', sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Typography Sizes
- **Site Title:** 5.5rem, weight 800, uppercase, letter-spacing -0.06em
- **Chat Label ("ARTIFICIAL PHIL"):** 2rem, weight 700, uppercase
- **Navigation Tabs:** 0.85rem, weight 400 (600 when active)
- **Chat Text / Project Descriptions / About Bio:** 0.85rem, weight 400
- **Preset Chips:** 0.75rem

### Colors
- **Background:** #fff (white)
- **Primary Text:** #000 (black)
- **Secondary Text:** #333, #444, #666, #999
- **Borders:** #000 (black, 1px solid)

### Project Grid Hover Colors (5-color sequence)
The project cards cycle through these colors on hover using `nth-child(5n+X)`:
1. **Orange:** #ff8d00 - RGB(255, 141, 0)
2. **Green:** #1db406 - RGB(29, 180, 6)
3. **Blue:** #4abbff - RGB(74, 187, 255)
4. **Yellow:** #f0ff00 - RGB(240, 255, 0) - *uses dark text*
5. **Red:** #ff432e - RGB(255, 67, 46)

### Preset Chips Hover Colors (reverse order)
1. **Red:** #ff432e
2. **Yellow:** #f0ff00 - *uses dark text*
3. **Blue:** #4abbff
4. **Green:** #1db406
5. **Orange:** #ff8d00

### Apps Page Hover Colors (4-color sequence)
1. **Red:** #ff432e
2. **Green:** #1db406
3. **Yellow:** #f0ff00 - *uses dark text*
4. **Orange:** #ff8d00

### Layout
- **Max Content Width:** 1100px (main content), 800px (chat section), 900px (detail page)
- **Grid:** 3-column for projects, 2-column for apps
- **Borders:** Black 1px borders used extensively for grid cells and containers

---

## AI Chatbot ("Artificial Phil")

### Frontend Implementation

#### Chat Flow
1. User clicks preset question OR types custom question
2. Previous messages cleared, new question sent to edge function
3. Loading dots displayed while waiting
4. Response received, typewriter effect types out text character by character
5. Paragraphs wrapped in `<p>` tags with 1em margin between them

#### Typewriter Effect
- Speed: 15ms per character
- HTML tags rendered instantly (skipped in delay)
- Paragraph breaks (`\n\n`) converted to `</p><p>`
- Line breaks (`\n`) converted to `<br>`

#### Preset Questions
```javascript
const PRESET_QUESTIONS = [
  "Tell me about yourself",
  "Tell me about your films",
  "Who are your influences?",
  "What interests you?",
  "You make apps too?",
  "What's your creative process?"
];
```

### Edge Function (`artificial-philip`)

#### Location
Supabase Edge Function deployed at:
`https://gjvvbofpkxuicrpshxun.supabase.co/functions/v1/artificial-philip`

#### Configuration
- **Model:** `claude-sonnet-4-20250514`
- **Max Tokens:** 1024
- **JWT Verification:** Disabled (public access)

#### System Prompt Highlights
- Speaks as Philip in first person
- Warm, conversational tone (not stiff or formal)
- When discussing film/art, channels Martin Scorsese's eloquence
- Self-deprecating, takes craft seriously but not himself
- Responses typically 2-4 paragraphs
- **Formatting:** Always uses double newlines between paragraphs

#### Knowledge Base Includes
- Bio and background
- Film details (The Buffalo Hunt, Stranger: Bernie Worrell on Earth)
- Music video credits and press quotes
- Commercial work clients
- App descriptions (Wolves in the Piano, Idea Machine, Plotter, Super Zero)
- Creative influences and philosophy

#### Environment Variables Required
- `ANTHROPIC_API_KEY` - Set in Supabase project secrets

### Future TODO
- Revamp knowledge base (currently quotes reviews which sounds pretentious)

---

## Key Code Sections

### State Management
```javascript
let projects = [];           // Projects from Supabase
let currentView = 'landing'; // 'landing', 'projects', 'about', 'apps', 'detail'
let currentProject = null;   // Selected project for detail view
let chatMessages = [];       // Chat history (cleared on each new question)
let chatLoading = false;     // Loading state for chat
```

### Main Functions
- `render()` - Routes to correct render function based on currentView
- `renderLanding()` - Landing page with chat
- `renderSite()` - Main site with navigation
- `renderProjects()` - Projects grid
- `renderDetail()` - Single project detail page
- `renderAbout()` - About page
- `renderApps()` - Apps grid
- `fetchProjects()` - Fetches projects from Supabase
- `sendChatMessage(userMessage)` - Sends message to edge function
- `typewriterEffect(fullText)` - Animates chat response
- `navigateTo(view)` - Changes current view
- `askPreset(question)` - Handles preset button clicks

### Event Listeners
- `attachChatListeners()` - Chat input and send button
- `attachProjectsListeners()` - Project card clicks

---

## CSS Classes Reference

### Layout
- `.site-wrap` - Main container, min-height 100vh
- `.site-header` / `.site-header.landing` - Header styling
- `.content` / `.content.landing` - Main content area
- `.tab-nav` / `.tab-btn` - Navigation tabs

### Chat
- `.chat-section` - Chat container
- `.chat-label` - "ARTIFICIAL PHIL" header
- `.chat-area` - Chat box with border
- `.chat-messages` - Messages container
- `.msg` / `.msg.user` / `.msg.assistant` - Message bubbles
- `.chat-input-row` / `.chat-input` / `.send-btn` - Input area
- `.preset-chips` / `.chip` - Preset question buttons
- `.dots` - Loading animation

### Projects
- `.project-grid` - 3-column grid
- `.project-card` - Individual project card
- `.project-title` / `.project-subtitle` - Card text

### Detail Page
- `.detail-page` - Container
- `.detail-back` - Back button
- `.video-container` - Responsive video embed
- `.detail-title` / `.detail-caption` - Text styling

### Apps
- `.apps-grid` - 2-column grid
- `.app-card` - Individual app card
- `.app-header` / `.app-header-title` - Text-based header box
- `.app-card-content` / `.app-desc` - Description below header

### Buttons
- `.go-to-site-btn` - Main CTA button (black bg, white text, inverts on hover)

---

## File Structure

```
/Users/PD/Desktop/Phil Website/
├── public/
│   └── index.html          # The entire site (HTML, CSS, JS)
├── netlify.toml            # Netlify deployment config
├── .gitignore              # Git ignore rules
└── Phils_Website_BIBLE.md  # This document
```

---

## Development Workflow

### Local Development
1. Navigate to project: `cd "/Users/PD/Desktop/Phil Website/public"`
2. Start server: `python3 -m http.server 8082`
3. Open browser: `http://localhost:8082`

### Deploying Edge Function Changes
Use Supabase MCP tools:
```
mcp__supabase__get_edge_function - View current code
mcp__supabase__deploy_edge_function - Deploy updates
```

### Git Workflow
1. Make changes to `index.html`
2. Test locally
3. Commit and push to GitHub (`staging` branch for testing, `main` for production)
4. Netlify auto-deploys from `main` branch

### Managing Projects in Supabase
```
mcp__supabase__list_tables - View all tables
mcp__supabase__execute_sql - Run queries to view/update projects
mcp__supabase__apply_migration - Apply schema changes
```

---

## Contact Information (Hardcoded)

```javascript
const CONTACT = {
  email: 'phil@philipdifiore.com',
  instagram: 'https://instagram.com/philipdifiore'
};
```

---

## Design Decisions & Notes

1. **No thumbnail hover on Projects grid** - Removed per user request for cleaner look

2. **Chat clears on each question** - Only shows current response, not conversation history

3. **Typewriter effect** - 15ms per character, makes AI feel more human

4. **Paragraph spacing in chat** - CSS adds 1em margin between `<p>` tags for visual separation

5. **Landing page is separate** - No navigation tabs, just chat and "Go to Site" button

6. **Supabase as database** - Projects stored in Supabase (migrated from WordPress February 2026)

7. **Single HTML file** - No build step, all CSS and JS embedded for simplicity

8. **Apps page text headers** - App names displayed as large text in boxes instead of thumbnail images

---

## Migration History

### February 2026: WordPress to Supabase Migration
- Created `projects` table in Supabase
- Migrated 19 projects from WordPress REST API
- Updated frontend to fetch from Supabase REST API
- Removed WordPress API dependencies
- Simplified data structure (no more nested WordPress embeds)

---

## Quick Reference Commands

### Start Local Server
```bash
cd "/Users/PD/Desktop/Phil Website/public" && python3 -m http.server 8082
```

### View Edge Function
```
mcp__supabase__get_edge_function with project_id: gjvvbofpkxuicrpshxun, function_slug: artificial-philip
```

### Check Supabase Logs
```
mcp__supabase__get_logs with project_id: gjvvbofpkxuicrpshxun, service: edge-function
```

### Query Projects
```
mcp__supabase__execute_sql with project_id: gjvvbofpkxuicrpshxun, query: SELECT * FROM projects ORDER BY display_order;
```

---

*Last Updated: February 2026*
