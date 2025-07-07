# Ross Mason 3D Artist Portfolio

## Overview

This is a modern full-stack web application for a 3D artist's portfolio website. Built with React, TypeScript, and Express.js, it features a clean, professional design showcasing 3D tutorials and educational content. The application uses a component-based architecture with shadcn/ui components and Tailwind CSS for styling.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds
- **Animation**: Framer Motion for smooth animations

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: Drizzle ORM with PostgreSQL (using Neon serverless)
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: Hot reloading with Vite integration

### Data Storage
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Located in `/shared/schema.ts` for shared types
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Frontend Components
- **UI Components**: Comprehensive shadcn/ui library including cards, buttons, forms, modals, navigation
- **Layout Components**: Responsive design with mobile-first approach
- **Animation Components**: Framer Motion integration for smooth transitions
- **Form Components**: React Hook Form with Zod validation

### Backend Components
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Route Management**: Centralized route registration system
- **Middleware**: Request logging, JSON parsing, and error handling
- **Development Tools**: Hot reloading and runtime error overlay

### Shared Components
- **Schema Definitions**: Shared TypeScript types and Zod schemas
- **Database Models**: User management with extensible schema design

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM provides type-safe database access
4. **Response Handling**: JSON responses with proper error handling
5. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@radix-ui/***: Headless UI components for accessibility
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **framer-motion**: Animation library
- **wouter**: Lightweight routing

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized static assets to `/dist/public`
- Backend: ESBuild bundles server code to `/dist/index.js`
- Database: Drizzle manages schema migrations

### Environment Requirements
- Node.js runtime environment
- PostgreSQL database (Neon serverless)
- Environment variables for database connection

### Scalability Considerations
- Serverless-ready architecture
- Stateless session management
- Optimized asset delivery
- Database connection pooling

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
- July 04, 2025. Created combined landing page with McCann and Ross Mason sections
- July 04, 2025. Updated navigation to floating rounded style with backdrop blur
- July 04, 2025. Removed location/time display and hero image section
- July 04, 2025. Added comprehensive career section with personal info, education, and experience
- July 04, 2025. Simplified layout for natural scroll transition between sections
- July 04, 2025. Removed "McCann" branding and "FR/EN" language toggle from navigation
- July 04, 2025. Replaced tutorial gallery with "Learn 3D Mastery" section featuring irregular image layout
- July 04, 2025. Increased font sizes throughout the site for better readability
- July 04, 2025. Added comprehensive animations and hover effects across all sections
- July 04, 2025. Removed "Learn 3D Mastery" section and replaced career section with Ross Mason About page style
- July 04, 2025. Implemented personal story, services list, and client/partner sections with interactive animations
- July 04, 2025. Restructured career section with traditional resume hierarchy: personal info, education, experience, skills, awards, clients
- July 04, 2025. Enhanced scroll animations with upward motion effects for all text elements
- July 04, 2025. Reverted to original Ross Mason About page structure with personal story, services, clients, and featured image
- July 04, 2025. Implemented exact HTML layout with proper spacing and typography matching original design
- July 04, 2025. Restructured to 4-column professional resume layout with centered alignment
- July 04, 2025. Added comprehensive resume content: personal info, languages, education, skills, experience, services, awards
- July 04, 2025. Integrated traditional resume elements while maintaining visual design aesthetics
- July 04, 2025. Removed 4-column layout and restored original Ross Mason About page structure
- July 04, 2025. Implemented image position reversal with left-right flipped layout for featured section
- July 04, 2025. Removed "Learn 3D Mastery" and tutorial sections, replaced with scroll-triggered scaling video animation
- July 04, 2025. Added interactive service selection with dynamic image switching for 3D Design, Art Direction, and Motion
- July 04, 2025. Implemented video overlay on service images that scales with scroll interaction
- July 04, 2025. Implemented scroll-triggered video scaling in McCann hero section text
- July 04, 2025. Restructured with pin-spacer and home__hero__video containers matching McCann.fr structure
- July 04, 2025. Video positioned inline between "aux idées" and "qui" text with exact CSS properties
- July 04, 2025. Applied 195x74px initial size scaling to full screen with precise transforms
- July 04, 2025. Fixed position overlay triggered at 600px scroll point with z-index 9999
- July 04, 2025. Added home__video class with position-relative and active states for proper video containment
- July 04, 2025. Implemented video scaling with negative top/left positioning to cover text content when expanded
- July 04, 2025. Recreated McCann.fr heroVideo() structure with inline-block display and rem/vw sizing
- July 04, 2025. Added proper CSS classes for video positioning and scaling animation behavior
- July 04, 2025. Video scales from 3.1rem x 8.3rem to full screen with smooth scroll transitions
- July 04, 2025. Positioned video in exact gap between "aux idées" and "qui" text with baseline alignment
- July 04, 2025. Added margin spacing (0.5rem mobile, 1vw desktop) for proper text flow
- July 04, 2025. Fixed video scaling to be gradual and smooth: 8.3rem → 12rem → 20rem → 40rem → 60rem → 80vw → 100vw
- July 04, 2025. Corrected position animation to center video during scaling before full screen overlay
- July 04, 2025. Implemented scale-based animation for in-place video expansion using transformOrigin center
- July 04, 2025. Video now scales from 1x to 15x in place, then transitions to fixed position overlay
- July 04, 2025. Added dedicated video full-screen section with 300vh height for 3 scroll sections
- July 04, 2025. Fixed video text alignment with vertical-align: middle and proper baseline positioning
- July 04, 2025. Limited video scale to max 12x to prevent oversized scaling beyond screen boundaries
- July 04, 2025. Implemented McCann.fr exact pin-spacer structure with 230px x 87px dimensions
- July 04, 2025. Applied proper CSS properties matching McCann.fr: translate, rotate, scale, inset positioning
- July 04, 2025. Fixed video container structure with pin-spacer wrapper for proper text alignment
- July 04, 2025. Rebuilt video scaling with combined transform property for proper scale animation
- July 04, 2025. Added dedicated full-screen video container with media-fill class structure
- July 04, 2025. Implemented gradual scale progression: 1x → 1.5x → 2.5x → 4x → 6x → 8x → 10x with smooth transitions
- July 04, 2025. Fixed video positioning to stop following scroll after full-screen section ends
- July 04, 2025. Video now properly disappears at 1000px scroll point with opacity fade and position reset
- July 04, 2025. Reduced full-screen section height to 200vh for better scroll control
- July 04, 2025. Adjusted scroll timing: 5 scroll actions to reach full-screen, then 3 more to naturally exit
- July 04, 2025. Smoothed video exit animation with gradual scale reduction and upward translation
- July 04, 2025. Extended full-screen section back to 300vh for better scroll pacing and natural transitions
- July 04, 2025. Modified video exit to scroll upward instead of scaling down, maintaining full size during transition
- July 04, 2025. Implemented parallax effect with Ross Mason section appearing at different scroll speed
- July 04, 2025. Created overlapping transition where video and next section move at different rates for natural reveal
- July 04, 2025. Removed "Experience" overlay text from video full-screen section
- July 04, 2025. Smoothed video upward scroll transition with gradual translate percentage increases
- July 04, 2025. Enhanced Ross Mason section reveal with 6-point transform progression for natural emergence
- July 04, 2025. Added dissolve effect to video fade-out with dual opacity transforms on container and video element
- July 04, 2025. Implemented smooth transition CSS for natural dissolve appearance during scroll exit
- July 04, 2025. Created layered opacity animation: container (1→0.5→0) and video (1→0.3→0) for gradual dissolution
- July 05, 2025. Added white stroke border to video and removed rounded corners for clean appearance
- July 05, 2025. Fixed video scaling to maintain center alignment during growth with translate(-50%, -50%)
- July 05, 2025. Extended full-screen video section to 500vh for longer scroll interaction
- July 05, 2025. Modified video animation to stay full-screen longer, then move upward instead of shrinking
- July 05, 2025. Adjusted timing for video disappearance and Ross Mason section emergence with better pacing
- July 05, 2025. Reduced scroll distances by 50% for faster section transitions and improved user experience
- July 05, 2025. Added animated scroll indicator with "Scroll to explore" text and mouse icon
- July 05, 2025. Implemented smooth ease-out-in animations for video movement using cubic-bezier transitions
- July 05, 2025. Enhanced video container with smooth CSS transitions for natural movement feel
- July 05, 2025. Fixed video opacity to never fade to 0, ensuring video stays visible throughout scroll
- July 05, 2025. Improved video upward movement animation with gradual translate progression
- July 05, 2025. Reduced scroll distances for faster section transitions and smoother user experience
- July 05, 2025. Optimized scroll timing to 70% of original distances for quicker section transitions
- July 05, 2025. Updated video scaling and Ross Mason section reveal timing to match faster scroll progression
- July 05, 2025. Further reduced scroll distances by 50% for even faster section transitions (180px total)
- July 05, 2025. Enhanced scroll indicator visibility with white text on semi-transparent background
- July 05, 2025. Increased scroll indicator z-index to appear above video during scaling animation
- July 05, 2025. Comprehensive code refactoring with centralized scroll configuration for maintainability
- July 05, 2025. Reduced total scroll distance to 90px for ultra-fast section transitions
- July 05, 2025. Optimized video section height to 50vh for quicker Ross Mason section reveal
- July 05, 2025. Complete resume redesign with professional header and contact information
- July 05, 2025. Added comprehensive core competencies section with technical, creative, and business skills
- July 05, 2025. Implemented detailed professional experience timeline with achievements
- July 05, 2025. Added education, certifications, and languages sections
- July 05, 2025. Included achievements & awards section with recognition highlights
- July 05, 2025. Created featured clients & projects showcase with global brands and agencies
- July 05, 2025. Added Patreon-inspired portfolio gallery with interactive hover effects and grid layout
- July 05, 2025. Implemented tutorial gallery section with featured content and tool specifications
- July 05, 2025. Created download section for free tutorial samples with video preview
- July 05, 2025. Redesigned Ross Mason section with comprehensive professional resume information
- July 05, 2025. Added contact information, education background, and language skills sections
- July 05, 2025. Implemented professional experience timeline with detailed job descriptions
- July 05, 2025. Added technical skills section with 3D software and rendering expertise levels
- July 05, 2025. Included awards & recognition section with industry achievements
- July 07, 2025. Updated title to Korean text matching user's image specification
- July 07, 2025. Changed background from black to white with black text and pink accent dot
- July 07, 2025. Restructured Korean text layout: "메세지를 넘어" / "시청자의 경험까지 [video] 설계하는" / "콘텐츠 제작자 이승훈 입니다."
- July 07, 2025. Reduced scroll sensitivity by 50% for slower, more controlled animations
- July 07, 2025. Improved video scaling algorithm with proper aspect ratio handling
- July 07, 2025. Added CSS transitions with cubic-bezier easing for smooth scroll animations
- July 07, 2025. Enhanced video viewport coverage with better interpolation calculations
- July 07, 2025. Reduced full-screen video section height to 150vh for better pacing
- July 07, 2025. Updated all scroll trigger points to match new reduced scroll distances
- July 07, 2025. Implemented dynamic scroll speed with variable acceleration/deceleration
- July 07, 2025. Removed video border stroke and added subtle border-radius
- July 07, 2025. Enhanced video scaling to 97% viewport size with proper aspect ratio handling
- July 07, 2025. Added GPU acceleration and rendering optimizations to prevent animation glitches
- July 07, 2025. Extended scroll animation sequence with upward video movement and resume section reveal
- July 07, 2025. Implemented isolation and transform-origin properties for smoother transitions
- July 07, 2025. Rebuilt using GSAP ScrollTrigger for proper video scaling animation
- July 07, 2025. Added navigation bar with backdrop blur effect
- July 07, 2025. Updated text layout to match Korean design specification with 62px font size
- July 07, 2025. Enhanced video scaling to fill entire viewport width and height
- July 07, 2025. Positioned video inline with "설계하는" text for natural flow
- July 07, 2025. Restored original rounded navigation bar with Work/About/Contact menu items
- July 07, 2025. Limited video scaling to 95% of viewport size instead of full screen
- July 07, 2025. Implemented two-phase scroll animation: video scaling first, then video moving up with next section fade-in
- July 07, 2025. Fixed navigation spacing and positioning to match user's reference image
- July 07, 2025. Fixed useScroll import error from framer-motion
- July 07, 2025. Enhanced video fullscreen scaling from 95% to 100% viewport size
- July 07, 2025. Fixed text line spacing consistency by applying uniform line-height to all text blocks
- July 07, 2025. Improved video positioning with middle vertical alignment for better text flow
- July 07, 2025. Optimized ScrollTrigger timings for smoother video scaling transitions
- July 07, 2025. Added video opacity fade-out and z-index layering for natural section transitions
- July 07, 2025. Enhanced CSS isolation and transform-origin properties for better performance
- July 07, 2025. Redesigned video scaling algorithm to cover full browser width using Math.max for scale calculation
- July 07, 2025. Implemented 3-phase scroll animation: scaling (100vh) → hold position (100vh) → move up (80vh)
- July 07, 2025. Repositioned video directly after "설계하는" text for exact layout match
- July 07, 2025. Reduced video size to 120x67px and adjusted margins for better text flow
- July 07, 2025. Added subtle border-radius to video for refined appearance
- July 07, 2025. Removed video border-radius for clean rectangular appearance
- July 07, 2025. Implemented cinematic aspect ratio using clip-path for widescreen crop effect
- July 07, 2025. Fixed video vertical alignment to baseline for proper text positioning
- July 07, 2025. Centered entire text layout with text-center and mx-auto classes
- July 07, 2025. Adjusted video dimensions to 140x59px for better proportion with text
- July 07, 2025. Reduced clip-path cropping from 20% to 10% inset for less aggressive crop
- July 07, 2025. Increased video height to 68px for better visibility after crop adjustment
- July 07, 2025. Implemented proper GSAP timeline based on official documentation guide
- July 07, 2025. Fixed video scaling logic using cached getBoundingClientRect values and Math.max calculation
- July 07, 2025. Created single timeline with proper sequence: move to center + scale → hold → move up + fade next section
- July 07, 2025. Added anticipatePin property to prevent jumping during pin start
- July 07, 2025. Used proper duration-based timeline instead of onUpdate for smoother animations
- July 07, 2025. Fixed major whitespace issue by setting pinSpacing: false to prevent layout gaps
- July 07, 2025. Added CSS reset styles to eliminate default margins and padding
- July 07, 2025. Changed hero section from min-h-screen to h-screen with overflow-hidden
- July 07, 2025. Cleaned up CSS file to remove conflicting styles and syntax errors
- July 07, 2025. Adjusted clip-path to 8% for better video visibility
- July 07, 2025. Extended scroll timeline to 500% for longer showreel viewing time
- July 07, 2025. Restructured timeline phases: scale (20%) → hold fullscreen (60%) → exit (20%)
- July 07, 2025. Added dedicated video scroll indicator that appears during fullscreen viewing
- July 07, 2025. Implemented indicator visibility controls with onComplete/onStart callbacks
- July 07, 2025. Enhanced user experience for showreel presentation with extended viewing duration
- July 07, 2025. Fixed premature next section appearance by extending scroll distance to 800%
- July 07, 2025. Adjusted timeline phases: scale (25%) → hold fullscreen (70%) → exit (5%)
- July 07, 2025. Increased scaling duration to 2 seconds and hold duration to 5.6 seconds
- July 07, 2025. Moved scroll indicator trigger to onStart of hold phase for better timing
- July 07, 2025. Fixed video centering calculation using precise center coordinates
- July 07, 2025. Added 200vh margin-top to next section for extended viewing space
- July 07, 2025. Updated transform-origin to 50% 50% for consistent centering
- July 07, 2025. Increased next section padding to py-32 for better spacing
- July 07, 2025. Fixed video overlay issue by setting position: fixed during fullscreen phase
- July 07, 2025. Added dynamic positioning changes: relative → fixed → relative throughout animation
- July 07, 2025. Set video z-index to 99999 and next section to z-10 for proper layering
- July 07, 2025. Added CSS rules to handle position transitions smoothly
- July 07, 2025. Ensured video stays on top with top: 0, left: 0 positioning during fullscreen
- July 07, 2025. Corrected video animation to maintain original position while only adjusting z-index
- July 07, 2025. Removed position: fixed changes to keep video in natural text flow location
- July 07, 2025. Video now scales from original inline position with z-index elevation only
- July 07, 2025. Complete ScrollTrigger refactoring with onUpdate for precise progress control
- July 07, 2025. Removed opacity changes and maintained smooth continuous scaling transitions
- July 07, 2025. Extended scroll distance to 500vh with 3-phase smooth animation: scale (25%) → hold (50%) → exit (25%)
- July 07, 2025. Changed video exit behavior from scaling down to moving upward while maintaining fullscreen size
- July 07, 2025. Reduced scroll distance to 200vh and increased scrub to 2 for more gradual, controlled scaling
- July 07, 2025. Extended scaling phase to 50% of timeline for slower, more natural video growth
- July 07, 2025. Increased scroll distance to 500vh with scrub: 5 for ultra-gradual scaling animation
- July 07, 2025. Extended scaling phase to 70% of timeline and added quadratic easing for smooth upward movement
- July 07, 2025. Increased scroll distance to 800vh with scrub: 8 for ultra-gradual scaling
- July 07, 2025. Reduced scaling phase to 40% and extended hold phase to 45% for longer fixed viewing
- July 07, 2025. Applied cubic easing for ultra-smooth upward movement with gentler 0.6vh displacement
- July 07, 2025. Added cinematic letterbox bars (12vh top/bottom) with fade-in effect during fullscreen video
- July 07, 2025. Letterbox bars appear at 40% progress and fade out during video exit with smooth transitions
- July 07, 2025. Increased scroll distance to 1200vh with scrub: 12 for extremely gradual scaling (10+ scroll actions)
- July 07, 2025. Reduced scaling phase to 25% for much slower video expansion to full screen
- July 07, 2025. Updated navigation z-index to 99999 to appear above letterbox bars during fullscreen video
- July 07, 2025. Reduced scaling phase to 10% for ultra-extremely gradual video expansion requiring 15+ scroll actions
- July 07, 2025. Applied ease-in-out cubic interpolation for smooth scale progression (slow-fast-slow pattern)
- July 07, 2025. Adjusted scaling phase to 83% for precisely 10 scroll actions to reach fullscreen
- July 07, 2025. Reduced hold phase to 83%-95% and exit phase to 95%-100% for better timing
- July 07, 2025. Added dynamic clip-path removal during video scaling to show full video content when expanded
- July 07, 2025. Fixed container sizing to match video dimensions during scaling, eliminating whitespace around fullscreen video
- July 07, 2025. Simplified scroll configuration: 1000vh total distance with 100% scaling phase for exactly 10 scroll actions to fullscreen
- July 07, 2025. Changed to 12 scroll actions (1200vh) and refactored scaling logic to prevent over-scaling beyond viewport
- July 07, 2025. Improved scale calculation based on viewport aspect ratio for proper fullscreen fit
- July 07, 2025. Added immersive blackout effect before letterbox appearance (80-85% progress) for enhanced cinematic transition
- July 07, 2025. Added square crop for video when viewport aspect ratio is portrait or square (width ≤ height)
- July 07, 2025. Removed letterbox bars, keeping only the immersive blackout transition effect
- July 07, 2025. Complete code refactoring: cleaned up unused imports, optimized scroll logic, removed all letterbox references, streamlined video scaling algorithm
- July 07, 2025. Added fullscreen video sound control overlay with mouse hover activation and SOUND ON/OFF toggle functionality
- July 07, 2025. Fixed z-index layering issues: reduced video z-index to 9999, elevated sound control and scroll indicators to z-[99999] for proper visibility
- July 07, 2025. Redesigned sound control to center position with SOUND ON/OFF text labels, replaced complex scroll indicator with simple "Keep" text
- July 07, 2025. Completely removed blackout overlay effect to eliminate any remaining letterbox-like visual artifacts
- July 07, 2025. Changed main scroll indicator text from "Scroll to explore" to "Keep to explore" when video is fullscreen, with dynamic color switching (black→white)
- July 07, 2025. Removed "쇼릴 감상중 계속 스크롤하세요" motion div, simplified sound control to icon-only, added video area click for sound toggle
- July 07, 2025. Added footer section with "Back to top" button, Seoul time display, copyright "이승훈 2025", and Ross Mason logo SVG
- July 07, 2025. Redesigned portfolio section with masonry grid layout, separator lines, reduced text spacing, and portfolio-style project cards with hover captions
- July 07, 2025. Added separator lines to all main sections (About, Featured Work, Contact) for consistent visual hierarchy
- July 07, 2025. Redesigned portfolio grid with true masonry layout using manual positioning to eliminate gaps and create puzzle-like arrangement
- July 07, 2025. Updated portfolio layout to match reference image with 4-column grid structure featuring varied heights and rounded corners
- July 07, 2025. Changed to uniform 3x3 grid layout with equal-sized square project cards for better content visibility
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```