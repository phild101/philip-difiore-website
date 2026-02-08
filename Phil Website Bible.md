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
- **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdnZib2Zwa3h1aWNycHNoeHVuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE3NjU3NywiZXhwIjoyMDg1NzUyNTc3fQ.7i8jLCHz9hNRnXiA_8KmpPQ9Cf0uhH5xvEQHeAqA4-g`
- **Edge Function:** `artificial-philip`
- **Edge Function URL:** https://gjvvbofpkxuicrpshxun.supabase.co/functions/v1/artificial-philip
- **REST API:** https://gjvvbofpkxuicrpshxun.supabase.co/rest/v1/
- **Storage Bucket:** `project-images` (holds all project featured images)
- **Storage URL Pattern:** `https://gjvvbofpkxuicrpshxun.supabase.co/storage/v1/object/public/project-images/{filename}`

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
- **Netlify DNS:** https://app.netlify.com/teams/phild101/dns/philipdifiore.com
- **Live URL:** https://philipdifiore.netlify.app (working now)
- **Custom Domain Status:** DNS propagating (nameservers updated Feb 4, 2026)

### Domain Registrar
- **Registrar:** Network Solutions (originally via MyDomain reseller)
- **Registrant Email:** phild101@gmail.com

### Netlify DNS Configuration (COMPLETED)
Nameservers updated at Network Solutions on February 4, 2026 to point to Netlify:
```
dns1.p06.nsone.net
dns2.p06.nsone.net
dns3.p06.nsone.net
dns4.p06.nsone.net
```

DNS records configured automatically by Netlify:
- philipdifiore.com → NETLIFY → philipdifiore.netlify.app
- www.philipdifiore.com → NETLIFY → philipdifiore.netlify.app

### Migration Checklist
- [x] Connect GitHub repo to Netlify
- [x] Configure Netlify project settings
- [x] Add custom domain in Netlify
- [x] Set up Netlify DNS zone for philipdifiore.com
- [x] Update nameservers at Network Solutions to Netlify
- [x] Verify DNS propagation
- [x] Verify SSL certificate provisioning
- [x] Test site on custom domain (https://philipdifiore.com)
- [x] Migrate media from WordPress to Supabase Storage (February 4, 2026)
- [ ] Cancel WP Engine hosting (WordPress no longer needed)

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

### Current Projects (19 visible, 1 hidden)
- **Films:** The Buffalo Hunt, Stranger: Bernie Worrell On Earth
- **Music Videos:** Caveman "In the City", Caveman "Old Friend", RDGLDGRN "Power Ups", Rival Schools "Shot After Shot", Sharon Jones & The Dap-Kings (3 videos), Naomi Shelton & The Gospel Queens, and more
- **Hidden:** Ellie Goulding (hidden = true, can be restored)
- **Experiments & Miscellanea:** Save My Life feat. Har Mar Superstar & Friends, Recording Parties, and more

### Projects Table Schema
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  wp_id INTEGER UNIQUE,           -- Original WordPress post ID
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,          -- 'Films', 'Music Videos', 'Live', 'Experiments & Miscellanea'
  vimeo_id TEXT,                   -- Vimeo video ID for embedding
  featured_image TEXT,             -- URL to featured image in Supabase Storage
  content TEXT,                    -- HTML content/description
  created_at TIMESTAMPTZ DEFAULT NOW(),
  display_order INTEGER DEFAULT 0, -- For custom sorting
  hidden BOOLEAN DEFAULT false     -- Hide from site without deleting
);
```

### Row Level Security (RLS)
- RLS enabled on `projects` table
- Public read access policy: `allow_public_read`
- Allows anonymous users to SELECT all projects

### Fetching Projects
```javascript
// Fetches all non-hidden projects, ordered by display_order
const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&hidden=neq.true&order=display_order.asc,created_at.desc`, {
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
  }
});
```

