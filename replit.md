# replit.md

## Overview

Outerspaceways is an afro-futuristic music platform inspired by Sun Ra's cosmic jazz aesthetic. The platform showcases experimental musicians, avant-garde artists, and cosmic sound explorers through an immersive web experience featuring artist galleries, event calendars, and contact forms. Built as a full-stack React application with an Express backend, it combines modern web technologies with bold geometric patterns and cosmic imagery to create a unique digital space for boundary-pushing music.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Tailwind CSS** with custom design system implementing cosmic color palette (deep space black, cosmic orange, afro-futurist teal)
- **Shadcn/ui component library** with Radix UI primitives for accessible, customizable UI components
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management and API data fetching
- **React Hook Form** with Zod validation for form handling
- **Custom geometric pattern components** for afro-futuristic visual elements

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **Memory storage interface** with abstract IStorage pattern allowing future database integration
- **Modular route registration** system for organized API endpoint management
- **Development middleware** for request logging and error handling
- **Session-based architecture** prepared for user authentication

### Data Storage Design
- **Drizzle ORM** configured for PostgreSQL with type-safe database operations
- **Zod schema validation** for runtime type checking and API data validation
- **Migration system** using drizzle-kit for database schema management
- **Abstract storage interface** allowing easy switching between memory storage (development) and PostgreSQL (production)

### Styling and Design System
- **Custom CSS variables** for theme consistency across light/dark modes
- **Afro-futuristic brand colors** derived from Outerspaceways logo and Sun Ra aesthetic
- **Geometric pattern system** with SVG-based triangular and cosmic eye patterns
- **Responsive design** with mobile-first approach using Tailwind breakpoints
- **Custom hover and elevation effects** for interactive feedback

### Component Architecture
- **Atomic design pattern** with reusable UI components in `/components/ui/`
- **Feature-based components** for complex sections (HeroSection, EventsCalendar, PhotoGallery)
- **Theme provider** for dark/light mode switching with localStorage persistence
- **Geometric overlay system** for applying cosmic patterns to any component
- **Logo component system** with multiple size and variant options

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless** - Neon PostgreSQL serverless driver for production database
- **drizzle-orm** and **drizzle-zod** - Type-safe ORM with Zod integration
- **@tanstack/react-query** - Server state management and caching
- **wouter** - Lightweight routing library for single-page application navigation

### UI and Styling
- **@radix-ui/* components** - Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss** - Utility-first CSS framework with custom design tokens
- **class-variance-authority** and **clsx** - Dynamic CSS class composition utilities
- **lucide-react** - Icon library for consistent iconography

### Development Tools
- **tsx** - TypeScript execution environment for development server
- **esbuild** - Fast JavaScript bundler for production builds
- **@replit/vite-plugin-*** - Replit-specific development plugins for enhanced DX

### Form and Data Handling
- **react-hook-form** with **@hookform/resolvers** - Form state management
- **zod** - Runtime type validation and schema definition
- **date-fns** - Date manipulation utilities for event calendar

### Session and Storage
- **connect-pg-simple** - PostgreSQL session store for Express sessions
- **nanoid** - Unique ID generation utility

The architecture supports both development and production environments, with memory storage for rapid development and PostgreSQL for production deployment. The design system emphasizes the cosmic, experimental nature of the platform while maintaining accessibility and performance standards.