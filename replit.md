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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```