### Hiding/Showing Projects
```sql
-- Hide a project (keeps it in database for later)
UPDATE projects SET hidden = true WHERE id = 7;

-- Show a hidden project
UPDATE projects SET hidden = false WHERE id = 7;

-- View all projects including hidden
SELECT id, title, hidden FROM projects ORDER BY display_order;
```

---

## Site Architecture

### Single-Page Application
The entire site is a single `index.html` file with embedded CSS and JavaScript. No build step required.

### Views/Pages
1. **Landing Page** (`currentView = 'landing'`)
   - "PHILIP DI FIORE" header (no subtitle)
   - "chat with" prefix + "A.I. PHIL" heading
   - AI chatbox with A.I. Phil avatar image (colored gradient borders)
   - Avatar disappears when chat messages appear
   - Preset question chips inside chat box (desktop) or below chat box (mobile)
   - Send button + "Go to Site" button side-by-side (desktop) or stacked (mobile)
   - **Desktop:** Locked layout (no scrolling, 100vh)
   - **Mobile:** Scrollable, only header is sticky
   - Footer with Instagram and email

2. **Projects Page** (`currentView = 'projects'`)
   - Navigation tabs (Projects, About, Apps)
   - **Desktop Layout:** Three-column split (left project list + center image preview + right project list)
   - Projects split in half between left and right columns
   - **Rollover:** Image fills entire layout background on hover (`object-fit: cover`); all project text turns white with subtle text shadow
   - Layout height adapts to viewport: `calc(100vh - 220px)`
   - Each column scrolls independently with thin styled scrollbars
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
- **Chat Label ("A.I. PHIL"):** 2rem, weight normal (not bold), uppercase
- **Chat Label Prefix ("chat with"):** 0.75rem, same as preset chips
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

### Future TODO: Comprehensive System Prompt Rebuild

**Goal:** Create a much more detailed and realistic "Artificial Phil" by building a comprehensive system prompt that covers all aspects of Phil's personality, knowledge, and communication style.

**Recommended Structure for New System Prompt:**

```
1. CORE IDENTITY
   - Who Phil is at his essence
   - Voice and tone guidelines
   - How he speaks (casual, warm, self-deprecating)

2. BACKGROUND
   - Education and career path
   - How he got into filmmaking
   - Key life experiences that shaped his perspective

3. PROJECTS (Detailed)
   - Each film/video with personal thoughts and behind-the-scenes insights
   - What he learned from each project
   - Stories and anecdotes

4. CREATIVE PHILOSOPHY
   - Artistic influences (specific artists, works, and theories)
   - What excites him about filmmaking
   - His approach to storytelling and visual language

5. INTERESTS OUTSIDE FILM
   - Music, books, hobbies
   - Other passions and curiosities
   - Things he geeks out about

6. STYLE GUIDELINES
   - Response length preferences
   - Humor level and when to be serious
   - How to handle different types of questions

7. THINGS TO AVOID
   - Topics, tones, or phrasings that don't sound like Phil
   - Common AI-isms to steer clear of
   - What NOT to say
```

**Technical Notes:**
- One comprehensive system prompt is better than multiple edge functions
- Claude handles large context (10K+ tokens) without degradation
- Simpler architecture = easier maintenance
- Token cost consideration: system prompt counts toward API usage on every request

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
- `.chat-label-prefix` - "chat with" text above heading
- `.chat-label` - "A.I. PHIL" header
- `.chat-area` - Chat box with border
- `.chat-avatar-container` - A.I. Phil image container (hidden when messages appear)
- `.chat-avatar` - A.I. Phil image
- `.chat-messages` - Messages container (hidden initially, shown when chat starts)
- `.msg` / `.msg.user` / `.msg.assistant` - Message bubbles
- `.chat-input-row` / `.chat-input` / `.send-btn` - Input area
- `.go-to-site-btn` - "Go to Site" button next to Send
- `.preset-chips` / `.chip` - Preset question buttons (inside chat box on desktop)
- `.preset-chips-mobile` - Preset chips outside chat box (mobile only)
- `.dots` - Loading animation

