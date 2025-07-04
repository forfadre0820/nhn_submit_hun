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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```