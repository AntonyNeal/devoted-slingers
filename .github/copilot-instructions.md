# Bosca-Slingers - MTG Coaching Booking Platform

## Project Overview

Build "Bosca-Slingers" - a Magic: The Gathering coaching booking platform with a generic, reusable architecture.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Express.js + PostgreSQL
- **Architecture**: Multi-tenant system supporting multiple coaches

## SDK Architecture

### Generic Data Sources (Industry-Agnostic)
- **Booking**: Generic booking management and scheduling
- **Availability**: Time slot and calendar availability
- **Service**: Service catalog and offerings
- **Payment**: Payment processing and transactions
- **Customer**: Customer profiles and management

### MTG-Specific Data Sources
- **DeckReview**: Magic deck analysis and review services
- **CoachingSession**: MTG coaching session management
- **Scryfall**: Integration with Scryfall API for card data

## Key Features

1. **Service Catalog**: Display and manage coaching services (deck reviews, coaching sessions, etc.)
2. **Booking Calendar**: Interactive calendar for scheduling sessions
3. **Payment System**: Integrated payment processing
4. **Customer Profiles**: Customer data management and history
5. **Multi-Tenant**: Support multiple coaches with isolated data and configurations
6. **Generic Components**: Reusable booking components that work across service industries

## Code Guidelines

- Build generic, reusable components first, then extend for MTG-specific features
- Keep data sources modular and interchangeable
- Maintain clear separation between generic booking logic and MTG domain logic
- Use TypeScript interfaces to define clear contracts between layers
- Follow the existing tenant system architecture for multi-coach support
- Ensure all booking components can be reused in other service industries

## Domain Context

- MTG = Magic: The Gathering trading card game
- Coaches offer services like deck reviews, gameplay coaching, format-specific training
- Scryfall is the primary MTG card database API
- Sessions typically booked in hourly increments
- Deck reviews are asynchronous services, coaching sessions are live