### Projects
- `.project-layout` - Flex container for three-column layout
- `.project-list` - Column of project cards (left or right)
- `.project-list-left` - Left column with border-right
- `.project-list-right` - Right column with border-left
- `.project-preview` - Center area for rollover image
- `.project-preview-image` - The rollover image itself
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
│   └── index.html                    # The entire site (HTML, CSS, JS)
├── wp-content/
│   └── uploads/                      # Extracted WordPress media (backup)
├── migrate-images.js                 # Script to upload images to Supabase Storage
├── site-archive-difiore-live-*.zip   # WP Engine backup ZIP (keep for reference)
├── netlify.toml                      # Netlify deployment config
├── package.json                      # Node dependencies (supabase-js)
├── .gitignore                        # Git ignore rules
└── Phil Website Bible.md             # This document
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

### February 4, 2026: Media Migration from WordPress to Supabase Storage
**Goal:** Fully deprecate WordPress/WP Engine by moving all project images to Supabase Storage.

**Steps Completed:**
1. Downloaded full WordPress backup from WP Engine (difiore site)
2. Extracted `wp-content/uploads/` folder (282MB, 589 image files)
3. Created Supabase Storage bucket: `project-images`
4. Ran migration script to upload 19 project featured images to Supabase Storage
5. Updated database `featured_image` URLs from WordPress to Supabase Storage

**Supabase Storage Details:**
- **Bucket Name:** `project-images`
- **Public URL Pattern:** `https://gjvvbofpkxuicrpshxun.supabase.co/storage/v1/object/public/project-images/{filename}`
- **Example:** `https://gjvvbofpkxuicrpshxun.supabase.co/storage/v1/object/public/project-images/buffhuntphilweb2-835x1024.jpg`

**Migration Script:** `/Users/PD/Desktop/Phil Website/migrate-images.js`
- Reads local files from extracted WordPress uploads
- Uploads to Supabase Storage bucket
- Updates database URLs
- Requires `SUPABASE_SERVICE_KEY` environment variable

**To Run Migration Again (if needed):**
```bash
cd "/Users/PD/Desktop/Phil Website"
npm install @supabase/supabase-js
SUPABASE_SERVICE_KEY="your-service-role-key" node migrate-images.js
```

**Service Role Key Location:**
Supabase Dashboard > Settings > API Keys > Legacy anon, service_role API keys > service_role (click Reveal, then Copy)

**Local Backup Files (kept for reference):**
- `/Users/PD/Desktop/Phil Website/site-archive-difiore-live-*.zip` - Full WP Engine backup
- `/Users/PD/Desktop/Phil Website/wp-content/uploads/` - Extracted media files

**Result:** WordPress is now fully optional. All images served from Supabase Storage.

### February 2026: Image Updates & New Projects

**Replacing Rollover Images:**
When updating a project's rollover image, use a new filename (e.g., `-v2.jpg`) to bypass CDN caching:

1. **Convert TIFF to JPEG** (if needed):
   ```bash
   cd "/Users/PD/Desktop/Phil Website"
   sips -s format jpeg "imagename.tif" --out "imagename-v2.jpg"
   ```

2. **Upload to Supabase Storage** using Node.js:
   ```javascript
   const fs = require('fs');
   const https = require('https');

   const fileData = fs.readFileSync('imagename-v2.jpg');

   const options = {
     hostname: 'gjvvbofpkxuicrpshxun.supabase.co',
     port: 443,
     path: '/storage/v1/object/project-images/imagename-v2.jpg',
     method: 'POST',
     headers: {
       'Authorization': 'Bearer YOUR_SERVICE_ROLE_KEY',
       'Content-Type': 'image/jpeg',
       'Content-Length': fileData.length
     }
   };

   const req = https.request(options, (res) => {
     let data = '';
     res.on('data', (chunk) => data += chunk);
     res.on('end', () => console.log('Response:', res.statusCode, data));
   });

   req.on('error', (e) => console.error('Error:', e.message));
   req.write(fileData);
   req.end();
   ```

3. **Update database URL**:
   ```sql
   UPDATE projects
   SET featured_image = 'https://gjvvbofpkxuicrpshxun.supabase.co/storage/v1/object/public/project-images/imagename-v2.jpg'
   WHERE id = X;
   ```

**Images Updated (with new cropped versions):**
- `oldfriend-v2.jpg` - Caveman "Old Friend"
- `inthecity-v2.jpg` - Caveman "In the City"
- `ilearnedthehardway-v2.jpg` - Sharon Jones "I Learned the Hard Way"
- `rdgldgrn-v2.jpg` - RDGLDGRN "Power Ups"
- `savemylife-v2.jpg` - Save My Life feat. Har Mar Superstar
- `shotaftershot-v2.jpg` - Rival Schools "Shot After Shot"
- `whathaveyoudone.jpg` - Naomi Shelton & The Gospel Queens (new project)
- `artificial-phil.jpg` - A.I. Phil avatar for landing page chat

**New Project Added:**
- Naomi Shelton & The Gospel Queens "What Have You Done" (id: 20, display_order: 20)

**Service Role Key:** Required for storage uploads. Get from Supabase Dashboard > Settings > API > service_role key.

### February 5-6, 2026: Full-Bleed Rollover Images & Image Swaps

**Desktop Scrollbars on Project Columns:**
- Added thin styled scrollbars to `.project-list` columns (desktop only)
- Uses `scrollbar-width: thin` + `scrollbar-color` for Firefox
- Uses `::-webkit-scrollbar` rules for Chrome/Safari (6px wide, `#ccc` thumb, rounded)

**Full-Bleed Rollover Images (Desktop):**
On hover, the project rollover image now fills the entire `.project-layout` container background instead of sitting in the center preview area.

Implementation:
- `.project-layout` has `position: relative`
- `.project-preview` changed to `position: static`, `background: transparent`, `padding: 0`, `overflow: hidden`
- `.project-preview-image` changed to `position: absolute`, fills entire layout (`top/left: 0`, `width/height: 100%`), uses `object-fit: cover`, `z-index: 0`
- `.project-list` columns are `background: transparent`, `z-index: 1` so text floats over image
- `.project-card` backgrounds are `transparent`
- When image is active, JS adds `.image-active` class to `.project-layout`
- `.project-layout.image-active` turns all project titles white with subtle text shadow (`text-shadow: 0 1px 3px rgba(0,0,0,0.4)`)
- Individual card hover colors (orange, green, blue, yellow, red) still work on top

**Rollover Image Swaps:**
Several project images were reverted to their original WordPress versions or swapped to new images:
- **Save My Life** (id: 8): Swapped to `harmar.jpg` (new HAR MAR photo)
- **Caveman "In the City"** (id: 3): Reverted to original `inthecityweb-835x1024.jpg`
- **Caveman "Old Friend"** (id: 4): Reverted to original `oldfriendweb-835x1024.jpg`
- **Sharon Jones "I Learned the Hard Way"** (id: 16): Reverted to original `ilearnedthehardway-835x1024.jpg` (re-uploaded from WP backup)
- **Naomi Shelton "What Have You Done"** (id: 20): Swapped to `whathaveyoudone-v2.jpg`
- **Stranger: Bernie Worrell** (id: 2): Reverted to original `strangerweb-835x1024.jpg`
- **The Buffalo Hunt** (id: 1): Reverted to original `buffhuntphilweb2-835x1024.jpg`
- **Rival Schools "Shot After Shot"** (id: 6): Reverted to original `rivalschools1-1024x1024.jpg` (re-uploaded from WP backup)

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

*Last Updated: February 6, 2026*
